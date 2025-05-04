import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("gen_table", { schema: "ry-vue" })
export class GenTable {
  @PrimaryGeneratedColumn({ type: "bigint", name: "table_id", comment: "编号" })
  tableId: string;

  @Column("varchar", {
    name: "table_name",
    nullable: true,
    comment: "表名称",
    length: 200,
  })
  tableName: string | null;

  @Column("varchar", {
    name: "table_comment",
    nullable: true,
    comment: "表描述",
    length: 500,
  })
  tableComment: string | null;

  @Column("varchar", {
    name: "sub_table_name",
    nullable: true,
    comment: "关联子表的表名",
    length: 64,
  })
  subTableName: string | null;

  @Column("varchar", {
    name: "sub_table_fk_name",
    nullable: true,
    comment: "子表关联的外键名",
    length: 64,
  })
  subTableFkName: string | null;

  @Column("varchar", {
    name: "class_name",
    nullable: true,
    comment: "实体类名称",
    length: 100,
  })
  className: string | null;

  @Column("varchar", {
    name: "tpl_category",
    nullable: true,
    comment: "使用的模板（crud单表操作 tree树表操作）",
    length: 200,
    default: () => "'crud'",
  })
  tplCategory: string | null;

  @Column("varchar", {
    name: "tpl_web_type",
    nullable: true,
    comment: "前端模板类型（element-ui模版 element-plus模版）",
    length: 30,
  })
  tplWebType: string | null;

  @Column("varchar", {
    name: "package_name",
    nullable: true,
    comment: "生成包路径",
    length: 100,
  })
  packageName: string | null;

  @Column("varchar", {
    name: "module_name",
    nullable: true,
    comment: "生成模块名",
    length: 30,
  })
  moduleName: string | null;

  @Column("varchar", {
    name: "business_name",
    nullable: true,
    comment: "生成业务名",
    length: 30,
  })
  businessName: string | null;

  @Column("varchar", {
    name: "function_name",
    nullable: true,
    comment: "生成功能名",
    length: 50,
  })
  functionName: string | null;

  @Column("varchar", {
    name: "function_author",
    nullable: true,
    comment: "生成功能作者",
    length: 50,
  })
  functionAuthor: string | null;

  @Column("char", {
    name: "gen_type",
    nullable: true,
    comment: "生成代码方式（0zip压缩包 1自定义路径）",
    length: 1,
    default: () => "'0'",
  })
  genType: string | null;

  @Column("varchar", {
    name: "gen_path",
    nullable: true,
    comment: "生成路径（不填默认项目路径）",
    length: 200,
    default: () => "'/'",
  })
  genPath: string | null;

  @Column("varchar", {
    name: "options",
    nullable: true,
    comment: "其它生成选项",
    length: 1000,
  })
  options: string | null;

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
