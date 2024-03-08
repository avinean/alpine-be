import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { Public } from 'src/decorators/public.decorator';
import { VisibilityStatus } from 'src/types/enums';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Get(':categoryId')
  findAllByCategory(@Param('categoryId') categoryId: number) {
    return this.productService.findAll({
      category: { id: categoryId}
    });
  }

  @Post(':categoryId')
  create(@Param('categoryId') categoryId: number, @Body() dto: DeepPartial<ProductEntity>) {
    return this.productService.create({
      ...dto,
      category: {
        id: categoryId
      }
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<ProductEntity>) {
    return this.productService.update(id, dto)
  }

  @Put(':id/publish')
  publish(@Param('id') id: number) {
    return this.productService.update(id, { status: VisibilityStatus.Published})
  }

  @Put(':id/draft')
  draft(@Param('id') id: number) {
    return this.productService.update(id, { status: VisibilityStatus.Draft})
  }

  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.productService.update(id, { status: VisibilityStatus.Archived})
  }
}
