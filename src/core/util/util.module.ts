import { Module } from '@nestjs/common';
import { UtilService } from './util.service';
import { UtilController } from './util.controller';
import { TelegramModule } from 'src/core/telegram/telegram.module';

@Module({
  providers: [UtilService],
  controllers: [UtilController],
  exports: [UtilService],
  imports: [TelegramModule],
})
export class UtilModule {}
