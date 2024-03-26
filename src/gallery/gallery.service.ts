import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryEntity } from './gallery.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/product/product.entity';
import slugify from 'slugify';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
    private readonly productService: ProductService,
  ) {
    this.migrate();
  }

  async migrate() {
    const products = await this.productService.findAll({});

    products.items.forEach(async (product) => {
      const galleryItem = await this.galleryRepository.findOne({
        where: {
          image: product.image,
        },
      });
      if (!galleryItem) {
        const item = await this.galleryRepository.save(
          this.galleryRepository.create({
            title: product.title,
            image: product.image,
            slug: slugify(product.title, { lower: true }),
            products: [product],
          }),
        );
        item.products = [product];
        await this.galleryRepository.save(item);

        this.productService.update(
          {
            id: product.id,
          },
          {
            images: [item],
            primaryImage: item,
          },
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
