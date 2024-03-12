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
  ) {
    this.init();
  }

  async init() {
    const all = await this.categoryRepository.find({
      relations: ['brand'],
    });
    this.categoryRepository.save(
      all.map((product) => ({
        ...product,
        slug: slugify([product.title, product.brand?.id].join('-'), {
          lower: true,
        }),
      })),
    );
  }

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
    return this.categoryRepository.save(
      this.categoryRepository.create({
        ...dto,
        slug: slugify([dto.title, dto.brand.id].join('-'), { lower: true }),
      }),
    );
  }

  async update(id: number, dto: DeepPartial<CategoryEntity>) {
    return this.categoryRepository.update(id, dto);
  }
}
