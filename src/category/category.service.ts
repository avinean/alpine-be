import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  findAll(where?: FindOptionsWhere<CategoryEntity>) {
    return this.categoryRepository.find({
      where,
      relations: {
        brand: true,
      },
    });
  }

  findOne(where?: FindOptionsWhere<CategoryEntity>) {
    return this.categoryRepository.findOne({
      where,
      relations: {
        brand: true,
      },
    });
  }

  create(dto: DeepPartial<CategoryEntity>) {
    return this.categoryRepository.save(this.categoryRepository.create(dto));
  }

  async update(id: number, dto: DeepPartial<CategoryEntity>) {
    return this.categoryRepository.update(id, dto);
  }
}
