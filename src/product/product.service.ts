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
  ) {}

  findAll(where?: FindOptionsWhere<ProductEntity>) {
    return this.productRepository.find({
      where,
      relations: {
        colors: true,
        parameters: true,
        applications: true,
      },
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

  async update(
    where: FindOptionsWhere<ProductEntity>,
    params: DeepPartial<ProductEntity>,
  ) {
    const product = await this.productRepository.findOne({
      where,
    });
    Object.assign(product, params);
    return this.productRepository.save(product);
  }
}
