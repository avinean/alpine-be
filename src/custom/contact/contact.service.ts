import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from './contact.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly productRepository: Repository<ContactEntity>,
  ) {}

  findAll(where?: FindOptionsWhere<ContactEntity>) {
    return this.productRepository.find({ where });
  }

  create(dto: DeepPartial<ContactEntity>) {
    return this.productRepository.save(this.productRepository.create(dto));
  }

  async update(
    where: FindOptionsWhere<ContactEntity>,
    params: DeepPartial<ContactEntity>,
  ) {
    const product = await this.productRepository.findOne({
      where,
    });
    Object.assign(product, params);
    return this.productRepository.save(product);
  }
}
