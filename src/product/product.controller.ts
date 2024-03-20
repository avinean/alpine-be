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
    @Query('categories') _categories: number[],
    @Query('statuses') _statuses: [],
  ) {
    const statuses = [_statuses].flat().filter(Boolean);
    const categories = [_categories].flat().filter(Boolean).map(Number);
    return this.productService.findAll({
      category: categories?.length ? { id: In(categories) } : undefined,
      status: statuses?.length ? In(statuses) : undefined,
    });
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
