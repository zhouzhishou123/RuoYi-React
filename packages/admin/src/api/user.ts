import http from '@/utils/http';

// 用户列表
export function getUserList(params?: any) {
  return http({
    url: '/system/user/list',
    method: 'get',
    params,
  });
}

// 获取用户详情
export function getUserDetail(userId: string) {
  return http({
    url: `/system/user/${userId}`,
    method: 'get',
  });
}

// 新增用户
export function addUser(data: any) {
  return http({
    url: '/system/user',
    method: 'post',
    data,
  });
}

// 修改用户
export function updateUser(data: any) {
  return http({
    url: '/system/user',
    method: 'patch',
    data,
  });
}

// 删除用户
export function deleteUser(userId: string) {
  return http({
    url: `/system/user/${userId}`,
    method: 'delete',
  });
}
