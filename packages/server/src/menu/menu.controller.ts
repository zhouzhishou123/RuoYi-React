import { AuthenticatedRequest } from '@/types';
import { Controller, Get, Param, Req, UnauthorizedException } from '@nestjs/common';
import { success } from '../utils/Res';
import { MenuService } from './menu.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('menu')
@ApiBearerAuth()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  // 查询所有菜单列表
  @Get('list')
  async findAllMenus() {
    return this.menuService.findAllMenus();
  }
  // 根据菜单ID查询菜单
  @Get(':id')
  async findMenuById(@Param('id') id: string) {
    return this.menuService.findMenuById(id);
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
