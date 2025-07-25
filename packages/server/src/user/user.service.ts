import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysUser } from '../entities/SysUser';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SysRole } from '../entities/SysRole';
import { SysDept } from '../entities/SysDept';
import { PasswordUtil } from '../utils/security';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SysUser)
    private userRepository: Repository<SysUser>,
    @InjectRepository(SysRole)
    private roleRepository: Repository<SysRole>,
    @InjectRepository(SysDept)
    private deptRepository: Repository<SysDept>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 创建用户实体
    const user = new SysUser();
    user.userName = createUserDto.userName;
    user.nickName = createUserDto.nickName;
    user.deptId = createUserDto.deptId;
    user.phonenumber = createUserDto.phonenumber || null;
    user.email = createUserDto.email || null;
    user.sex = createUserDto.sex || '0';
    user.status = createUserDto.status || '0';
    user.remark = createUserDto.remark || null;
    user.createTime = new Date();

    // 加密密码
    user.password = await PasswordUtil.encrypt(createUserDto.password);

    // 保存用户
    const savedUser = await this.userRepository.save(user);

    // 如果有角色ID，则关联角色
    if (createUserDto.roleIds && createUserDto.roleIds.length > 0) {
      const roles = await this.roleRepository.findByIds(createUserDto.roleIds);
      savedUser.roles = roles;
      await this.userRepository.save(savedUser);
    }

    return savedUser;
  }

  async findAll() {
    return await this.userRepository.find({
      where: { delFlag: '0' }, // 只查询未删除的用户
      relations: {
        roles: true,
        dept: true,
      },
      order: {
        createTime: 'DESC', // 按创建时间倒序排序
      },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { userId: id.toString(), delFlag: '0' },
      relations: {
        roles: true,
        dept: true,
      },
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    // 查找用户
    const user = await this.userRepository.findOne({
      where: { userId: updateUserDto.userId, delFlag: '0' },
      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    // 更新用户信息
    if (updateUserDto.userName) user.userName = updateUserDto.userName;
    if (updateUserDto.nickName) user.nickName = updateUserDto.nickName;
    if (updateUserDto.deptId) user.deptId = updateUserDto.deptId;
    if (updateUserDto.phonenumber) user.phonenumber = updateUserDto.phonenumber;
    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.sex) user.sex = updateUserDto.sex;
    if (updateUserDto.status) user.status = updateUserDto.status;
    if (updateUserDto.remark) user.remark = updateUserDto.remark;

    // 如果提供了密码，则更新密码
    if (updateUserDto.password) {
      user.password = await PasswordUtil.encrypt(updateUserDto.password);
    }

    user.updateTime = new Date();

    // 保存用户信息
    const savedUser = await this.userRepository.save(user);

    // 如果有角色ID，则更新角色关联
    if (updateUserDto.roleIds && updateUserDto.roleIds.length > 0) {
      const roles = await this.roleRepository.findByIds(updateUserDto.roleIds);
      savedUser.roles = roles;
      await this.userRepository.save(savedUser);
    }

    return savedUser;
  }

  async findUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: { userName: username, delFlag: '0' },
      relations: {
        roles: true,
        dept: true,
      },
    });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { userId: id.toString() },
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    // 软删除（将删除标志设置为2）
    user.delFlag = '2';
    user.updateTime = new Date();

    return await this.userRepository.save(user);
  }
}
