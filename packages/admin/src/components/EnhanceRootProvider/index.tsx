import { generateDynamicRoutes, generateRouteObject } from '@/router/index';
import { constantRoutes } from '@/router/routes';
import { RootState, useAppSelector } from '@/store';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Suspense, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function RootProvider() {
  const { routes } = useAppSelector((state: RootState) => state.app);
  const router = useMemo(() => {
    if (routes.length === 0) {
      return createBrowserRouter(generateDynamicRoutes(constantRoutes));
    }
    return createBrowserRouter(generateRouteObject([...routes, ...constantRoutes]));
  }, [routes]);

  return (
    <ConfigProvider locale={zhCN}>
      <Suspense>
        <RouterProvider
          router={router}
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        />
      </Suspense>
    </ConfigProvider>
  );
}

export default RootProvider;
