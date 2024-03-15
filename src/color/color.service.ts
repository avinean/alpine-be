import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorEntity } from './color.entity';
import { DeepPartial, Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
  ) {}

  findAll() {
    return this.colorRepository.find();
  }

  create(dto: DeepPartial<ColorEntity>) {
    return this.colorRepository.save(
      this.colorRepository.create({
        ...dto,
        slug: slugify(dto.title, { lower: true }),
      }),
    );
  }

  async update(id: number, dto: DeepPartial<ColorEntity>) {
    return this.colorRepository.update(id, dto);
  }
}
