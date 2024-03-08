import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  findAll(where?: FindOptionsWhere<ProductEntity>) {
    return this.productRepository.find({
      where
    });
  }

  create(dto: DeepPartial<ProductEntity>) {
    return this.productRepository.save(this.productRepository.create(dto));
  }

  async update( id: number, dto: DeepPartial<ProductEntity>) {
    return this.productRepository.update(id, dto);
  }
}
