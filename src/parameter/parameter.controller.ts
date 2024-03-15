import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { Public } from 'src/decorators/public.decorator';
import { DeepPartial } from 'typeorm';
import { ColorEntity } from 'src/color/color.entity';

@Controller('parameter')
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}

  @Public()
  @Get()
  findAll() {
    return this.parameterService.findAll();
  }

  @Public()
  @Get('suggestions')
  findAllSuggestions() {
    return this.parameterService.findAllSuggestions();
  }

  @Post()
  create(@Body() dto: DeepPartial<ColorEntity>) {
    return this.parameterService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<ColorEntity>) {
    return this.parameterService.update(id, dto);
  }}
