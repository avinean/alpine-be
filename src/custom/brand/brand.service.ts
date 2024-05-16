import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UtilService } from 'src/core/util/util.service';
import { slugify } from 'src/utils';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
    private readonly utilService: UtilService,
  ) {}

  findAll(where?: FindOptionsWhere<BrandEntity>) {
    return this.brandRepository.find({ where });
  }

  create(dto: DeepPartial<BrandEntity>) {
    return this.brandRepository.save(
      this.brandRepository.create({
        ...dto,
        slug: slugify(dto.title),
      }),
    );
  }

  async update(id: number, dto: DeepPartial<BrandEntity>) {
    return this.brandRepository.update(id, dto);
  }

  async delete(where: FindOptionsWhere<BrandEntity>) {
    const product = await this.brandRepository.findOne({ where });
    this.utilService.delete(product.image);
    return this.brandRepository.delete(where);
  }
}
