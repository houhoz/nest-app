import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import User from './entities/user.entity';
import { FilesModule } from '../files/files.module';
import { UsersController } from './users.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User]), FilesModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
