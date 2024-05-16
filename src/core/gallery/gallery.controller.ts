import { Body, Controller, Get, Post } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { DeepPartial } from 'typeorm';
import { GalleryEntity } from './gallery.entity';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Post()
  create(@Body() body: DeepPartial<GalleryEntity>) {
    return this.galleryService.create(body);
  }
}
