import { Column, Entity } from "typeorm";

@Entity("sys_user_role", { schema: "ry-vue" })
export class SysUserRole {
  @Column("bigint", { primary: true, name: "user_id", comment: "用户ID" })
  userId: string;

  @Column("bigint", { primary: true, name: "role_id", comment: "角色ID" })
  roleId: string;
}
