import { Column, Entity } from "typeorm";

@Entity("QRTZ_PAUSED_TRIGGER_GRPS", { schema: "ry-vue" })
export class QrtzPausedTriggerGrps {
  @Column("varchar", {
    primary: true,
    name: "sched_name",
    comment: "调度名称",
    length: 120,
  })
  schedName: string;

  @Column("varchar", {
    primary: true,
    name: "trigger_group",
    comment: "qrtz_triggers表trigger_group的外键",
    length: 200,
  })
  triggerGroup: string;
}
