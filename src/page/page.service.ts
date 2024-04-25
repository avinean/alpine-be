import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from './page.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepository: Repository<PageEntity>,
  ) {}

  async findAll() {
    return this.pageRepository.find({
      relations: {
        section: true,
      },
    });
  }

  findOne(where: FindOptionsWhere<PageEntity>) {
    return this.pageRepository.findOne({
      where,
      relations: {
        section: true,
      },
    });
  }

  create(data: DeepPartial<PageEntity>) {
    return this.pageRepository.save(this.pageRepository.create(data));
  }

  async update(
    where: FindOptionsWhere<PageEntity>,
    data: DeepPartial<PageEntity>,
  ) {
    const page = await this.pageRepository.findOne({ where });
    Object.assign(page, data);
    return this.pageRepository.save(page);
  }
}
