import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SysUser } from './SysUser';
@Entity('sys_dept', { schema: 'ry-vue' })
export class SysDept {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'dept_id',
    comment: '部门id',
  })
  deptId: string;

  @Column('bigint', {
    name: 'parent_id',
    nullable: true,
    comment: '父部门id',
    default: () => "'0'",
  })
  parentId: string | null;

  @Column('varchar', {
    name: 'ancestors',
    nullable: true,
    comment: '祖级列表',
    length: 50,
  })
  ancestors: string | null;

  @Column('varchar', {
    name: 'dept_name',
    nullable: true,
    comment: '部门名称',
    length: 30,
  })
  deptName: string | null;

  @Column('int', {
    name: 'order_num',
    nullable: true,
    comment: '显示顺序',
    default: () => "'0'",
  })
  orderNum: number | null;

  @Column('varchar', {
    name: 'leader',
    nullable: true,
    comment: '负责人',
    length: 20,
  })
  leader: string | null;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    comment: '联系电话',
    length: 11,
  })
  phone: string | null;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱',
    length: 50,
  })
  email: string | null;

  @Column('char', {
    name: 'status',
    nullable: true,
    comment: '部门状态（0正常 1停用）',
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

  @OneToMany(() => SysUser, (user) => user.dept)
  users: SysUser[];
}
