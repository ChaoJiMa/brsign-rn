import type { Route } from '@/components/auth/routes';
import { routes } from '@/components/auth/routes';
import { usePathname } from 'expo-router';

//  创建一个名为 useRouteTitle 的自定义 Hook
export const useRouteTitle = () => {
  // 获取当前页面的路径名
  const pathname = usePathname();
  // 获取当前页面的路由信息
  const route: Route | undefined = routes.find((route: Route) => route.path === pathname);
  const notFoundRoute: Route | undefined = routes.find((route: Route) => route.path === '/+not-found');
  // 获取当前路由的标题
  return route?.name || notFoundRoute?.name as string;
};