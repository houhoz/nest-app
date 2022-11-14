// use/entities/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: true })
  username: string;

  @Column({ length: 100, nullable: true })
  nickname: string;

  @Exclude()
  @Column({ select: false, nullable: true })
  password: string;

  @Column({ default: null })
  avatar: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  openid: string;

  @Column('enum', { enum: ['root', 'author', 'visitor'], default: 'visitor' })
  role: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password);
  }
}
