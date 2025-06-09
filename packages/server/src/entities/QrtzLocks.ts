import { Column, Entity } from 'typeorm';

@Entity('QRTZ_LOCKS', { schema: 'ry-vue' })
export class QrtzLocks {
  @Column('varchar', {
    primary: true,
    name: 'sched_name',
    comment: '调度名称',
    length: 120,
  })
  schedName: string;

  @Column('varchar', {
    primary: true,
    name: 'lock_name',
    comment: '悲观锁名称',
    length: 40,
  })
  lockName: string;
}
