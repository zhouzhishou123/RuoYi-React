import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysDept } from '../entities/SysDept';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(SysDept)
    private readonly deptRepository: Repository<SysDept>,
  ) {}

  // 查询所有部门
  async findAllDepts(): Promise<SysDept[]> {
    return this.deptRepository.find({
      relations: {
        users: true,
      },
    });
  }

  // 根据部门ID查询部门
  async findDeptById(deptId: string): Promise<SysDept> {
    const dept = await this.deptRepository.findOne({
      where: { deptId },
      relations: {
        users: true,
      },
    });
    if (!dept) {
      throw new NotFoundException('部门不存在');
    }
    return dept;
  }
}
