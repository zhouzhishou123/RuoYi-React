import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysUser } from '../entities/SysUser';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SysRole } from '../entities/SysRole';
import { SysDept } from '../entities/SysDept';

@Module({
  imports: [TypeOrmModule.forFeature([SysUser, SysRole, SysDept])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
