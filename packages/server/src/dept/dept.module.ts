import { SysDept } from '@/entities/SysDept';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SysDept])],
  providers: [DeptService],
  exports: [DeptService],
  controllers: [DeptController],
})
export class DeptModule {}
