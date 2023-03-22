import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import User from './../../users/entities/user.entity';
import Category from './../../categories/entities/category.entity';
@Entity()
class Post {
  // 主键是用于在表中唯一标识行的列。虽然我们可以使用现有的列并将其设置为主键，但通常会创建一个id列。通过选择TypeORM中的PrimaryGeneratedColumn，我们创建了一个自动生成值的整数主键列。
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  // @Column({ nullable: true })
  // public category?: string;

  @Column({ nullable: true })
  @Transform(({ value }) => {
    if (value !== null) {
      return value;
    }
  })
  public category?: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];
}

export default Post;
