import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { QrtzBlobTriggers } from './QrtzBlobTriggers';
import { QrtzCronTriggers } from './QrtzCronTriggers';
import { QrtzSimpleTriggers } from './QrtzSimpleTriggers';
import { QrtzSimpropTriggers } from './QrtzSimpropTriggers';
import { QrtzJobDetails } from './QrtzJobDetails';

@Index('sched_name', ['schedName', 'jobName', 'jobGroup'], {})
@Entity('QRTZ_TRIGGERS', { schema: 'ry-vue' })
export class QrtzTriggers {
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
    comment: '触发器的名字',
    length: 200,
  })
  triggerName: string;

  @Column('varchar', {
    primary: true,
    name: 'trigger_group',
    comment: '触发器所属组的名字',
    length: 200,
  })
  triggerGroup: string;

  @Column('varchar', {
    name: 'job_name',
    comment: 'qrtz_job_details表job_name的外键',
    length: 200,
  })
  jobName: string;

  @Column('varchar', {
    name: 'job_group',
    comment: 'qrtz_job_details表job_group的外键',
    length: 200,
  })
  jobGroup: string;

  @Column('varchar', {
    name: 'description',
    nullable: true,
    comment: '相关介绍',
    length: 250,
  })
  description: string | null;

  @Column('bigint', {
    name: 'next_fire_time',
    nullable: true,
    comment: '上一次触发时间（毫秒）',
  })
  nextFireTime: string | null;

  @Column('bigint', {
    name: 'prev_fire_time',
    nullable: true,
    comment: '下一次触发时间（默认为-1表示不触发）',
  })
  prevFireTime: string | null;

  @Column('int', { name: 'priority', nullable: true, comment: '优先级' })
  priority: number | null;

  @Column('varchar', {
    name: 'trigger_state',
    comment: '触发器状态',
    length: 16,
  })
  triggerState: string;

  @Column('varchar', {
    name: 'trigger_type',
    comment: '触发器的类型',
    length: 8,
  })
  triggerType: string;

  @Column('bigint', { name: 'start_time', comment: '开始时间' })
  startTime: string;

  @Column('bigint', { name: 'end_time', nullable: true, comment: '结束时间' })
  endTime: string | null;

  @Column('varchar', {
    name: 'calendar_name',
    nullable: true,
    comment: '日程表名称',
    length: 200,
  })
  calendarName: string | null;

  @Column('smallint', {
    name: 'misfire_instr',
    nullable: true,
    comment: '补偿执行的策略',
  })
  misfireInstr: number | null;

  @Column('blob', {
    name: 'job_data',
    nullable: true,
    comment: '存放持久化job对象',
  })
  jobData: Buffer | null;

  @OneToOne(() => QrtzBlobTriggers, (qrtzBlobTriggers) => qrtzBlobTriggers.qrtzTriggers)
  qrtzBlobTriggers: QrtzBlobTriggers;

  @OneToOne(() => QrtzCronTriggers, (qrtzCronTriggers) => qrtzCronTriggers.qrtzTriggers)
  qrtzCronTriggers: QrtzCronTriggers;

  @OneToOne(() => QrtzSimpleTriggers, (qrtzSimpleTriggers) => qrtzSimpleTriggers.qrtzTriggers)
  qrtzSimpleTriggers: QrtzSimpleTriggers;

  @OneToOne(() => QrtzSimpropTriggers, (qrtzSimpropTriggers) => qrtzSimpropTriggers.qrtzTriggers)
  qrtzSimpropTriggers: QrtzSimpropTriggers;

  @ManyToOne(() => QrtzJobDetails, (qrtzJobDetails) => qrtzJobDetails.qrtzTriggers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'sched_name', referencedColumnName: 'schedName' },
    { name: 'job_name', referencedColumnName: 'jobName' },
    { name: 'job_group', referencedColumnName: 'jobGroup' },
  ])
  qrtzJobDetails: QrtzJobDetails;
}
