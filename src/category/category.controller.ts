import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { DeepPartial } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { Public } from 'src/decorators/public.decorator';
import { VisibilityStatus } from 'src/types/enums';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Public()
  @Get(':brandId')
  findAllByBrand(@Param('brandId') brandId: number) {
    return this.categoryService.findAll({
      brand: { id: brandId}
    });
  }

  @Post(':brandId')
  create(@Param('brandId') brandId: number, @Body() dto: DeepPartial<CategoryEntity>) {
    return this.categoryService.create({
      ...dto,
      brand: {
        id: brandId
      }
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<CategoryEntity>) {
    return this.categoryService.update(id, dto)
  }

  @Put(':id/publish')
  publish(@Param('id') id: number) {
    return this.categoryService.update(id, { status: VisibilityStatus.Published})
  }

  @Put(':id/draft')
  draft(@Param('id') id: number) {
    return this.categoryService.update(id, { status: VisibilityStatus.Draft})
  }

  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.categoryService.update(id, { status: VisibilityStatus.Archived})
  }
}
