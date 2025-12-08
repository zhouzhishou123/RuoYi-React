import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SysRole } from '../entities/SysRole';
import { SysMenu } from '../entities/SysMenu';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { success } from '../utils/Res';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(SysRole)
    private readonly roleRepository: Repository<SysRole>,
    @InjectRepository(SysMenu)
    private readonly menuRepository: Repository<SysMenu>,
  ) {}

  // 查询所有角色
  async findAllRoles(): Promise<SysRole[]> {
    return this.roleRepository.find({
      where: {
        delFlag: '0', // 只查询未删除的角色
      },
      relations: {
        menus: true,
      },
    });
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
  async create(createRoleDto: CreateRoleDto) {
    // 检查角色权限字符串是否已存在
    const existingRole = await this.roleRepository.findOne({
      where: { roleKey: createRoleDto.roleKey, delFlag: '0' },
    });
    if (existingRole) {
      throw new BadRequestException('角色权限字符串已存在');
    }

    // 创建角色实体
    const role = this.roleRepository.create({
      roleName: createRoleDto.roleName,
      roleKey: createRoleDto.roleKey,
      roleSort: createRoleDto.roleSort,
      status: createRoleDto.status || '0',
      remark: createRoleDto.remark || null,
      delFlag: '0',
      createTime: new Date(),
    });

    // 保存角色
    const savedRole = await this.roleRepository.save(role);

    // 如果有菜单ID，关联菜单
    if (createRoleDto.menuIds && createRoleDto.menuIds.length > 0) {
      const menus = await this.menuRepository.find({
        where: { menuId: In(createRoleDto.menuIds) },
      });
      savedRole.menus = menus;
      await this.roleRepository.save(savedRole);
    }

    return success(savedRole);
  }

  // 更新角色
  async update(updateRoleDto: UpdateRoleDto) {
    // 查找角色
    const role = await this.roleRepository.findOne({
      where: { roleId: updateRoleDto.roleId, delFlag: '0' },
      relations: {
        menus: true,
      },
    });

    if (!role) {
      throw new NotFoundException('角色不存在');
    }

    // 如果更新了角色权限字符串，检查是否已被其他角色使用
    if (updateRoleDto.roleKey && updateRoleDto.roleKey !== role.roleKey) {
      const existingRole = await this.roleRepository.findOne({
        where: { roleKey: updateRoleDto.roleKey, delFlag: '0' },
      });
      if (existingRole) {
        throw new BadRequestException('角色权限字符串已存在');
      }
    }

    // 更新字段
    if (updateRoleDto.roleName !== undefined) {
      role.roleName = updateRoleDto.roleName;
    }
    if (updateRoleDto.roleKey !== undefined) {
      role.roleKey = updateRoleDto.roleKey;
    }
    if (updateRoleDto.roleSort !== undefined) {
      role.roleSort = updateRoleDto.roleSort;
    }
    if (updateRoleDto.status !== undefined) {
      role.status = updateRoleDto.status;
    }
    if (updateRoleDto.remark !== undefined) {
      role.remark = updateRoleDto.remark || null;
    }

    // 更新菜单关联
    if (updateRoleDto.menuIds !== undefined) {
      if (updateRoleDto.menuIds.length > 0) {
        const menus = await this.menuRepository.find({
          where: { menuId: In(updateRoleDto.menuIds) },
        });
        role.menus = menus;
      } else {
        role.menus = [];
      }
    }

    // 更新更新时间
    role.updateTime = new Date();

    // 保存更新
    const updatedRole = await this.roleRepository.save(role);

    return success(updatedRole);
  }

  // 删除角色（软删除）
  async remove(roleId: string) {
    // 查找角色
    const role = await this.roleRepository.findOne({
      where: { roleId },
    });

    if (!role) {
      throw new NotFoundException('角色不存在');
    }

    // 检查是否已经删除
    if (role.delFlag === '2') {
      throw new BadRequestException('角色已被删除');
    }

    // 软删除：设置删除标志为 '2'
    role.delFlag = '2';
    role.updateTime = new Date();

    // 保存更新
    await this.roleRepository.save(role);

    return success({ message: '角色删除成功' });
  }
}
