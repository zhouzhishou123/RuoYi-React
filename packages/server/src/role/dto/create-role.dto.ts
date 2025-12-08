import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称', example: '管理员' })
  roleName: string;

  @ApiProperty({ description: '角色权限字符串', example: 'admin' })
  roleKey: string;

  @ApiProperty({ description: '显示顺序', example: 1 })
  roleSort: number;

  @ApiProperty({ description: '状态（0正常 1停用）', example: '0', required: false })
  status?: string;

  @ApiProperty({ description: '备注', required: false })
  remark?: string;

  @ApiProperty({ description: '菜单ID数组', type: [String], required: false })
  menuIds?: string[];
}
