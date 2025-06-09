import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('dict_type', ['dictType'], { unique: true })
@Entity('sys_dict_type', { schema: 'ry-vue' })
export class SysDictType {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'dict_id',
    comment: '字典主键',
  })
  dictId: string;

  @Column('varchar', {
    name: 'dict_name',
    nullable: true,
    comment: '字典名称',
    length: 100,
  })
  dictName: string | null;

  @Column('varchar', {
    name: 'dict_type',
    nullable: true,
    unique: true,
    comment: '字典类型',
    length: 100,
  })
  dictType: string | null;

  @Column('char', {
    name: 'status',
    nullable: true,
    comment: '状态（0正常 1停用）',
    length: 1,
    default: () => "'0'",
  })
  status: string | null;

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
}
