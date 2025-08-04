import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { SysRole } from '../entities/SysRole';
import { success } from '../utils/Res';
import { SuccessResponse } from '../commom/Decorator/success.response.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@SuccessResponse()
@ApiBearerAuth()
@Controller('system')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // 查询角色列表
  @Get('role/list')
  async findRoleList(@Query() query: any) {
    const result = await this.roleService.findRoleList(query);
    return success(result);
  }

  // 查询所有角色
  @Get('role/all')
  async findAllRoles() {
    const roles = await this.roleService.findAllRoles();
    return success(roles);
  }

  // 根据角色ID查询角色
  @Get('role/:id')
  async findRoleById(@Param('id') id: string) {
    const role = await this.roleService.findRoleById(id);
    return success(role);
  }

  // 新增角色
  @Post('role')
  async createRole(@Body() roleData: Partial<SysRole>) {
    const role = await this.roleService.createRole(roleData);
    return success(role);
  }

  // 更新角色
  @Patch('role')
  async updateRole(@Body() roleData: Partial<SysRole>) {
    const role = await this.roleService.updateRole(roleData);
    return success(role);
  }

  // 删除角色
  @Delete('role/:id')
  async deleteRole(@Param('id') id: string) {
    await this.roleService.deleteRole(id);
    return success(null);
  }

  // 更新角色状态
  @Patch('role/:id/status/:status')
  async updateRoleStatus(@Param('id') id: string, @Param('status') status: string) {
    const role = await this.roleService.updateRoleStatus(id, status);
    return success(role);
  }
}
