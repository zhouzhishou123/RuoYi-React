import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { QrtzTriggers } from "./QrtzTriggers";

@Entity("QRTZ_SIMPLE_TRIGGERS", { schema: "ry-vue" })
export class QrtzSimpleTriggers {
  @Column("varchar", {
    primary: true,
    name: "sched_name",
    comment: "调度名称",
    length: 120,
  })
  schedName: string;

  @Column("varchar", {
    primary: true,
    name: "trigger_name",
    comment: "qrtz_triggers表trigger_name的外键",
    length: 200,
  })
  triggerName: string;

  @Column("varchar", {
    primary: true,
    name: "trigger_group",
    comment: "qrtz_triggers表trigger_group的外键",
    length: 200,
  })
  triggerGroup: string;

  @Column("bigint", { name: "repeat_count", comment: "重复的次数统计" })
  repeatCount: string;

  @Column("bigint", { name: "repeat_interval", comment: "重复的间隔时间" })
  repeatInterval: string;

  @Column("bigint", { name: "times_triggered", comment: "已经触发的次数" })
  timesTriggered: string;

  @OneToOne(
    () => QrtzTriggers,
    (qrtzTriggers) => qrtzTriggers.qrtzSimpleTriggers,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "sched_name", referencedColumnName: "schedName" },
    { name: "trigger_name", referencedColumnName: "triggerName" },
    { name: "trigger_group", referencedColumnName: "triggerGroup" },
  ])
  qrtzTriggers: QrtzTriggers;
}
