import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { SysMenu } from '../entities/SysMenu';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { success } from '../utils/Res';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(SysMenu)
    private readonly menuRepository: Repository<SysMenu>,
  ) {}

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

  // 创建菜单
  async create(createMenuDto: CreateMenuDto) {
    // 创建菜单实体
    const menu = this.menuRepository.create({
      menuName: createMenuDto.menuName,
      parentId: createMenuDto.parentId || '0',
      orderNum: createMenuDto.orderNum || 0,
      path: createMenuDto.path || null,
      component: createMenuDto.component || null,
      isFrame: createMenuDto.isFrame ? parseInt(createMenuDto.isFrame) : 1,
      menuType: createMenuDto.menuType,
      visible: createMenuDto.visible || '0',
      status: createMenuDto.status || '0',
      perms: createMenuDto.perms || null,
      icon: createMenuDto.icon || '#',
      remark: createMenuDto.remark || null,
      createTime: new Date(),
    });

    // 保存菜单
    const savedMenu = await this.menuRepository.save(menu);

    return success(savedMenu);
  }

  // 更新菜单
  async update(updateMenuDto: UpdateMenuDto) {
    // 查找菜单
    const menu = await this.menuRepository.findOne({
      where: { menuId: updateMenuDto.menuId },
    });

    if (!menu) {
      throw new NotFoundException('菜单不存在');
    }

    // 检查父菜单不能是自己
    if (updateMenuDto.parentId && updateMenuDto.parentId === updateMenuDto.menuId) {
      throw new BadRequestException('父菜单不能是自己');
    }

    // 更新字段
    if (updateMenuDto.menuName !== undefined) {
      menu.menuName = updateMenuDto.menuName;
    }
    if (updateMenuDto.parentId !== undefined) {
      menu.parentId = updateMenuDto.parentId || '0';
    }
    if (updateMenuDto.orderNum !== undefined) {
      menu.orderNum = updateMenuDto.orderNum;
    }
    if (updateMenuDto.path !== undefined) {
      menu.path = updateMenuDto.path || null;
    }
    if (updateMenuDto.component !== undefined) {
      menu.component = updateMenuDto.component || null;
    }
    if (updateMenuDto.isFrame !== undefined) {
      menu.isFrame = parseInt(updateMenuDto.isFrame);
    }
    if (updateMenuDto.menuType !== undefined) {
      menu.menuType = updateMenuDto.menuType;
    }
    if (updateMenuDto.visible !== undefined) {
      menu.visible = updateMenuDto.visible;
    }
    if (updateMenuDto.status !== undefined) {
      menu.status = updateMenuDto.status;
    }
    if (updateMenuDto.perms !== undefined) {
      menu.perms = updateMenuDto.perms || null;
    }
    if (updateMenuDto.icon !== undefined) {
      menu.icon = updateMenuDto.icon || '#';
    }
    if (updateMenuDto.remark !== undefined) {
      menu.remark = updateMenuDto.remark || null;
    }

    // 更新更新时间
    menu.updateTime = new Date();

    // 保存更新
    const updatedMenu = await this.menuRepository.save(menu);

    return success(updatedMenu);
  }

  // 删除菜单
  async remove(menuId: string) {
    // 查找菜单
    const menu = await this.menuRepository.findOne({
      where: { menuId },
      relations: {
        roles: true,
      },
    });

    if (!menu) {
      throw new NotFoundException('菜单不存在');
    }

    // 检查是否有子菜单
    const children = await this.menuRepository.find({
      where: { parentId: menuId },
    });
    if (children.length > 0) {
      throw new BadRequestException('存在子菜单，无法删除');
    }

    // 删除菜单（物理删除）
    await this.menuRepository.remove(menu);

    return success({ message: '菜单删除成功' });
  }
}
