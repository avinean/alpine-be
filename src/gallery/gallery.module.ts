import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryEntity } from './gallery.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  providers: [GalleryService],
  controllers: [GalleryController],
  imports: [
    TypeOrmModule.forFeature([GalleryEntity]),
    ProductModule, // temporary
  ],
})
export class GalleryModule {}
