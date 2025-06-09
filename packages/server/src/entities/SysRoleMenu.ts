import { Column, Entity } from 'typeorm';

@Entity('sys_role_menu', { schema: 'ry-vue' })
export class SysRoleMenu {
  @Column('bigint', { primary: true, name: 'role_id', comment: '角色ID' })
  roleId: string;

  @Column('bigint', { primary: true, name: 'menu_id', comment: '菜单ID' })
  menuId: string;
}
