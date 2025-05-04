import { Column, Entity } from "typeorm";

@Entity("QRTZ_SCHEDULER_STATE", { schema: "ry-vue" })
export class QrtzSchedulerState {
  @Column("varchar", {
    primary: true,
    name: "sched_name",
    comment: "调度名称",
    length: 120,
  })
  schedName: string;

  @Column("varchar", {
    primary: true,
    name: "instance_name",
    comment: "实例名称",
    length: 200,
  })
  instanceName: string;

  @Column("bigint", { name: "last_checkin_time", comment: "上次检查时间" })
  lastCheckinTime: string;

  @Column("bigint", { name: "checkin_interval", comment: "检查间隔时间" })
  checkinInterval: string;
}
