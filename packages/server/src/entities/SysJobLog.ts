import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_job_log", { schema: "ry-vue" })
export class SysJobLog {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "job_log_id",
    comment: "任务日志ID",
  })
  jobLogId: string;

  @Column("varchar", { name: "job_name", comment: "任务名称", length: 64 })
  jobName: string;

  @Column("varchar", { name: "job_group", comment: "任务组名", length: 64 })
  jobGroup: string;

  @Column("varchar", {
    name: "invoke_target",
    comment: "调用目标字符串",
    length: 500,
  })
  invokeTarget: string;

  @Column("varchar", {
    name: "job_message",
    nullable: true,
    comment: "日志信息",
    length: 500,
  })
  jobMessage: string | null;

  @Column("char", {
    name: "status",
    nullable: true,
    comment: "执行状态（0正常 1失败）",
    length: 1,
    default: () => "'0'",
  })
  status: string | null;

  @Column("varchar", {
    name: "exception_info",
    nullable: true,
    comment: "异常信息",
    length: 2000,
  })
  exceptionInfo: string | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
  })
  createTime: Date | null;
}
