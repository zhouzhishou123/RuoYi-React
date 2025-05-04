import { setRoles, setRoutes, setUserInfo } from '@/store/appSlice';
import { useGetRoutersQuery, useGetUserInfoQuery } from '@/store/authSlice';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetUserInfoQuery();
  const dispatch = useDispatch();
  const { data: routes, isLoading: isLoadingRouter } = useGetRoutersQuery();

  useEffect(() => {
    if (data) {
      dispatch(setRoles(data.roles));
      dispatch(setUserInfo(data.user));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (routes) {
      dispatch(setRoutes(routes));
    }
  }, [routes, dispatch]);

  if (isLoading || isLoadingRouter) {
    return (
      <div style={style}>
        <Spin />
      </div>
    );
  }

  return <div>{children}</div>;
}

export default AuthGuard;
