import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Address from './address.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  // 在User实体类中，我们使用@OneToOne装饰器并传递一个配置对象，其中eager: true表示在加载User时自动加载Address（不是延迟加载），cascade: true表示在插入或更新User时自动插入或更新Address
  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address: Address;
}

export default User;
