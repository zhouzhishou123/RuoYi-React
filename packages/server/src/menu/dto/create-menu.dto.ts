import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ description: '菜单名称', example: '用户管理' })
  menuName: string;

  @ApiProperty({ description: '父菜单ID', example: '0', required: false })
  parentId?: string;

  @ApiProperty({ description: '显示顺序', example: 1, required: false })
  orderNum?: number;

  @ApiProperty({ description: '路由地址', example: '/system/user', required: false })
  path?: string;

  @ApiProperty({ description: '组件路径', example: 'system/user/index', required: false })
  component?: string;

  @ApiProperty({ description: '是否为外链（0是 1否）', example: '1', required: false })
  isFrame?: string;

  @ApiProperty({ description: '菜单类型（M目录 C菜单 F按钮）', example: 'C' })
  menuType: string;

  @ApiProperty({ description: '菜单状态（0显示 1隐藏）', example: '0', required: false })
  visible?: string;

  @ApiProperty({ description: '菜单状态（0正常 1停用）', example: '0', required: false })
  status?: string;

  @ApiProperty({ description: '权限标识', example: 'system:user:list', required: false })
  perms?: string;

  @ApiProperty({ description: '菜单图标', example: 'user-outlined', required: false })
  icon?: string;

  @ApiProperty({ description: '备注', required: false })
  remark?: string;
}
