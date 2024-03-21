import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { PriceEntity } from 'src/price/price.entity';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,
    private readonly utilService: UtilService,
  ) {}

  findAll(where: FindOptionsWhere<ProductEntity>, pure: boolean) {
    return this.productRepository.find({
      where,
      relations: pure
        ? {}
        : {
            category: true,
            brand: true,
            colors: true,
            parameters: true,
            applications: true,
            prices: {
              color: true,
              parameters: true,
            },
          },
    });
  }

  findOne(where?: FindOptionsWhere<ProductEntity>) {
    return this.productRepository.findOne({
      where,
      relations: {
        category: true,
        brand: true,
        colors: true,
        parameters: true,
        applications: true,
        prices: {
          color: true,
          parameters: true,
        },
      },
    });
  }

  async create(dto: DeepPartial<ProductEntity>) {
    const product = await this.productRepository.save(
      this.productRepository.create({
        ...dto,
        slug: slugify(dto.title, { lower: true }),
      }),
    );

    product.prices = this.priceRepository.create(dto.prices);

    return this.productRepository.save(product);
  }

  async update(
    where: FindOptionsWhere<ProductEntity>,
    params: DeepPartial<ProductEntity>,
  ) {
    const product = await this.productRepository.findOne({ where });
    Object.assign(product, params);
    return this.productRepository.save(product);
  }

  async delete(where: FindOptionsWhere<ProductEntity>) {
    const product = await this.productRepository.findOne({ where });
    this.priceRepository.delete({ product });
    try {
      this.utilService.delete(product.image);
    } finally {
      return this.productRepository.delete(where);
    }
  }
}
