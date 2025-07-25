import { router, usePathname } from 'expo-router';
import { ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import type { Route } from './routes';
import { publicRoutes, routes } from './routes';

/**
 * AuthGuardProps 类型定义，用于描述 AuthGuard 组件的属性。
 */
type AuthGuardProps = {
  /**
   * 组件的子元素，通常是需要进行权限保护的内容。
   */
  children: ReactNode;
  /**
   * 是否需要用户登录才能访问，默认为 true。
   */
  requireAuth?: boolean;
  /**
   * 允许访问的角色列表，只有用户角色在该列表中才有权限访问。
   */
  allowedRoles?: string[];
  /**
   * 当用户无权限访问时，重定向到的路径，默认为 '/login'。
   */
  redirectTo?: any;
  /**
   * 是否静默重定向，即重定向时不显示错误提示，默认为 false。
   */
  silent?: boolean;
};

/**
 * AuthGuard 组件，用于对路由进行权限验证。
 * 根据用户的登录状态和角色，决定是否允许访问受保护的路由。
 * 
 * @param children - 需要进行权限保护的子元素。
 * @param requireAuth - 是否需要用户登录，默认为 true。
 * @param allowedRoles - 允许访问的角色列表，默认为空数组。
 * @param redirectTo - 无权限时重定向的路径，默认为 '/login'。
 * @param silent - 是否静默重定向，默认为 false。
 */
export function AuthGuard({
  children,
  requireAuth = true,
  allowedRoles = [],
  redirectTo = '/login',
  silent = false
}: AuthGuardProps) {
  // 从 AuthContext 中获取用户信息和初始化状态
  const { user, isInitialized } = useAuth();
  // 获取当前页面的路径名
  const pathname = usePathname();
  // 定义公开路由列表，这些路由不需要进行权限验证
  // const publicRoutes = ['/+not-found', '/', '/login', '/query'];

  /**
   * 检查用户是否具有访问当前路由的权限。
   * 
   * @returns 如果用户有权限访问则返回 true，否则返回 false。
   */
  const hasPermission = () => {
    // 如果不需要登录验证，直接返回 true
    if (!requireAuth) return true;
    // 如果用户角色为 guest，返回 false
    if (user?.role === 'guest') return false;
    // 如果指定了允许的角色列表，且用户角色不在列表中，返回 false
    if (user?.role && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return false;
    }
    // 其他情况返回 true
    return true;
  };

  /**
   * 处理用户无权限访问的情况，根据条件进行重定向。
   */
  useEffect(() => {
    // 如果当前路由不在所有路由列表中，直接返回
    if (!routes.some((route: Route) => route.path === pathname)) return;
    // 当 AuthContext 初始化完成，用户无权限访问，且当前路由不是公开路由时
    if (isInitialized && !hasPermission() && !publicRoutes.includes(pathname)) {
      if (!silent) {
        // 非静默重定向，记录来源路由以便登录后跳回
        router.replace({
          pathname: redirectTo,
          params: { from: pathname }
        });
      }
      // 执行重定向操作
      router.replace({
        pathname: redirectTo,
        params: { from: pathname }
      });
    }
  }, [isInitialized, pathname, user]);

  /**
   * 在开发环境下，记录用户访问受保护路由的日志。
   */
  useEffect(() => {
    // 当处于开发环境且用户角色不是 guest 时
    if (__DEV__ && user?.role !== 'guest') {
      console.log(`[AuthGuard] 访问受保护路由: ${pathname}`);
    }
  }, [pathname, user]);

  // 返回组件的子元素
  return <>{children}</>;
}