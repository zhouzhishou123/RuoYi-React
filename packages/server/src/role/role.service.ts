import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
      where: {
        delFlag: '0', // 只查询未删除的角色
      },
      order: {
        roleSort: 'ASC', // 按照显示顺序排序
      },
    });
  }

  // 分页查询角色列表
  async findRoleList(query: any): Promise<{ list: SysRole[]; total: number }> {
    const { roleName, roleKey, status, pageNum = 1, pageSize = 10 } = query;

    // 构建查询条件
    const where: any = {
      delFlag: '0', // 只查询未删除的角色
    };

    if (roleName) {
      where.roleName = Like(`%${roleName}%`);
    }

    if (roleKey) {
      where.roleKey = Like(`%${roleKey}%`);
    }

    if (status !== undefined && status !== '') {
      where.status = status;
    }

    // 查询总数
    const total = await this.roleRepository.count({ where });

    // 查询列表
    const list = await this.roleRepository.find({
      where,
      order: {
        roleSort: 'ASC', // 按照显示顺序排序
      },
      skip: (parseInt(pageNum as string) - 1) * parseInt(pageSize as string),
      take: parseInt(pageSize as string),
    });

    return { list, total };
  }

  // 根据角色ID查询角色
  async findRoleById(roleId: string): Promise<SysRole> {
    const role = await this.roleRepository.findOne({
      where: { roleId, delFlag: '0' },
      relations: {
        menus: true,
      },
    });
    if (!role) {
      throw new NotFoundException('角色不存在');
    }
    return role;
  }

  // 创建角色
  async createRole(roleData: Partial<SysRole>): Promise<SysRole> {
    const role = this.roleRepository.create({
      ...roleData,
      createTime: new Date(),
      delFlag: '0',
    });

    return this.roleRepository.save(role);
  }

  // 更新角色
  async updateRole(roleData: Partial<SysRole>): Promise<SysRole> {
    const { roleId } = roleData;
    if (!roleId) {
      throw new Error('角色ID不能为空');
    }

    const role = await this.findRoleById(roleId);

    // 更新角色信息
    Object.assign(role, {
      ...roleData,
      updateTime: new Date(),
    });

    return this.roleRepository.save(role);
  }

  // 删除角色（软删除）
  async deleteRole(roleId: string): Promise<void> {
    const role = await this.findRoleById(roleId);

    // 检查是否为admin角色，admin角色不能删除
    if (role.roleKey === 'admin') {
      throw new Error('超级管理员角色不能删除');
    }

    // 软删除
    role.delFlag = '2';
    role.updateTime = new Date();

    await this.roleRepository.save(role);
  }

  // 更新角色状态
  async updateRoleStatus(roleId: string, status: string): Promise<SysRole> {
    const role = await this.findRoleById(roleId);

    // 检查是否为admin角色，admin角色状态不能修改
    if (role.roleKey === 'admin' && status === '1') {
      throw new Error('超级管理员角色不能停用');
    }

    role.status = status;
    role.updateTime = new Date();

    return this.roleRepository.save(role);
  }
}
