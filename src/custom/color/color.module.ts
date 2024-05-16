import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorEntity } from './color.entity';

@Module({
  providers: [ColorService],
  controllers: [ColorController],
  imports: [TypeOrmModule.forFeature([ColorEntity])],
})
export class ColorModule {}
