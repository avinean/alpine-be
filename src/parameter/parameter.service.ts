import { Injectable } from '@nestjs/common';
import { ParameterEntity } from './parameter.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { slugify } from 'src/utils';

@Injectable()
export class ParameterService {
  constructor(
    @InjectRepository(ParameterEntity)
    private readonly parameterRepository: Repository<ParameterEntity>,
  ) {}

  findAll() {
    return this.parameterRepository.find({
      order: {
        type: 'ASC',
      },
    });
  }

  async findAllSuggestions() {
    const parameters = await this.parameterRepository.find();

    const suggestions = parameters.reduce((acc, parameter) => {
      const { type, unit, value } = parameter;

      let typeEntry = acc.find((entry) => entry.type === type);
      if (!typeEntry) {
        typeEntry = { type, units: [] };
        acc.push(typeEntry);
      }

      let unitEntry = typeEntry.units.find((entry) => entry.unit === unit);
      if (!unitEntry) {
        unitEntry = { unit, values: [] };
        typeEntry.units.push(unitEntry);
      }

      unitEntry.values.push(value);

      return acc;
    }, []);

    return suggestions;
  }

  create(dto: DeepPartial<ParameterEntity>) {
    return this.parameterRepository.save(
      this.parameterRepository.create({
        ...dto,
        slug: slugify([dto.type, dto.value].join('-')),
      }),
    );
  }

  async update(id: number, dto: DeepPartial<ParameterEntity>) {
    return this.parameterRepository.update(id, dto);
  }

  async delete(where: FindOptionsWhere<ParameterEntity>) {
    return this.parameterRepository.delete(where);
  }
}
