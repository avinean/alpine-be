import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import slugify from 'slugify';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly utilService: UtilService,
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

  async delete(where: FindOptionsWhere<CategoryEntity>) {
    const product = await this.categoryRepository.findOne({ where });
    this.utilService.delete(product.image);
    return this.categoryRepository.delete(where);
  }
}
