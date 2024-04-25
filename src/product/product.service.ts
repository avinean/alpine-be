import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceEntity } from 'src/price/price.entity';
import { UtilService } from 'src/util/util.service';
import { ColorEntity } from 'src/color/color.entity';
import { ParameterEntity } from 'src/parameter/parameter.entity';
import { slugify } from 'src/utils';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,
    private readonly utilService: UtilService,
  ) {}

  async findAll(
    where: FindOptionsWhere<ProductEntity>,
    page?: number,
    take?: number,
  ) {
    const [items, total] = await this.productRepository.findAndCount({
      where,
      relations: {
        category: true,
        brand: true,
        applications: true,
        images: true,
        primaryImage: true,
        prices: {
          color: true,
          colors: true,
          parameters: true,
        },
      },
      skip: take ? (page - 1) * take : undefined,
      take,
    });

    return {
      items,
      pages: Math.ceil(total / take),
    };
  }

  async findAllByPage(
    where: FindOptionsWhere<ProductEntity>,
    page: number = 1,
    take: number = 10,
  ) {
    const [items, total] = await this.productRepository.findAndCount({
      where,
      relations: {
        primaryImage: true,
        prices: true,
      },
      skip: (page - 1) * take,
      take,
    });

    return {
      items: items.map((item) => ({
        ...item,
        prices: [
          item.prices.reduce(
            (acc, cur) => (!acc ? cur : cur.price < acc.price ? cur : acc),
            null,
          ),
        ],
      })),
      pages: Math.ceil(total / take),
    };
  }

  async findAllFilters(where: FindOptionsWhere<ProductEntity>) {
    const products = await this.productRepository.find({
      where,
      relations: {
        prices: {
          colors: true,
          parameters: true,
        },
      },
    });

    const prices = products.flatMap(({ prices }) => prices);
    const colors = prices
      ?.flatMap((price) => price.colors)
      .reduce((acc, _) => {
        if (acc.find((color) => color?.id === _?.id)) return acc;
        return [...acc, _];
      }, [] as ColorEntity[]);

    const parameters: Record<string, ParameterEntity[]> = {};
    prices
      ?.flatMap((price) => price.parameters)
      .reduce(
        (acc, _) =>
          acc.find((parameter) => parameter?.id === _?.id) ? acc : [...acc, _],
        [] as ParameterEntity[],
      )
      .forEach((parameter) => {
        if (!parameters[parameter.type]) parameters[parameter.type] = [];
        parameters[parameter.type].push(parameter);
      });

    return {
      colors,
      parameters: Object.entries(parameters).map(([label, items]) => ({
        label,
        items,
      })),
    };
  }

  findOne(where?: FindOptionsWhere<ProductEntity>) {
    return this.productRepository.findOne({
      where,
      relations: {
        category: true,
        brand: true,
        applications: true,
        prices: {
          colors: true,
          parameters: true,
        },
        images: true,
        primaryImage: true,
      },
    });
  }

  async create(dto: DeepPartial<ProductEntity>) {
    const product = await this.productRepository.save(
      this.productRepository.create({
        ...dto,
        slug: slugify(dto.title),
      }),
    );

    product.slug = `${slugify(dto.title)}-${product.id}`;
    product.prices = this.priceRepository.create(dto.prices);
    return this.productRepository.save(product);
  }

  async update(
    where: FindOptionsWhere<ProductEntity>,
    params: DeepPartial<ProductEntity>,
  ) {
    const product = await this.productRepository.findOne({ where });
    product.slug = `${slugify(product.title)}-${product.id}`;
    Object.assign(product, params);
    return this.productRepository.save(product);
  }

  async delete(where: FindOptionsWhere<ProductEntity>) {
    const product = await this.productRepository.findOne({ where });
    this.priceRepository.delete({ product });
    return this.productRepository.delete(where);
  }
}
