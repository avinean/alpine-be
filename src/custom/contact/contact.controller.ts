import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Public } from 'src/core/decorators/public.decorator';
import { DeepPartial, In } from 'typeorm';
import { ProductEntity } from 'src/custom/product/product.entity';
import { VisibilityStatus } from 'src/types/enums';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Get()
  findAll(@Query('statuses') _statuses: string = '') {
    const statuses = _statuses.split(',').filter(Boolean);
    return this.contactService.findAll({
      status: statuses?.length ? In(statuses) : undefined,
    });
  }

  @Post()
  create(@Body() dto: DeepPartial<ProductEntity>) {
    return this.contactService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<ProductEntity>) {
    return this.contactService.update(
      {
        id,
      },
      dto,
    );
  }

  @Put(':id/publish')
  publish(@Param('id') id: number) {
    return this.contactService.update(
      { id },
      {
        status: VisibilityStatus.Published,
      },
    );
  }

  @Put(':id/draft')
  draft(@Param('id') id: number) {
    return this.contactService.update(
      { id },
      { status: VisibilityStatus.Draft },
    );
  }

  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.contactService.update(
      { id },
      {
        status: VisibilityStatus.Archived,
      },
    );
  }
}
