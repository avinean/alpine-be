import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryEntity } from './gallery.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import slugify from 'slugify';
import { ServiceService } from 'src/service/service.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
    private readonly serviceService: ServiceService,
  ) {
    this.migrate();
  }

  async migrate() {
    const services = await this.serviceService.findAll({});

    services.forEach(async (product) => {
      const galleryItem = await this.galleryRepository.findOne({
        where: {
          image: product.image,
        },
      });
      if (!galleryItem) {
        await this.galleryRepository.save(
          this.galleryRepository.create({
            title: product.title,
            image: product.image,
            slug: slugify(product.title, { lower: true }),
          }),
        );
      }
    });
  }

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
