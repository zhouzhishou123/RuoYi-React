import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { SysMenu } from '../entities/SysMenu';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(SysMenu)
    private readonly menuRepository: Repository<SysMenu>,
  ) { }
  // 查询所有菜单列表
  async findAllMenus(): Promise<SysMenu[]> {
    return this.menuRepository.find({
      where: {
        menuType: Not('F'),
        status: '0',
        visible: '0',
      },
      relations: {
        roles: true,
      },
    });
  }

  // 根据菜单ID查询菜单
  async findMenuById(menuId: string): Promise<SysMenu> {
    const menu = await this.menuRepository.findOne({
      where: { menuId },
      relations: {
        roles: true,
      },
    });
    if (!menu) {
      throw new NotFoundException('菜单不存在');
    }
    return menu;
  }
}
