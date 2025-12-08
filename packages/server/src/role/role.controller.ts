import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { success } from '@/utils/Res';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // 查询所有角色列表
  @Get('list')
  async findAllRoles() {
    const roles = await this.roleService.findAllRoles();
    return success({ list: roles });
  }

  // 根据角色ID查询角色
  @Get(':id')
  async findRoleById(@Param('id') id: string) {
    const role = await this.roleService.findRoleById(id);
    return success(role);
  }

  // 创建角色
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  // 更新角色
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    updateRoleDto.roleId = id;
    return await this.roleService.update(updateRoleDto);
  }

  // 删除角色
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.roleService.remove(id);
  }
}
