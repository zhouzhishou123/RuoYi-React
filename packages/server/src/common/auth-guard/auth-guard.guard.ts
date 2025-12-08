import { SECRET_KEY } from '@/auth/constants';
import { UserPayload } from '@/types';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

// 扩展 Express 的 Request 类型
declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}
@Injectable()
export class AuthGuardGuard implements CanActivate {
  private prefix: string;
  private whiteList: Set<string>;

  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {
    this.prefix = this.configService.get('GLOBAL_PREFIX') || 'api';
    this.whiteList = new Set([
      `/${this.prefix}/login`, // 登录接口
      `/${this.prefix}/captchaImage`, // 验证码接口
    ]);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // 检查是否是公共路由
    const path = request.path;
    for (const publicPath of this.whiteList) {
      if (path === publicPath || path.startsWith(publicPath + '/')) {
        return true;
      }
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('token为空， 请重新认证');
    }
    try {
      const payload = await this.jwtService.verifyAsync<UserPayload>(token, {
        secret: SECRET_KEY as string,
      });
      request.user = payload;
      return true;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('非法token，请重新认证');
      }
      throw new UnauthorizedException('token已过期，请重新认证');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
