import { ColorEntity } from 'src/custom/color/color.entity';
import { ParameterEntity } from 'src/custom/parameter/parameter.entity';
import { ProductEntity } from 'src/custom/product/product.entity';
import {
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

  @ManyToOne(() => ColorEntity)
  color: ColorEntity;

  @ManyToMany(() => ColorEntity)
  @JoinTable()
  colors: ColorEntity[];

  @ManyToMany(() => ParameterEntity)
  @JoinTable()
  parameters: ParameterEntity[];

  @ManyToOne(() => ProductEntity, (product) => product.prices)
  product: ProductEntity;
}
