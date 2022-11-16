import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('match')
export class MatchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  round: number;

  @Column()
  time: Date;

  @Column('enum', { enum: [1, 2, 3], default: 1, name: 'home_team' })
  homeTeam: number;

  @Column('enum', { enum: [1, 2, 3], default: 1, name: 'visiting_team' })
  visitingTeam: number;

  @Column({ default: 0, name: 'home_score' })
  homeScore: number;

  @Column({ default: 0, name: 'visiting_score' })
  visitingScore: number;

  @Column('simple-json', { name: 'key_data' })
  keyData: { type: number; id: number }[];

  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
}
