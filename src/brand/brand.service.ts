import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  findAll(where?: FindOptionsWhere<BrandEntity>) {
    return this.brandRepository.find({ where });
  }

  create(dto: DeepPartial<BrandEntity>) {
    console.log(dto);
    return this.brandRepository.save(this.brandRepository.create(dto));
  }

  async update(id: number, dto: DeepPartial<BrandEntity>) {
    return this.brandRepository.update(id, dto);
  }
}
