import http from '@/utils/http';

// 用户相关接口
export interface User {
  userId: number;
  userName: string; // 后端使用userName
  nickName: string;
  email: string;
  phonenumber: string; // 后端使用phonenumber
  sex: '0' | '1' | '2'; // 0:男 1:女 2:未知
  status: '0' | '1'; // 0:正常 1:停用
  remark?: string;
  createTime: string;
  updateTime: string;
  roles?: Role[];
}

export interface CreateUserDto {
  userName: string; // 后端使用userName
  password: string;
  nickName: string;
  email?: string;
  phonenumber?: string; // 后端使用phonenumber
  sex?: '0' | '1' | '2';
  status?: '0' | '1';
  remark?: string;
  roleIds?: number[];
  deptId?: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  userId: number;
}

// 角色相关接口
export interface Role {
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: number;
  status: '0' | '1'; // 0:正常 1:停用
  remark?: string;
  createTime: string;
  updateTime: string;
  menus?: Menu[];
}

// 菜单相关接口
export interface Menu {
  menuId: number;
  menuName: string;
  parentId: number;
  orderNum: number;
  path: string;
  component?: string;
  isFrame: '0' | '1'; // 0:是 1:否
  menuType: 'M' | 'C' | 'F'; // M:目录 C:菜单 F:按钮
  visible: '0' | '1'; // 0:显示 1:隐藏
  status: '0' | '1'; // 0:正常 1:停用
  perms?: string;
  icon?: string;
  remark?: string;
  createTime: string;
  updateTime: string;
  children?: Menu[];
}

// 通用响应类型 - 适配后端当前格式
interface ApiResponse<T = any> {
  code: number;
  message: string; // 后端用的是message，不是msg
  data: T;
  success: boolean;
  // 兼容旧字段名
  msg?: string;
}

// 用户管理API
export const userApi = {
  // 获取用户列表 - 后端直接返回数组
  getList: () => http.get<ApiResponse<User[]>>('/system/user'),

  // 获取用户详情
  getDetail: (id: number) => http.get<ApiResponse<User>>(`/system/user/${id}`),

  // 创建用户
  create: (data: CreateUserDto) => http.post<ApiResponse>('/system/user', data),

  // 更新用户
  update: (id: number, data: UpdateUserDto) => http.patch<ApiResponse>(`/system/user/${id}`, data),

  // 删除用户
  delete: (id: number) => http.delete<ApiResponse>(`/system/user/${id}`),
};

// 角色相关接口
export interface CreateRoleDto {
  roleName: string;
  roleKey: string;
  roleSort: number;
  status?: '0' | '1';
  remark?: string;
  menuIds?: string[];
}

export interface UpdateRoleDto extends Partial<CreateRoleDto> {
  roleId: string;
}

// 角色管理API
export const roleApi = {
  // 获取角色列表
  getList: () => http.get<ApiResponse<Role[]>>('/role/list'),

  // 获取角色详情
  getDetail: (id: number) => http.get<ApiResponse<Role>>(`/role/${id}`),

  // 创建角色
  create: (data: CreateRoleDto) => http.post<ApiResponse>('/role', data),

  // 更新角色
  update: (id: string, data: UpdateRoleDto) => http.patch<ApiResponse>(`/role/${id}`, data),

  // 删除角色
  delete: (id: string) => http.delete<ApiResponse>(`/role/${id}`),
};

// 菜单相关接口
export interface CreateMenuDto {
  menuName: string;
  parentId?: string;
  orderNum?: number;
  path?: string;
  component?: string;
  isFrame?: '0' | '1';
  menuType: 'M' | 'C' | 'F';
  visible?: '0' | '1';
  status?: '0' | '1';
  perms?: string;
  icon?: string;
  remark?: string;
}

export interface UpdateMenuDto extends Partial<CreateMenuDto> {
  menuId: string;
}

// 菜单管理API
export const menuApi = {
  // 获取菜单列表
  getList: () => http.get<ApiResponse<Menu[]>>('/menu/list'),

  // 获取菜单详情
  getDetail: (id: number) => http.get<ApiResponse<Menu>>(`/menu/${id}`),

  // 创建菜单
  create: (data: CreateMenuDto) => http.post<ApiResponse>('/menu', data),

  // 更新菜单
  update: (id: string, data: UpdateMenuDto) => http.patch<ApiResponse>(`/menu/${id}`, data),

  // 删除菜单
  delete: (id: string) => http.delete<ApiResponse>(`/menu/${id}`),
};
