import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './service.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  findAll(where?: FindOptionsWhere<ServiceEntity>) {
    return this.serviceRepository.find({ where });
  }

  create(dto: DeepPartial<ServiceEntity>) {
    return this.serviceRepository.save(this.serviceRepository.create(dto));
  }

  async update(
    where: FindOptionsWhere<ServiceEntity>,
    params: DeepPartial<ServiceEntity>,
  ) {
    const product = await this.serviceRepository.findOne({
      where,
    });
    Object.assign(product, params);
    return this.serviceRepository.save(product);
  }
}
