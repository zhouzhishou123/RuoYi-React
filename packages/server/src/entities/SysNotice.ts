import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_notice', { schema: 'ry-vue' })
export class SysNotice {
  @PrimaryGeneratedColumn({ type: 'int', name: 'notice_id', comment: '公告ID' })
  noticeId: number;

  @Column('varchar', { name: 'notice_title', comment: '公告标题', length: 50 })
  noticeTitle: string;

  @Column('char', {
    name: 'notice_type',
    comment: '公告类型（1通知 2公告）',
    length: 1,
  })
  noticeType: string;

  @Column('longblob', {
    name: 'notice_content',
    nullable: true,
    comment: '公告内容',
  })
  noticeContent: Buffer | null;

  @Column('char', {
    name: 'status',
    nullable: true,
    comment: '公告状态（0正常 1关闭）',
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
    length: 255,
  })
  remark: string | null;
}
