import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import User from './entities/user.entity';
import { FilesModule } from '../files/files.module';
import { PrivateFilesModule } from '../private-files/private-files.module';
import { UsersController } from './users.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User]), FilesModule, PrivateFilesModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
