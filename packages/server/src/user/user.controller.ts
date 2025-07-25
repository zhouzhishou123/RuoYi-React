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
  Query,
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
  private readonly pageNum = 1;
  private readonly pageSize = 10;
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

  // 创建用户
  @Post('user')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return success(user);
  }

  // 获取用户列表
  @Get('user/list')
  async getUserList(@Query() params: any) {
    params.pageNum = params.pageNum || this.pageNum;
    params.pageSize = params.pageSize || this.pageSize;
    params.sortBy = params.sortBy || 'createTime';
    params.sortOrder = params.sortOrder || 'DESC';
    try {
      const data = await this.userService.findUserListByParams(params);
      return success(data);
    } catch (error) {
      console.error('Error fetching user list:', error);
      throw error;
    }
  }

  // 获取单个用户
  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    return success(user);
  }

  // 更新用户
  @Patch('user')
  async update(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(updateUserDto);
    return success({
      message: '更新用户成功',
    });
  }

  // 删除用户
  @Delete('user/:id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(+id);
    return success({
      message: '删除用户成功',
    });
  }
}
