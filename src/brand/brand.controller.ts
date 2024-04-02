import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BrandService } from './brand.service';
import { DeepPartial, In } from 'typeorm';
import { BrandEntity } from './brand.entity';
import { Public } from 'src/decorators/public.decorator';
import { VisibilityStatus } from 'src/types/enums';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Public()
  @Get()
  findAll(
    @Query('statuses') _statuses: string = '',
    @Query('categories') _categories: string = '',
  ) {
    const statuses = _statuses.split(',').filter(Boolean);
    const categories = _categories.split(',').filter(Boolean);

    return this.brandService.findAll({
      status: statuses?.length ? In(statuses) : undefined,
      products: {
        category: {
          slug: categories?.length ? In(categories) : undefined,
        },
      },
    });
  }

  @Post()
  create(@Body() dto: DeepPartial<BrandEntity>) {
    return this.brandService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<BrandEntity>) {
    return this.brandService.update(id, dto);
  }

  @Post('delete/:id')
  delete(@Param('id') id: number) {
    return this.brandService.delete({ id });
  }

  @Put(':id/publish')
  publish(@Param('id') id: number) {
    return this.brandService.update(id, { status: VisibilityStatus.Published });
  }

  @Put(':id/draft')
  draft(@Param('id') id: number) {
    return this.brandService.update(id, { status: VisibilityStatus.Draft });
  }

  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.brandService.update(id, { status: VisibilityStatus.Archived });
  }
}
