export class CreateUserDto {
  // 用户账号
  userName: string;

  // 用户昵称
  nickName: string;

  // 部门ID
  deptId: string;

  // 手机号码
  phonenumber?: string;

  // 用户邮箱
  email?: string;

  // 用户性别（0男 1女 2未知）
  sex?: string;

  // 密码
  password: string;

  // 账号状态（0正常 1停用）
  status?: string;

  // 备注
  remark?: string;

  // 角色ID数组
  roleIds?: string[];
}
