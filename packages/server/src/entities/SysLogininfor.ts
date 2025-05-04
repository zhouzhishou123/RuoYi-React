import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_sys_logininfor_s", ["status"], {})
@Index("idx_sys_logininfor_lt", ["loginTime"], {})
@Entity("sys_logininfor", { schema: "ry-vue" })
export class SysLogininfor {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "info_id",
    comment: "访问ID",
  })
  infoId: string;

  @Column("varchar", {
    name: "user_name",
    nullable: true,
    comment: "用户账号",
    length: 50,
  })
  userName: string | null;

  @Column("varchar", {
    name: "ipaddr",
    nullable: true,
    comment: "登录IP地址",
    length: 128,
  })
  ipaddr: string | null;

  @Column("varchar", {
    name: "login_location",
    nullable: true,
    comment: "登录地点",
    length: 255,
  })
  loginLocation: string | null;

  @Column("varchar", {
    name: "browser",
    nullable: true,
    comment: "浏览器类型",
    length: 50,
  })
  browser: string | null;

  @Column("varchar", {
    name: "os",
    nullable: true,
    comment: "操作系统",
    length: 50,
  })
  os: string | null;

  @Column("char", {
    name: "status",
    nullable: true,
    comment: "登录状态（0成功 1失败）",
    length: 1,
    default: () => "'0'",
  })
  status: string | null;

  @Column("varchar", {
    name: "msg",
    nullable: true,
    comment: "提示消息",
    length: 255,
  })
  msg: string | null;

  @Column("datetime", {
    name: "login_time",
    nullable: true,
    comment: "访问时间",
  })
  loginTime: Date | null;
}
