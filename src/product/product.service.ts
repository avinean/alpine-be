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
    this.refresh();
  }

  async refresh() {
    const products = await this.productRepository.find({
      relations: {
        category: {
          brand: true,
        },
        brand: true,
      },
    });

    products.forEach(async (product) => {
      if (!product.brand) {
        console.log('product', product.brand);
        console.log('product', product.category);
        console.log('product', product.category?.brand);
        const brand = product.category?.brand;
        if (brand) {
          product.brand = brand;
          console.log('product', product.brand);
          await this.productRepository.save(product);
        }
      }
    });
  }

  findAll(where?: FindOptionsWhere<ProductEntity>) {
    return this.productRepository.find({
      where,
      relations: {
        category: true,
        brand: true,
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
        slug: slugify(dto.title, { lower: true }),
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
