import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { DeepPartial, In } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { Public } from 'src/decorators/public.decorator';
import { VisibilityStatus } from 'src/types/enums';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get()
  findAll(
    @Query('brands') _brands: number[],
    @Query('statuses') _statuses: [],
  ) {
    const statuses = [_statuses].flat().filter(Boolean);
    const brands = [_brands].flat().filter(Boolean).map(Number);
    return this.categoryService.findAll({
      brand: brands?.length ? { id: In(brands) } : undefined,
      status: statuses?.length ? In(statuses) : undefined,
    });
  }

  @Public()
  @Get(':idOrSlug')
  findOne(@Param('idOrSlug') idOrSlug: number | string) {
    return this.categoryService.findOne([
      { id: idOrSlug as number },
      { slug: idOrSlug as string },
    ]);
  }

  @Post(':brandId')
  create(
    @Param('brandId') brandId: number,
    @Body() dto: DeepPartial<CategoryEntity>,
  ) {
    return this.categoryService.create({
      ...dto,
      brand: {
        id: brandId,
      },
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<CategoryEntity>) {
    return this.categoryService.update(id, dto);
  }

  @Put(':id/publish')
  publish(@Param('id') id: number) {
    return this.categoryService.update(id, {
      status: VisibilityStatus.Published,
    });
  }

  @Put(':id/draft')
  draft(@Param('id') id: number) {
    return this.categoryService.update(id, { status: VisibilityStatus.Draft });
  }

  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.categoryService.update(id, {
      status: VisibilityStatus.Archived,
    });
  }
}
