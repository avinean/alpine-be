import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NavigationEntity } from './navigation.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class NavigationService {
  constructor(
    @InjectRepository(NavigationEntity)
    private readonly navigationRepository: Repository<NavigationEntity>,
  ) {
    this.init();
  }

  async init() {
    const navigation = await this.findOne();
    if (!navigation) {
      this.create({ navigation: [] });
    }
  }

  findOne() {
    return this.navigationRepository.findOne({ where: {} });
  }

  create(data: DeepPartial<NavigationEntity>) {
    return this.navigationRepository.save(
      this.navigationRepository.create(data),
    );
  }

  async update(
    where: FindOptionsWhere<NavigationEntity>,
    data: DeepPartial<NavigationEntity>,
  ) {
    const navigation = await this.navigationRepository.findOne({ where });
    Object.assign(navigation, data);
    return this.navigationRepository.save(navigation);
  }
}
