import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {
    this.init();
  }

  async init() {
    const all = await this.productRepository.find({
      relations: ['category'],
    });
    this.productRepository.save(
      all.map((product) => ({
        ...product,
        slug: slugify([product.title, product.category.id].join('-'), {
          lower: true,
        }),
      })),
    );
  }

  findAll(where?: FindOptionsWhere<ProductEntity>) {
    return this.productRepository.find({
      where,
    });
  }

  create(dto: DeepPartial<ProductEntity>) {
    return this.productRepository.save(
      this.productRepository.create({
        ...dto,
        slug: slugify([dto.title, dto.category.id].join('-'), { lower: true }),
      }),
    );
  }

  async update(id: number, dto: DeepPartial<ProductEntity>) {
    return this.productRepository.update(id, dto);
  }
}
