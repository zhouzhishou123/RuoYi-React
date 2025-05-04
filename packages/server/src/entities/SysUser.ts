import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SysDept } from './SysDept';
import { SysRole } from './SysRole';
@Entity('sys_user', { schema: 'ry-vue' })
export class SysUser {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
    comment: '用户ID',
  })
  userId: string;

  @Column('bigint', { name: 'dept_id', nullable: true, comment: '部门ID' })
  deptId: string | null;

  @ManyToOne(() => SysDept, (dept) => dept.users)
  @JoinColumn({ name: 'dept_id', referencedColumnName: 'deptId' })
  dept: SysDept;

  @Column('varchar', { name: 'user_name', comment: '用户账号', length: 30 })
  userName: string;

  @Column('varchar', { name: 'nick_name', comment: '用户昵称', length: 30 })
  nickName: string;

  @Column('varchar', {
    name: 'user_type',
    nullable: true,
    comment: '用户类型（00系统用户）',
    length: 2,
    default: () => "'00'",
  })
  userType: string | null;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '用户邮箱',
    length: 50,
  })
  email: string | null;

  @Column('varchar', {
    name: 'phonenumber',
    nullable: true,
    comment: '手机号码',
    length: 11,
  })
  phonenumber: string | null;

  @Column('char', {
    name: 'sex',
    nullable: true,
    comment: '用户性别（0男 1女 2未知）',
    length: 1,
    default: () => "'0'",
  })
  sex: string | null;

  @Column('varchar', {
    name: 'avatar',
    nullable: true,
    comment: '头像地址',
    length: 100,
  })
  avatar: string | null;

  @Column('varchar', {
    name: 'password',
    nullable: true,
    comment: '密码',
    length: 100,
  })
  password: string | null;

  @Column('char', {
    name: 'status',
    nullable: true,
    comment: '账号状态（0正常 1停用）',
    length: 1,
    default: () => "'0'",
  })
  status: string | null;

  @Column('char', {
    name: 'del_flag',
    nullable: true,
    comment: '删除标志（0代表存在 2代表删除）',
    length: 1,
    default: () => "'0'",
  })
  delFlag: string | null;

  @Column('varchar', {
    name: 'login_ip',
    nullable: true,
    comment: '最后登录IP',
    length: 128,
  })
  loginIp: string | null;

  @Column('datetime', {
    name: 'login_date',
    nullable: true,
    comment: '最后登录时间',
  })
  loginDate: Date | null;

  @Column('varchar', {
    name: 'create_by',
    nullable: true,
    comment: '创建者',
    length: 64,
  })
  createBy: string | null;

  @Column('datetime', {
    name: 'create_time',
    nullable: true,
    comment: '创建时间',
  })
  createTime: Date | null;

  @Column('varchar', {
    name: 'update_by',
    nullable: true,
    comment: '更新者',
    length: 64,
  })
  updateBy: string | null;

  @Column('datetime', {
    name: 'update_time',
    nullable: true,
    comment: '更新时间',
  })
  updateTime: Date | null;

  @Column('varchar', {
    name: 'remark',
    nullable: true,
    comment: '备注',
    length: 500,
  })
  remark: string | null;

  @ManyToMany(() => SysRole, (role) => role.users)
  @JoinTable({
    name: 'sys_user_role', // 关联的中间表
    joinColumn: { name: 'user_id', referencedColumnName: 'userId' }, // 当前表在中间表中的字段user_id对应的SysUser实体类中的userId
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'roleId' }, // 关联表在中间表中的字段role_id对应的SysRole实体类中的roleId
  })
  roles: SysRole[];
}
