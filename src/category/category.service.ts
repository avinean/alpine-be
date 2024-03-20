import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  findAll(where?: FindOptionsWhere<CategoryEntity>) {
    return this.categoryRepository.find({ where });
  }

  findOne(
    where?:
      | FindOptionsWhere<CategoryEntity>
      | FindOptionsWhere<CategoryEntity>[],
  ) {
    return this.categoryRepository.findOne({ where });
  }

  create(dto: DeepPartial<CategoryEntity>) {
    return this.categoryRepository.save(
      this.categoryRepository.create({
        ...dto,
        slug: slugify(dto.title, { lower: true }),
      }),
    );
  }

  async update(id: number, dto: DeepPartial<CategoryEntity>) {
    return this.categoryRepository.update(id, dto);
  }
}
