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
import { DeepPartial, In, Like } from 'typeorm';
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
    @Query('brands') _brands: string = '',
    @Query('categorySlugs') _categoriesSlugs: string = '',
    @Query('categoryIds') _categoriesIds: string = '',
    @Query('statuses') _statuses: string = '',
    @Query('title') _title: string = '',
    @Query('page') page: number,
    @Query('take') take: number,
  ) {
    const brands = _brands.split(',').filter(Boolean).map(Number);
    const statuses = _statuses.split(',').filter(Boolean);
    const categoriesSlugs = _categoriesSlugs
      .split(',')
      .filter(Boolean)
      .map(String);
    const categoriesIds = _categoriesIds.split(',').filter(Boolean).map(Number);
    const title = _title ? Like(`%${_title}%`) : undefined;

    return this.productService.findAll(
      {
        title,
        brand: brands.length ? { id: In(brands) } : undefined,
        category: [
          ...(categoriesIds?.length ? [{ id: In(categoriesIds) }] : []),
          ...(categoriesSlugs?.length ? [{ slug: In(categoriesSlugs) }] : []),
        ],
        status: statuses?.length ? In(statuses) : undefined,
      },
      page,
      take,
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
