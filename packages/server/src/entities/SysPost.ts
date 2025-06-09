import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_post', { schema: 'ry-vue' })
export class SysPost {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'post_id',
    comment: '岗位ID',
  })
  postId: string;

  @Column('varchar', { name: 'post_code', comment: '岗位编码', length: 64 })
  postCode: string;

  @Column('varchar', { name: 'post_name', comment: '岗位名称', length: 50 })
  postName: string;

  @Column('int', { name: 'post_sort', comment: '显示顺序' })
  postSort: number;

  @Column('char', { name: 'status', comment: '状态（0正常 1停用）', length: 1 })
  status: string;

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
