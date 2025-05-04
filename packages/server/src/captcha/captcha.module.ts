import { AuthModule } from '@/auth/auth.module';
import { AuthService } from '@/auth/auth.service';
import { Module } from '@nestjs/common';
import { CaptchaController } from './captcha.controller';
@Module({
  providers: [AuthService],
  controllers: [CaptchaController],
  imports: [AuthModule],
  exports: [AuthService],
})
export class CaptchaModule {}
