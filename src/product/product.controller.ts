import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DeepPartial, In } from 'typeorm';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { Public } from 'src/decorators/public.decorator';
import { VisibilityStatus } from 'src/types/enums';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  findAll(
    @Query('categories') _categories: (number | string)[],
    @Query('statuses') _statuses: [],
    @Query('pure') pure: boolean,
  ) {
    const statuses = [_statuses].flat().filter(Boolean);
    const categoriesSlugs = [_categories]
      .flat()
      .filter((c) => typeof c === 'string')
      .map(String);
    const categoriesIds = [_categories]
      .flat()
      .filter((c) => typeof c === 'number')
      .map(Number);

    return this.productService.findAll(
      {
        category: [
          ...(categoriesIds?.length ? [{ id: In(categoriesIds) }] : []),
          ...(categoriesSlugs?.length ? [{ slug: In(categoriesSlugs) }] : []),
        ],
        status: statuses?.length ? In(statuses) : undefined,
      },
      pure,
    );
  }

  @Public()
  @Get('page')
  findAllByPage(
    @Query('categories') _categories: string[],
    @Query('statuses') _statuses: string[],
    @Query('colors') _colors: string[],
    @Query('parameters') _parameters: string[],
    @Query('page') page: number,
    @Query('take') take: number,
  ) {
    const statuses = [_statuses].flat().filter(Boolean);
    const categoriesSlugs = [_categories].flat().filter(Boolean).map(String);
    const colors = [_colors].flat().filter(Boolean).map(String);
    const parameters = [_parameters].flat().filter(Boolean).map(String);
    console.log(colors);
    return this.productService.findAllByPage(
      {
        category: [
          ...(categoriesSlugs?.length ? [{ slug: In(categoriesSlugs) }] : []),
        ],
        status: statuses?.length ? In(statuses) : undefined,
        prices: {
          colors: {
            slug: colors?.length ? In(colors) : undefined,
          },
          parameters: {
            slug: parameters?.length ? In(parameters) : undefined,
          },
        },
      },
      page,
      take,
    );
  }

  @Public()
  @Get('filters')
  findAllFilters(@Query('categories') _categories: string[]) {
    const categoriesSlugs = [_categories].flat().filter(Boolean).map(String);
    return this.productService.findAllFilters({
      category: [
        ...(categoriesSlugs?.length ? [{ slug: In(categoriesSlugs) }] : []),
      ],
    });
  }

  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.productService.findOne({ slug });
  }

  @Post()
  create(@Body() dto: DeepPartial<ProductEntity>) {
    return this.productService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<ProductEntity>) {
    return this.productService.update(
      {
        id,
      },
      dto,
    );
  }

  @Post('delete/:id')
  delete(@Param('id') id: number) {
    return this.productService.delete({ id });
  }

  @Put(':id/publish')
  publish(@Param('id') id: number) {
    return this.productService.update(
      { id },
      {
        status: VisibilityStatus.Published,
      },
    );
  }

  @Put(':id/draft')
  draft(@Param('id') id: number) {
    return this.productService.update(
      { id },
      { status: VisibilityStatus.Draft },
    );
  }

  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.productService.update(
      { id },
      {
        status: VisibilityStatus.Archived,
      },
    );
  }
}
