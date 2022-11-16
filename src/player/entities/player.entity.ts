import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('player')
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ default: '', nullable: true })
  avatar: string;

  @Column()
  team: number;

  @Column({ default: 0 })
  goal: number;

  @Column({ default: 0 })
  assist: number;

  @Column({ name: 'yellow_card', default: 0 })
  yellowCard: number;

  @Column({ name: 'red_card', default: 0 })
  redCard: number;

  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
}
