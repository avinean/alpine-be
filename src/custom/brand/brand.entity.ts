import { CategoryEntity } from 'src/custom/category/category.entity';
import { ProductEntity } from 'src/custom/product/product.entity';
import { BrandType, VisibilityStatus } from 'src/types/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: BrandType,
    default: BrandType.Product,
  })
  type: BrandType;

  @Column({
    type: 'enum',
    enum: VisibilityStatus,
    default: VisibilityStatus.Draft,
  })
  status: VisibilityStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products: ProductEntity[];
}
