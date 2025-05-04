import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_config", { schema: "ry-vue" })
export class SysConfig {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "config_id",
    comment: "参数主键",
  })
  configId: number;

  @Column("varchar", {
    name: "config_name",
    nullable: true,
    comment: "参数名称",
    length: 100,
  })
  configName: string | null;

  @Column("varchar", {
    name: "config_key",
    nullable: true,
    comment: "参数键名",
    length: 100,
  })
  configKey: string | null;

  @Column("varchar", {
    name: "config_value",
    nullable: true,
    comment: "参数键值",
    length: 500,
  })
  configValue: string | null;

  @Column("char", {
    name: "config_type",
    nullable: true,
    comment: "系统内置（Y是 N否）",
    length: 1,
    default: () => "'N'",
  })
  configType: string | null;

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
    comment: "备注",
    length: 500,
  })
  remark: string | null;
}
