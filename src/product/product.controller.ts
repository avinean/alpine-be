import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
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
    @Query('categories') _categories: number[],
    @Query('published') published: boolean,
  ) {
    const categories = [_categories].flat().filter(Boolean).map(Number);
    return this.productService.findAll({
      category: categories?.length ? { id: In(categories) } : undefined,
      status: published ? VisibilityStatus.Published : undefined,
    });
  }

  @Post(':categoryId')
  create(
    @Param('categoryId') categoryId: number,
    @Body() dto: DeepPartial<ProductEntity>,
  ) {
    return this.productService.create({
      ...dto,
      category: {
        id: categoryId,
      },
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<ProductEntity>) {
    return this.productService.update(id, dto);
  }

  @Put(':id/publish')
  publish(@Param('id') id: number) {
    return this.productService.update(id, {
      status: VisibilityStatus.Published,
    });
  }

  @Put(':id/draft')
  draft(@Param('id') id: number) {
    return this.productService.update(id, { status: VisibilityStatus.Draft });
  }

  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.productService.update(id, {
      status: VisibilityStatus.Archived,
    });
  }
}
