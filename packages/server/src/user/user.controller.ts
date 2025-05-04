import { SuccessResponse } from '@/commom/Decorator/success.response.decorator';
import { success } from '@/utils/Res';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@SuccessResponse()
@Controller('system')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 获取用户信息
  @Get('getInfo')
  async getInfo(@Req() req: Request) {
    // 直接断言请求中包含用户信息
    const username = req['user']?.username;
    if (!username) {
      throw new UnauthorizedException('用户未认证, 请重新认证');
    }
    const user = await this.userService.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('用户不存在, 请重新认证');
    }
    const roles = (user.roles || []).map((role) => role.roleKey) || [];

    return success({
      user,
      roles: roles,
    });
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('user')
  getUserList() {
    return this.userService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
