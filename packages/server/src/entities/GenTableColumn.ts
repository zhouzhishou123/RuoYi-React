import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gen_table_column', { schema: 'ry-vue' })
export class GenTableColumn {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'column_id',
    comment: '编号',
  })
  columnId: string;

  @Column('bigint', { name: 'table_id', nullable: true, comment: '归属表编号' })
  tableId: string | null;

  @Column('varchar', {
    name: 'column_name',
    nullable: true,
    comment: '列名称',
    length: 200,
  })
  columnName: string | null;

  @Column('varchar', {
    name: 'column_comment',
    nullable: true,
    comment: '列描述',
    length: 500,
  })
  columnComment: string | null;

  @Column('varchar', {
    name: 'column_type',
    nullable: true,
    comment: '列类型',
    length: 100,
  })
  columnType: string | null;

  @Column('varchar', {
    name: 'java_type',
    nullable: true,
    comment: 'JAVA类型',
    length: 500,
  })
  javaType: string | null;

  @Column('varchar', {
    name: 'java_field',
    nullable: true,
    comment: 'JAVA字段名',
    length: 200,
  })
  javaField: string | null;

  @Column('char', {
    name: 'is_pk',
    nullable: true,
    comment: '是否主键（1是）',
    length: 1,
  })
  isPk: string | null;

  @Column('char', {
    name: 'is_increment',
    nullable: true,
    comment: '是否自增（1是）',
    length: 1,
  })
  isIncrement: string | null;

  @Column('char', {
    name: 'is_required',
    nullable: true,
    comment: '是否必填（1是）',
    length: 1,
  })
  isRequired: string | null;

  @Column('char', {
    name: 'is_insert',
    nullable: true,
    comment: '是否为插入字段（1是）',
    length: 1,
  })
  isInsert: string | null;

  @Column('char', {
    name: 'is_edit',
    nullable: true,
    comment: '是否编辑字段（1是）',
    length: 1,
  })
  isEdit: string | null;

  @Column('char', {
    name: 'is_list',
    nullable: true,
    comment: '是否列表字段（1是）',
    length: 1,
  })
  isList: string | null;

  @Column('char', {
    name: 'is_query',
    nullable: true,
    comment: '是否查询字段（1是）',
    length: 1,
  })
  isQuery: string | null;

  @Column('varchar', {
    name: 'query_type',
    nullable: true,
    comment: '查询方式（等于、不等于、大于、小于、范围）',
    length: 200,
    default: () => "'EQ'",
  })
  queryType: string | null;

  @Column('varchar', {
    name: 'html_type',
    nullable: true,
    comment: '显示类型（文本框、文本域、下拉框、复选框、单选框、日期控件）',
    length: 200,
  })
  htmlType: string | null;

  @Column('varchar', {
    name: 'dict_type',
    nullable: true,
    comment: '字典类型',
    length: 200,
  })
  dictType: string | null;

  @Column('int', { name: 'sort', nullable: true, comment: '排序' })
  sort: number | null;

  @Column('varchar', {
    name: 'create_by',
    nullable: true,
    comment: '创建者',
    length: 64,
  })
  createBy: string | null;

  @Column('datetime', {
    name: 'create_time',
    nullable: true,
    comment: '创建时间',
  })
  createTime: Date | null;

  @Column('varchar', {
    name: 'update_by',
    nullable: true,
    comment: '更新者',
    length: 64,
  })
  updateBy: string | null;

  @Column('datetime', {
    name: 'update_time',
    nullable: true,
    comment: '更新时间',
  })
  updateTime: Date | null;
}
