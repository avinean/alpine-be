import { ApplicationEntity } from 'src/application/application.entity';
import { BrandEntity } from 'src/brand/brand.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { GalleryEntity } from 'src/gallery/gallery.entity';
import { PriceEntity } from 'src/price/price.entity';
import { VisibilityStatus } from 'src/types/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @ManyToMany(() => ApplicationEntity)
  @JoinTable()
  applications: ApplicationEntity[];

  @OneToMany(() => PriceEntity, (price) => price.product, {
    cascade: true,
  })
  prices: PriceEntity[];

  @ManyToMany(() => GalleryEntity)
  @JoinTable()
  images: GalleryEntity[];

  @ManyToOne(() => GalleryEntity)
  @JoinColumn()
  primaryImage: GalleryEntity;
}
