import { SuccessResponse } from '@/commom/Decorator/success.response.decorator';
import { PasswordUtil } from '@/utils/security';
import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { error, success } from '../utils/Res';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
@SuccessResponse()
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: '/login', description: '登录接口' })
  @ApiBody({
    type: LoginDto,
  })
  @Post('login')
  async login(@Session() session: { code: string }, @Body() body: LoginDto) {
    // 获取验证码
    const { code, password } = body;
    if (code == null) return error('验证码不能为空');
    if (!this.authService.verifyCode(session, code)) {
      return error('验证码错误');
    }
    // 验证用户名密码
    const user = await this.userService.findUserByUsername(body.username);
    if (user == null) return error('该用户不存在');
    let isValidate = false;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      isValidate = await PasswordUtil.decrypt(password, user.password || '');
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      return error(err.message);
    }
    if (!isValidate) return error('密码错误');
    const token = await this.authService.generateToken(user);
    return success({ token });
  }
  @ApiOperation({ summary: '/test', description: '测试接口' })
  @Get('/test')
  test() {
    return success('测试接口');
  }
}
