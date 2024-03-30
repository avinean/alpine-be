import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryEntity } from './gallery.entity';

@Module({
  providers: [GalleryService],
  controllers: [GalleryController],
  imports: [TypeOrmModule.forFeature([GalleryEntity])],
})
export class GalleryModule {}
