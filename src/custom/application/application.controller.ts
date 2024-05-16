import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Public } from 'src/core/decorators/public.decorator';
import { DeepPartial } from 'typeorm';
import { ApplicationEntity } from './application.entity';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Public()
  @Get()
  findAll() {
    return this.applicationService.findAll();
  }

  @Post()
  create(@Body() dto: DeepPartial<ApplicationEntity>) {
    return this.applicationService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<ApplicationEntity>) {
    return this.applicationService.update(id, dto);
  }
}
