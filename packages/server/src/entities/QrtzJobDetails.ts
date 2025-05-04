import { Column, Entity, OneToMany } from "typeorm";
import { QrtzTriggers } from "./QrtzTriggers";

@Entity("QRTZ_JOB_DETAILS", { schema: "ry-vue" })
export class QrtzJobDetails {
  @Column("varchar", {
    primary: true,
    name: "sched_name",
    comment: "调度名称",
    length: 120,
  })
  schedName: string;

  @Column("varchar", {
    primary: true,
    name: "job_name",
    comment: "任务名称",
    length: 200,
  })
  jobName: string;

  @Column("varchar", {
    primary: true,
    name: "job_group",
    comment: "任务组名",
    length: 200,
  })
  jobGroup: string;

  @Column("varchar", {
    name: "description",
    nullable: true,
    comment: "相关介绍",
    length: 250,
  })
  description: string | null;

  @Column("varchar", {
    name: "job_class_name",
    comment: "执行任务类名称",
    length: 250,
  })
  jobClassName: string;

  @Column("varchar", { name: "is_durable", comment: "是否持久化", length: 1 })
  isDurable: string;

  @Column("varchar", {
    name: "is_nonconcurrent",
    comment: "是否并发",
    length: 1,
  })
  isNonconcurrent: string;

  @Column("varchar", {
    name: "is_update_data",
    comment: "是否更新数据",
    length: 1,
  })
  isUpdateData: string;

  @Column("varchar", {
    name: "requests_recovery",
    comment: "是否接受恢复执行",
    length: 1,
  })
  requestsRecovery: string;

  @Column("blob", {
    name: "job_data",
    nullable: true,
    comment: "存放持久化job对象",
  })
  jobData: Buffer | null;

  @OneToMany(() => QrtzTriggers, (qrtzTriggers) => qrtzTriggers.qrtzJobDetails)
  qrtzTriggers: QrtzTriggers[];
}
