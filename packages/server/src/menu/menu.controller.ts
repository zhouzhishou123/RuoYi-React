import { AuthenticatedRequest } from '@/types';
import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UnauthorizedException } from '@nestjs/common';
import { success } from '../utils/Res';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // 查询所有菜单列表
  @Get('list')
  async findAllMenus() {
    const menus = await this.menuService.findAllMenus();
    return success({ list: menus });
  }

  // 根据菜单ID查询菜单
  @Get(':id')
  async findMenuById(@Param('id') id: string) {
    return this.menuService.findMenuById(id);
  }

  // 创建菜单
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.create(createMenuDto);
  }

  // 更新菜单
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    updateMenuDto.menuId = id;
    return await this.menuService.update(updateMenuDto);
  }

  // 删除菜单
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.menuService.remove(id);
  }

  @Get()
  async getMenuList(@Req() req: AuthenticatedRequest) {
    const menus = await this.menuService.findAllMenus();
    const user = req.user;
    if (user === null) {
      throw new UnauthorizedException('用户未授权，请先登录');
    }
    const roleIds: string[] = user.roles.map((role) => role.roleId);
    const menuList = menus.filter((menu) => {
      return menu.roles.some((role) => roleIds.includes(role.roleId));
    });
    return success(menuList);
  }
}
