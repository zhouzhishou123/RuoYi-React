import { Column, Entity } from "typeorm";

@Entity("sys_user_post", { schema: "ry-vue" })
export class SysUserPost {
  @Column("bigint", { primary: true, name: "user_id", comment: "用户ID" })
  userId: string;

  @Column("bigint", { primary: true, name: "post_id", comment: "岗位ID" })
  postId: string;
}
