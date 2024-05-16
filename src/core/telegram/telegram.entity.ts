import { CategoryEntity } from 'src/custom/category/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TelegramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region: string;

  @Column()
  botApiKey: string;

  @Column()
  userIds: string;

  @Column()
  link: string;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];
}
