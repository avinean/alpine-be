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
  ) {
    this.migrate();
  }

  findAll() {
    return this.colorRepository.find();
  }

  async migrate() {
    const colors = await this.colorRepository.find();
    for (const color of colors) {
      color.slug = `${slugify(color.title, { lower: true })}-${color.id}`;
      await this.colorRepository.save(color);
    }
  }

  async create(dto: DeepPartial<ColorEntity>) {
    const color = await this.colorRepository.save(
      this.colorRepository.create({
        ...dto,
        slug: slugify(dto.title, { lower: true }),
      }),
    );

    color.slug = `${slugify(dto.title, { lower: true })}-${color.id}`;
    return this.colorRepository.save(color);
  }

  async update(id: number, dto: DeepPartial<ColorEntity>) {
    return this.colorRepository.update(id, dto);
  }
}
