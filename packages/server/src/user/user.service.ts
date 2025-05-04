import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysUser } from '../entities/SysUser';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SysUser)
    private userRepository: Repository<SysUser>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
        roles: true,
        dept: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(updateUserDto: UpdateUserDto) {
    return updateUserDto;
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
