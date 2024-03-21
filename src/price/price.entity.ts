import { ColorEntity } from 'src/color/color.entity';
import { ParameterEntity } from 'src/parameter/parameter.entity';
import { ProductEntity } from 'src/product/product.entity';
import {
  AfterRemove,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PriceEntity {
  @PrimaryGeneratedColumn()
  article: string;

  @Column({ type: 'float', nullable: true })
  price: number;

  @ManyToOne(() => ColorEntity, (color) => color.prices)
  color: ColorEntity;

  @ManyToMany(() => ParameterEntity)
  @JoinTable()
  parameters: ParameterEntity[];

  @ManyToOne(() => ProductEntity, (product) => product.prices)
  product: ProductEntity;
}
