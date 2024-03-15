import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { ColorService } from './color.service';
import { ColorEntity } from './color.entity';
import { DeepPartial } from 'typeorm';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Public()
  @Get()
  findAll() {
    return this.colorService.findAll();
  }

  @Post()
  create(@Body() dto: DeepPartial<ColorEntity>) {
    return this.colorService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<ColorEntity>) {
    return this.colorService.update(id, dto);
  }
}
