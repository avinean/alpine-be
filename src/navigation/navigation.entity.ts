import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NavigationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  navigation: object[];
}
