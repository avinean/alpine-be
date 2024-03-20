import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';

@Module({
  providers: [BrandService],
  controllers: [BrandController],
  imports: [TypeOrmModule.forFeature([BrandEntity])],
})
export class BrandModule {}
