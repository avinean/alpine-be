import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationEntity } from './application.entity';
import { DeepPartial, Repository } from 'typeorm';
import { slugify } from 'src/utils';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly colorRepository: Repository<ApplicationEntity>,
  ) {}

  findAll() {
    return this.colorRepository.find();
  }

  create(dto: DeepPartial<ApplicationEntity>) {
    return this.colorRepository.save(
      this.colorRepository.create({
        ...dto,
        slug: slugify(dto.title),
      }),
    );
  }

  async update(id: number, dto: DeepPartial<ApplicationEntity>) {
    return this.colorRepository.update(id, dto);
  }
}
