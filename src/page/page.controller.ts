import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PageService } from './page.service';
import { DeepPartial, In } from 'typeorm';
import { PageEntity } from './page.entity';
import { VisibilityStatus } from 'src/types/enums';
import { Public } from 'src/decorators/public.decorator';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @Get()
  findAll() {
    return this.pageService.findAll();
  }

  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string, @Query('statuses') _statuses: string[]) {
    const statuses = [_statuses].flat().filter(Boolean);
    return this.pageService.findOne({
      slug,
      status: statuses?.length ? In(statuses) : undefined,
    });
  }

  @Post()
  create(@Body() dto: DeepPartial<PageEntity>) {
    return this.pageService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<PageEntity>) {
    return this.pageService.update({ id }, dto);
  }

  @Put(':id/publish')
  publish(@Param('id') id: number) {
    return this.pageService.update(
      { id },
      {
        status: VisibilityStatus.Published,
      },
    );
  }

  @Put(':id/draft')
  draft(@Param('id') id: number) {
    return this.pageService.update({ id }, { status: VisibilityStatus.Draft });
  }

  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.pageService.update(
      { id },
      {
        status: VisibilityStatus.Archived,
      },
    );
  }
}
