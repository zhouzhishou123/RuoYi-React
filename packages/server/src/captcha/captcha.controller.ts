import { Controller, Get, Res, Session } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { success } from '../utils/Res';
@Controller('captchaImage')
export class CaptchaController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: '/captchaImage', description: '获取验证码' })
  @Get()
  getCaptcha(@Session() session: { code: string }) {
    const captcha = this.authService.generateCode(session);
    return success({ url: captcha.data });
  }
  @ApiOperation({ summary: '/captchaImage/svg', description: '获取验证码svg' })
  @Get('/svg')
  getCaptchaSvg(@Session() session: { code: string }, @Res() res: Response) {
    const captcha = this.authService.generateCode(session);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(captcha.data);
  }
}
