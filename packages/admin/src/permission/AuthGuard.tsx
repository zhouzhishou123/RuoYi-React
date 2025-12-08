import { setRoles, setRoutes, setUserInfo } from '@/store/appSlice';
import { useGetRoutersQuery, useGetUserInfoQuery } from '@/store/querySlice';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error: userError } = useGetUserInfoQuery();
  const dispatch = useDispatch();
  const { data: routes, isLoading: isLoadingRouter, error: routeError } = useGetRoutersQuery();

  // 合并两个useEffect，减少渲染次数
  useEffect(() => {
    if (data) {
      dispatch(setRoles(data.roles));
      dispatch(setUserInfo(data.user));
    }
    if (routes) {
      dispatch(setRoutes(routes));
    }
  }, [data, routes, dispatch]);

  // 处理错误
  useEffect(() => {
    if (userError || routeError) {
      console.error('AuthGuard加载失败:', { userError, routeError });
    }
  }, [userError, routeError]);

  if (isLoading || isLoadingRouter) {
    return (
      <div style={loadingStyle}>
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthGuard;
