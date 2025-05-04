import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { QrtzTriggers } from "./QrtzTriggers";

@Entity("QRTZ_BLOB_TRIGGERS", { schema: "ry-vue" })
export class QrtzBlobTriggers {
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

  @Column("blob", {
    name: "blob_data",
    nullable: true,
    comment: "存放持久化Trigger对象",
  })
  blobData: Buffer | null;

  @OneToOne(
    () => QrtzTriggers,
    (qrtzTriggers) => qrtzTriggers.qrtzBlobTriggers,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "sched_name", referencedColumnName: "schedName" },
    { name: "trigger_name", referencedColumnName: "triggerName" },
    { name: "trigger_group", referencedColumnName: "triggerGroup" },
  ])
  qrtzTriggers: QrtzTriggers;
}
