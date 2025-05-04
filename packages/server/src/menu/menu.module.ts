import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysMenu } from '../entities/SysMenu';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([SysMenu])],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
