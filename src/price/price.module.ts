import { Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceEntity } from './price.entity';

@Module({
  controllers: [PriceController],
  providers: [PriceService],
  imports: [TypeOrmModule.forFeature([PriceEntity])],
  exports: [PriceService],
})
export class PriceModule {}
