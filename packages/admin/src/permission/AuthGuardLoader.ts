import { getAccessToken } from '@/utils/storage';
import { redirect } from 'react-router-dom';
const whiteList = [];
async function authGuardLoader({ request }: { request: Request }) {
  const token = getAccessToken();
  const url = new URL(request.url);
  // 白名单直接放行
  if (whiteList.includes(url.pathname)) {
    return null;
  }
  // 未登录
  if (!token) {
    if (url.pathname === '/login') {
      return null;
    }
    const currentPath = encodeURIComponent(url.pathname + url.search);
    return redirect(`/login?redirect=${currentPath}`);
  } else {
    // 已登录
    // 访问登录页面重定向到之前的页面
    if (url.pathname === '/login') {
      return redirect(url.searchParams.get('redirect') || '/');
    }
  }
  return null;
}

export default authGuardLoader;
