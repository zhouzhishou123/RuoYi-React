import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SysUser } from '../entities/SysUser';
import { SysRole } from '../entities/SysRole';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordUtil } from '../utils/security';
import { success } from '../utils/Res';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SysUser)
    private userRepository: Repository<SysUser>,
    @InjectRepository(SysRole)
    private roleRepository: Repository<SysRole>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOne({
      where: { userName: createUserDto.userName },
    });
    if (existingUser) {
      throw new BadRequestException('用户名已存在');
    }

    // 加密密码
    const hashedPassword = await PasswordUtil.encrypt(createUserDto.password);

    // 创建用户实体
    const user = this.userRepository.create({
      userName: createUserDto.userName,
      password: hashedPassword,
      nickName: createUserDto.nickName,
      email: createUserDto.email || null,
      phonenumber: createUserDto.phonenumber || null,
      sex: createUserDto.sex || '0',
      status: createUserDto.status || '0',
      remark: createUserDto.remark || null,
      deptId: createUserDto.deptId || null,
      userType: '00',
      delFlag: '0',
      createTime: new Date(),
    });

    // 保存用户
    const savedUser = await this.userRepository.save(user);

    // 如果有角色ID，关联角色
    if (createUserDto.roleIds && createUserDto.roleIds.length > 0) {
      const roles = await this.roleRepository.find({
        where: { roleId: In(createUserDto.roleIds.map((id) => id.toString())) },
      });
      savedUser.roles = roles;
      await this.userRepository.save(savedUser);
    }

    return success(savedUser);
  }

  async findAll() {
    // 只查询未删除的用户（delFlag !== '2'）
    return await this.userRepository.find({
      where: {
        delFlag: '0', // 只查询未删除的用户
      },
      relations: {
        roles: true,
        dept: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserDto: UpdateUserDto) {
    // 查找用户
    const user = await this.userRepository.findOne({
      where: { userId: updateUserDto.userId },
    });

    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    // 如果更新了用户名，检查新用户名是否已被其他用户使用
    if (updateUserDto.userName && updateUserDto.userName !== user.userName) {
      const existingUser = await this.userRepository.findOne({
        where: { userName: updateUserDto.userName },
      });
      if (existingUser) {
        throw new BadRequestException('用户名已存在');
      }
    }

    // 更新字段
    if (updateUserDto.userName) {
      user.userName = updateUserDto.userName;
    }
    if (updateUserDto.password) {
      // 如果提供了新密码，需要加密
      user.password = await PasswordUtil.encrypt(updateUserDto.password);
    }
    if (updateUserDto.nickName !== undefined) {
      user.nickName = updateUserDto.nickName;
    }
    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email || null;
    }
    if (updateUserDto.phonenumber !== undefined) {
      user.phonenumber = updateUserDto.phonenumber || null;
    }
    if (updateUserDto.sex !== undefined) {
      user.sex = updateUserDto.sex;
    }
    if (updateUserDto.status !== undefined) {
      user.status = updateUserDto.status;
    }
    if (updateUserDto.remark !== undefined) {
      user.remark = updateUserDto.remark || null;
    }
    if (updateUserDto.deptId !== undefined) {
      user.deptId = updateUserDto.deptId || null;
    }

    // 更新更新时间
    user.updateTime = new Date();

    // 更新角色关联
    if (updateUserDto.roleIds !== undefined) {
      if (updateUserDto.roleIds.length > 0) {
        const roles = await this.roleRepository.find({
          where: { roleId: In(updateUserDto.roleIds.map((id) => id.toString())) },
        });
        user.roles = roles;
      } else {
        user.roles = [];
      }
    }

    // 保存更新（包含角色关联）
    const savedUser = await this.userRepository.save(user);

    return success(savedUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: { userName: username },
      relations: {
        roles: true,
        dept: true,
      },
    });
  }

  async remove(id: string) {
    // 查找用户
    const user = await this.userRepository.findOne({
      where: { userId: id },
    });

    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    // 检查是否已经删除
    if (user.delFlag === '2') {
      throw new BadRequestException('用户已被删除');
    }

    // 软删除：设置删除标志为 '2'
    user.delFlag = '2';
    user.updateTime = new Date();

    // 保存更新
    await this.userRepository.save(user);

    return success({ message: '用户删除成功' });
  }
}
