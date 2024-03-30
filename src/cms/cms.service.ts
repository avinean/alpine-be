import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CmsEntity } from './cms.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class CmsService {
  constructor(
    @InjectRepository(CmsEntity)
    private readonly cmsRepository: Repository<CmsEntity>,
  ) {}

  async findAll() {
    return this.cmsRepository.find();
  }

  findOne(where: FindOptionsWhere<CmsEntity>) {
    return this.cmsRepository.findOne({ where });
  }

  create(data: DeepPartial<CmsEntity>) {
    return this.cmsRepository.save(
      this.cmsRepository.create({
        ...data,
        slug: slugify(data.title, { lower: true }),
      }),
    );
  }

  async update(
    where: FindOptionsWhere<CmsEntity>,
    data: DeepPartial<CmsEntity>,
  ) {
    const cms = await this.cmsRepository.findOne({ where });
    Object.assign(cms, data);
    return this.cmsRepository.save(cms);
  }
}
