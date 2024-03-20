import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Public } from 'src/decorators/public.decorator';
import { DeepPartial, In } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { VisibilityStatus } from 'src/types/enums';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Public()
  @Get()
  findAll(@Query('statuses') _statuses: []) {
    const statuses = [_statuses].flat().filter(Boolean);
    return this.serviceService.findAll({
      status: statuses?.length ? In(statuses) : undefined,
    });
  }

  @Post()
  create(@Body() dto: DeepPartial<ProductEntity>) {
    return this.serviceService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<ProductEntity>) {
    return this.serviceService.update(
      {
        id,
      },
      dto,
    );
  }

  @Put(':id/publish')
  publish(@Param('id') id: number) {
    return this.serviceService.update(
      { id },
      {
        status: VisibilityStatus.Published,
      },
    );
  }

  @Put(':id/draft')
  draft(@Param('id') id: number) {
    return this.serviceService.update(
      { id },
      { status: VisibilityStatus.Draft },
    );
  }

  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.serviceService.update(
      { id },
      {
        status: VisibilityStatus.Archived,
      },
    );
  }
}
