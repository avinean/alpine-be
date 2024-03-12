import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {
    this.init();
  }

  async init() {
    const all = await this.brandRepository.find();
    this.brandRepository.save(
      all.map((product) => ({
        ...product,
        slug: slugify(product.title, { lower: true }),
      })),
    );
  }

  findAll(where?: FindOptionsWhere<BrandEntity>) {
    return this.brandRepository.find({ where });
  }

  create(dto: DeepPartial<BrandEntity>) {
    return this.brandRepository.save(
      this.brandRepository.create({
        ...dto,
        slug: slugify(dto.title, { lower: true }),
      }),
    );
  }

  async update(id: number, dto: DeepPartial<BrandEntity>) {
    return this.brandRepository.update(id, dto);
  }
}
