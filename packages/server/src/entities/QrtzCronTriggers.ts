import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { QrtzTriggers } from './QrtzTriggers';

@Entity('QRTZ_CRON_TRIGGERS', { schema: 'ry-vue' })
export class QrtzCronTriggers {
  @Column('varchar', {
    primary: true,
    name: 'sched_name',
    comment: '调度名称',
    length: 120,
  })
  schedName: string;

  @Column('varchar', {
    primary: true,
    name: 'trigger_name',
    comment: 'qrtz_triggers表trigger_name的外键',
    length: 200,
  })
  triggerName: string;

  @Column('varchar', {
    primary: true,
    name: 'trigger_group',
    comment: 'qrtz_triggers表trigger_group的外键',
    length: 200,
  })
  triggerGroup: string;

  @Column('varchar', {
    name: 'cron_expression',
    comment: 'cron表达式',
    length: 200,
  })
  cronExpression: string;

  @Column('varchar', {
    name: 'time_zone_id',
    nullable: true,
    comment: '时区',
    length: 80,
  })
  timeZoneId: string | null;

  @OneToOne(() => QrtzTriggers, (qrtzTriggers) => qrtzTriggers.qrtzCronTriggers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'sched_name', referencedColumnName: 'schedName' },
    { name: 'trigger_name', referencedColumnName: 'triggerName' },
    { name: 'trigger_group', referencedColumnName: 'triggerGroup' },
  ])
  qrtzTriggers: QrtzTriggers;
}
