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
    console.log(categoriesSlugs, categoriesIds);
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
