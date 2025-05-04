import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { QrtzTriggers } from "./QrtzTriggers";

@Entity("QRTZ_SIMPROP_TRIGGERS", { schema: "ry-vue" })
export class QrtzSimpropTriggers {
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

  @Column("varchar", {
    name: "str_prop_1",
    nullable: true,
    comment: "String类型的trigger的第一个参数",
    length: 512,
  })
  strProp_1: string | null;

  @Column("varchar", {
    name: "str_prop_2",
    nullable: true,
    comment: "String类型的trigger的第二个参数",
    length: 512,
  })
  strProp_2: string | null;

  @Column("varchar", {
    name: "str_prop_3",
    nullable: true,
    comment: "String类型的trigger的第三个参数",
    length: 512,
  })
  strProp_3: string | null;

  @Column("int", {
    name: "int_prop_1",
    nullable: true,
    comment: "int类型的trigger的第一个参数",
  })
  intProp_1: number | null;

  @Column("int", {
    name: "int_prop_2",
    nullable: true,
    comment: "int类型的trigger的第二个参数",
  })
  intProp_2: number | null;

  @Column("bigint", {
    name: "long_prop_1",
    nullable: true,
    comment: "long类型的trigger的第一个参数",
  })
  longProp_1: string | null;

  @Column("bigint", {
    name: "long_prop_2",
    nullable: true,
    comment: "long类型的trigger的第二个参数",
  })
  longProp_2: string | null;

  @Column("decimal", {
    name: "dec_prop_1",
    nullable: true,
    comment: "decimal类型的trigger的第一个参数",
    precision: 13,
    scale: 4,
  })
  decProp_1: string | null;

  @Column("decimal", {
    name: "dec_prop_2",
    nullable: true,
    comment: "decimal类型的trigger的第二个参数",
    precision: 13,
    scale: 4,
  })
  decProp_2: string | null;

  @Column("varchar", {
    name: "bool_prop_1",
    nullable: true,
    comment: "Boolean类型的trigger的第一个参数",
    length: 1,
  })
  boolProp_1: string | null;

  @Column("varchar", {
    name: "bool_prop_2",
    nullable: true,
    comment: "Boolean类型的trigger的第二个参数",
    length: 1,
  })
  boolProp_2: string | null;

  @OneToOne(
    () => QrtzTriggers,
    (qrtzTriggers) => qrtzTriggers.qrtzSimpropTriggers,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "sched_name", referencedColumnName: "schedName" },
    { name: "trigger_name", referencedColumnName: "triggerName" },
    { name: "trigger_group", referencedColumnName: "triggerGroup" },
  ])
  qrtzTriggers: QrtzTriggers;
}
