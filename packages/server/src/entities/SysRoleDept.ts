import { Column, Entity } from 'typeorm';

@Entity('sys_role_dept', { schema: 'ry-vue' })
export class SysRoleDept {
  @Column('bigint', { primary: true, name: 'role_id', comment: '角色ID' })
  roleId: string;

  @Column('bigint', { primary: true, name: 'dept_id', comment: '部门ID' })
  deptId: string;
}
