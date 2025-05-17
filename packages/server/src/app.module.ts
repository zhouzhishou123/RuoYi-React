import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [() => dotenv.config({ path: '.env' })],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [SysUser, SysRole, SysDept, SysMenu],
        synchronize: process.env.NODE_ENV === 'development',
      }),
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
