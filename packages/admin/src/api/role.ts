import http from '@/utils/http';

// 角色列表
export function getRoleList(params?: any) {
  return http({
    url: '/system/role/list',
    method: 'get',
    params,
  });
}

// 获取角色详情
export function getRoleDetail(roleId: string) {
  return http({
    url: `/system/role/${roleId}`,
    method: 'get',
  });
}

// 新增角色
export function addRole(data: any) {
  return http({
    url: '/system/role',
    method: 'post',
    data,
  });
}

// 修改角色
export function updateRole(data: any) {
  return http({
    url: '/system/role',
    method: 'patch',
    data,
  });
}

// 删除角色
export function deleteRole(roleId: string) {
  return http({
    url: `/system/role/${roleId}`,
    method: 'delete',
  });
}

// 更新角色状态
export function updateRoleStatus(roleId: string, status: string) {
  return http({
    url: `/system/role/${roleId}/status/${status}`,
    method: 'patch',
  });
}
