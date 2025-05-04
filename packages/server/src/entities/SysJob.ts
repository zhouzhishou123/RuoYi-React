import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_job", { schema: "ry-vue" })
export class SysJob {
  @PrimaryGeneratedColumn({ type: "bigint", name: "job_id", comment: "任务ID" })
  jobId: string;

  @Column("varchar", {
    primary: true,
    name: "job_name",
    comment: "任务名称",
    length: 64,
  })
  jobName: string;

  @Column("varchar", {
    primary: true,
    name: "job_group",
    comment: "任务组名",
    length: 64,
    default: () => "'DEFAULT'",
  })
  jobGroup: string;

  @Column("varchar", {
    name: "invoke_target",
    comment: "调用目标字符串",
    length: 500,
  })
  invokeTarget: string;

  @Column("varchar", {
    name: "cron_expression",
    nullable: true,
    comment: "cron执行表达式",
    length: 255,
  })
  cronExpression: string | null;

  @Column("varchar", {
    name: "misfire_policy",
    nullable: true,
    comment: "计划执行错误策略（1立即执行 2执行一次 3放弃执行）",
    length: 20,
    default: () => "'3'",
  })
  misfirePolicy: string | null;

  @Column("char", {
    name: "concurrent",
    nullable: true,
    comment: "是否并发执行（0允许 1禁止）",
    length: 1,
    default: () => "'1'",
  })
  concurrent: string | null;

  @Column("char", {
    name: "status",
    nullable: true,
    comment: "状态（0正常 1暂停）",
    length: 1,
    default: () => "'0'",
  })
  status: string | null;

  @Column("varchar", {
    name: "create_by",
    nullable: true,
    comment: "创建者",
    length: 64,
  })
  createBy: string | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
  })
  createTime: Date | null;

  @Column("varchar", {
    name: "update_by",
    nullable: true,
    comment: "更新者",
    length: 64,
  })
  updateBy: string | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    comment: "更新时间",
  })
  updateTime: Date | null;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注信息",
    length: 500,
  })
  remark: string | null;
}
