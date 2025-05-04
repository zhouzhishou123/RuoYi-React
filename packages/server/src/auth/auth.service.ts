import { SysUser } from '@/entities/SysUser';
import { Injectable, Session } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  // 生成验证码
  generateCode(@Session() session: { code: string }) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      ignoreChars: '0oO1ilI',
      width: 100,
      height: 50,
    });
    session.code = captcha.text;
    return captcha;
  }
  // 验证验证码合法性
  verifyCode(@Session() session: { code: string }, code: string) {
    return (session.code || '').toUpperCase() === code.toUpperCase();
  }
  // 登录成功后生成token
  async generateToken(user: SysUser) {
    // 完全断言user为非错误类型
    const userName = user as unknown as { userName: string };
    const userId = user as unknown as { userId: string };

    const payload = {
      username: userName.userName,
      id: userId.userId,
      roles: user.roles,
    };
    return await this.jwtService.signAsync(payload);
  }
}
