import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_sys_oper_log_bt", ["businessType"], {})
@Index("idx_sys_oper_log_s", ["status"], {})
@Index("idx_sys_oper_log_ot", ["operTime"], {})
@Entity("sys_oper_log", { schema: "ry-vue" })
export class SysOperLog {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "oper_id",
    comment: "日志主键",
  })
  operId: string;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "模块标题",
    length: 50,
  })
  title: string | null;

  @Column("int", {
    name: "business_type",
    nullable: true,
    comment: "业务类型（0其它 1新增 2修改 3删除）",
    default: () => "'0'",
  })
  businessType: number | null;

  @Column("varchar", {
    name: "method",
    nullable: true,
    comment: "方法名称",
    length: 200,
  })
  method: string | null;

  @Column("varchar", {
    name: "request_method",
    nullable: true,
    comment: "请求方式",
    length: 10,
  })
  requestMethod: string | null;

  @Column("int", {
    name: "operator_type",
    nullable: true,
    comment: "操作类别（0其它 1后台用户 2手机端用户）",
    default: () => "'0'",
  })
  operatorType: number | null;

  @Column("varchar", {
    name: "oper_name",
    nullable: true,
    comment: "操作人员",
    length: 50,
  })
  operName: string | null;

  @Column("varchar", {
    name: "dept_name",
    nullable: true,
    comment: "部门名称",
    length: 50,
  })
  deptName: string | null;

  @Column("varchar", {
    name: "oper_url",
    nullable: true,
    comment: "请求URL",
    length: 255,
  })
  operUrl: string | null;

  @Column("varchar", {
    name: "oper_ip",
    nullable: true,
    comment: "主机地址",
    length: 128,
  })
  operIp: string | null;

  @Column("varchar", {
    name: "oper_location",
    nullable: true,
    comment: "操作地点",
    length: 255,
  })
  operLocation: string | null;

  @Column("varchar", {
    name: "oper_param",
    nullable: true,
    comment: "请求参数",
    length: 2000,
  })
  operParam: string | null;

  @Column("varchar", {
    name: "json_result",
    nullable: true,
    comment: "返回参数",
    length: 2000,
  })
  jsonResult: string | null;

  @Column("int", {
    name: "status",
    nullable: true,
    comment: "操作状态（0正常 1异常）",
    default: () => "'0'",
  })
  status: number | null;

  @Column("varchar", {
    name: "error_msg",
    nullable: true,
    comment: "错误消息",
    length: 2000,
  })
  errorMsg: string | null;

  @Column("datetime", {
    name: "oper_time",
    nullable: true,
    comment: "操作时间",
  })
  operTime: Date | null;

  @Column("bigint", {
    name: "cost_time",
    nullable: true,
    comment: "消耗时间",
    default: () => "'0'",
  })
  costTime: string | null;
}
