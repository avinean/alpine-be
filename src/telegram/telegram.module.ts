import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramEntity } from './telegram.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [TelegramService],
  controllers: [TelegramController],
  imports: [TypeOrmModule.forFeature([TelegramEntity]), HttpModule],
  exports: [TelegramService],
})
export class TelegramModule {}
