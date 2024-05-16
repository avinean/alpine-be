import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { DeepPartial } from 'typeorm';
import { TelegramEntity } from './telegram.entity';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get()
  findAll() {
    return this.telegramService.findAll();
  }

  @Post()
  create(@Body() dto: DeepPartial<TelegramEntity>) {
    return this.telegramService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<TelegramEntity>) {
    return this.telegramService.update(id, dto);
  }
}
