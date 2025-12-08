import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'testuser' })
  userName: string;

  @ApiProperty({ description: '密码', example: '123456' })
  password: string;

  @ApiProperty({ description: '昵称', example: '测试用户' })
  nickName: string;

  @ApiProperty({ description: '邮箱', example: 'test@example.com', required: false })
  email?: string;

  @ApiProperty({ description: '手机号', example: '13800138000', required: false })
  phonenumber?: string;

  @ApiProperty({ description: '性别（0男 1女 2未知）', example: '0', required: false })
  sex?: string;

  @ApiProperty({ description: '状态（0正常 1停用）', example: '0', required: false })
  status?: string;

  @ApiProperty({ description: '备注', required: false })
  remark?: string;

  @ApiProperty({ description: '角色ID数组', type: [Number], required: false })
  roleIds?: number[];

  @ApiProperty({ description: '部门ID', required: false })
  deptId?: string;
}
