import { Module } from '@nestjs/common';
import { UtilService } from './util.service';
import { UtilController } from './util.controller';

@Module({
  providers: [UtilService],
  controllers: [UtilController],
  exports: [UtilService],
})
export class UtilModule {}
