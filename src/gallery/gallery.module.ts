import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryEntity } from './gallery.entity';
import { ServiceModule } from 'src/service/service.module';

@Module({
  providers: [GalleryService],
  controllers: [GalleryController],
  imports: [
    TypeOrmModule.forFeature([GalleryEntity]),
    ServiceModule, // temporary
  ],
})
export class GalleryModule {}
