import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  // 查询所有角色列表
  @Get('list')
  async findAllRoles() {
    return this.roleService.findAllRoles();
  }
  // 根据角色ID查询角色
  @Get(':id')
  async findRoleById(@Param('id') id: string) {
    return this.roleService.findRoleById(id);
  }
}
