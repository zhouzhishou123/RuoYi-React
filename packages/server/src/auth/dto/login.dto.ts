import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ name: 'username', description: '用户名', example: 'admin' })
  username: string;
  @ApiProperty({ name: 'password', description: '密码', example: 'admin' })
  password: string;
  @ApiProperty({ name: 'code', description: '验证码', example: 'sxdv' })
  code: string;
}
