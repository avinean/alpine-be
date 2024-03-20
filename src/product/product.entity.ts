import { ApplicationEntity } from 'src/application/application.entity';
import { BrandEntity } from 'src/brand/brand.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { ColorEntity } from 'src/color/color.entity';
import { ParameterEntity } from 'src/parameter/parameter.entity';
import { VisibilityStatus } from 'src/types/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 1000, default: '' })
  description: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  application: string;

  @Column({ nullable: true })
  standart: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ nullable: true })
  tags: string;

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

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  brand: BrandEntity;

  @ManyToMany(() => ColorEntity)
  @JoinTable()
  colors: ColorEntity[];

  @ManyToMany(() => ParameterEntity)
  @JoinTable()
  parameters: ParameterEntity[];

  @ManyToMany(() => ApplicationEntity)
  @JoinTable()
  applications: ApplicationEntity[];
}
