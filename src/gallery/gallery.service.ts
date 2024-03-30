import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryEntity } from './gallery.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import slugify from 'slugify';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
  ) {}

  findAll() {
    return this.galleryRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(params: DeepPartial<GalleryEntity>) {
    const product = await this.galleryRepository.save(
      this.galleryRepository.create({
        ...params,
        slug: slugify(params.title, { lower: true }),
      }),
    );

    product.slug = `${slugify(params.title, { lower: true })}-${product.id}`;
    return this.galleryRepository.save(product);
  }

  async update(
    where: FindOptionsWhere<ProductEntity>,
    params: DeepPartial<ProductEntity>,
  ) {
    const galleryItem = await this.galleryRepository.findOne({ where });
    galleryItem.slug = `${slugify(galleryItem.title, { lower: true })}-${galleryItem.id}`;
    Object.assign(galleryItem, params);
    return this.galleryRepository.save(galleryItem);
  }
}
