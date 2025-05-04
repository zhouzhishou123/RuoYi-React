import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysRole } from '../entities/SysRole';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(SysRole)
    private readonly roleRepository: Repository<SysRole>,
  ) {}

  // 查询所有角色
  async findAllRoles(): Promise<SysRole[]> {
    return this.roleRepository.find({
      relations: {
        menus: true,
      },
    });
  }

  // 根据角色ID查询角色
  async findRoleById(roleId: string): Promise<SysRole> {
    const role = await this.roleRepository.findOne({
      where: { roleId },
      relations: {
        menus: true,
      },
    });
    if (!role) {
      throw new NotFoundException('角色不存在');
    }
    return role;
  }
}
