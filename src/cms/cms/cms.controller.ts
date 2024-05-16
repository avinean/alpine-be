import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CmsService } from './cms.service';
import { DeepPartial, In } from 'typeorm';
import { CmsEntity } from './cms.entity';
import { Public } from 'src/core/decorators/public.decorator';
import { VisibilityStatus } from 'src/types/enums';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}
  @Get()
  findAll() {
    return this.cmsService.findAll();
  }

  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string, @Query('statuses') _statuses: string[]) {
    const statuses = [_statuses].flat().filter(Boolean);
    return this.cmsService.findOne({
      slug,
      status: statuses?.length ? In(statuses) : undefined,
    });
  }

  @Post()
  create(@Body() dto: DeepPartial<CmsEntity>) {
    return this.cmsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<CmsEntity>) {
    return this.cmsService.update({ id }, dto);
  }

  @Put(':id/publish')
  publish(@Param('id') id: number) {
    return this.cmsService.update(
      { id },
      {
        status: VisibilityStatus.Published,
      },
    );
  }

  @Put(':id/draft')
  draft(@Param('id') id: number) {
    return this.cmsService.update({ id }, { status: VisibilityStatus.Draft });
  }

  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.cmsService.update(
      { id },
      {
        status: VisibilityStatus.Archived,
      },
    );
  }
}
