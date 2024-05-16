import { CmsEntity } from '../cms/cms.entity';
import { VisibilityStatus } from 'src/types/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ type: 'json' })
  meta: object;

  @Column({ type: 'json' })
  breadcrumbs: object;

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

  @OneToOne(() => CmsEntity)
  @JoinColumn()
  section: CmsEntity;
}
