import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CaptchaModule } from './captcha/captcha.module';
import { AuthGuardGuard } from './commom/auth-guard/auth-guard.guard';
import { DeptModule } from './dept/dept.module';
import { SysDept } from './entities/SysDept';
import { SysMenu } from './entities/SysMenu';
import { SysRole } from './entities/SysRole';
import { SysUser } from './entities/SysUser';
import { MenuController } from './menu/menu.controller';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 6666,
      logging: true,
      username: 'root',
      password: 'root',
      database: 'ry-vue',
      entities: [SysUser, SysRole, SysDept, SysMenu],
      synchronize: true,
    }),
    AuthModule,
    CaptchaModule,
    UserModule,
    RoleModule,
    DeptModule,
    MenuModule,
  ],
  controllers: [MenuController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuardGuard }],
})
export class AppModule { }
