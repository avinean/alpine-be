import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { PriceEntity } from './price.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,
  ) {}

  create(price: DeepPartial<PriceEntity>) {
    return this.priceRepository.save(this.priceRepository.create(price));
  }

  async update(
    where: FindOneOptions<PriceEntity>,
    price: DeepPartial<PriceEntity>,
  ) {
    const _price = await this.priceRepository.findOne(where);
    Object.assign(_price, price);
    return this.priceRepository.save(_price);
  }

  async delete(where: FindOneOptions<PriceEntity>) {
    const price = await this.priceRepository.findOne(where);
    return this.priceRepository.remove(price);
  }
}
