import { Column, Entity } from "typeorm";

@Entity("QRTZ_FIRED_TRIGGERS", { schema: "ry-vue" })
export class QrtzFiredTriggers {
  @Column("varchar", {
    primary: true,
    name: "sched_name",
    comment: "调度名称",
    length: 120,
  })
  schedName: string;

  @Column("varchar", {
    primary: true,
    name: "entry_id",
    comment: "调度器实例id",
    length: 95,
  })
  entryId: string;

  @Column("varchar", {
    name: "trigger_name",
    comment: "qrtz_triggers表trigger_name的外键",
    length: 200,
  })
  triggerName: string;

  @Column("varchar", {
    name: "trigger_group",
    comment: "qrtz_triggers表trigger_group的外键",
    length: 200,
  })
  triggerGroup: string;

  @Column("varchar", {
    name: "instance_name",
    comment: "调度器实例名",
    length: 200,
  })
  instanceName: string;

  @Column("bigint", { name: "fired_time", comment: "触发的时间" })
  firedTime: string;

  @Column("bigint", { name: "sched_time", comment: "定时器制定的时间" })
  schedTime: string;

  @Column("int", { name: "priority", comment: "优先级" })
  priority: number;

  @Column("varchar", { name: "state", comment: "状态", length: 16 })
  state: string;

  @Column("varchar", {
    name: "job_name",
    nullable: true,
    comment: "任务名称",
    length: 200,
  })
  jobName: string | null;

  @Column("varchar", {
    name: "job_group",
    nullable: true,
    comment: "任务组名",
    length: 200,
  })
  jobGroup: string | null;

  @Column("varchar", {
    name: "is_nonconcurrent",
    nullable: true,
    comment: "是否并发",
    length: 1,
  })
  isNonconcurrent: string | null;

  @Column("varchar", {
    name: "requests_recovery",
    nullable: true,
    comment: "是否接受恢复执行",
    length: 1,
  })
  requestsRecovery: string | null;
}
