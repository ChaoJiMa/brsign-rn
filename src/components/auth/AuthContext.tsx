// 从认证令牌模块导入获取、移除和设置令牌的函数
import { getToken, removeToken, setToken } from '@/lib/auth/token';
// 从 expo-router 导入路由对象
import { router } from 'expo-router';
// 从 React 导入创建上下文、使用上下文、副作用钩子和状态钩子
import { createContext, useContext, useEffect, useState } from 'react';

/**
 * 用户类型定义
 * @property {string} id - 用户的唯一标识符
 * @property {'admin' | 'user' | 'guest'} role - 用户角色，可选值为 'admin'、'user' 或 'guest'
 * @property {string} name - 用户的名称
 */
type User = {
  id: string;
  role: 'admin' | 'user' | 'guest';
  name: string;
};

/**
 * 认证上下文类型定义
 * @property {User | null} user - 当前用户信息，未认证时为 null
 * @property {boolean} isAuthenticated - 用户是否已认证
 * @property {boolean} isInitialized - 认证状态是否已初始化
 * @property {(userData: User, token: string) => void} login - 登录函数，接收用户数据和令牌作为参数
 * @property {() => void} logout - 登出函数
 */
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

// 创建认证上下文，初始值为非空断言的 null
const AuthContext = createContext<AuthContextType>(null!);

/**
 * 认证提供者组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {JSX.Element} 包裹子组件的认证上下文提供者
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 初始化用户状态，默认角色为 guest
  const [user, setUser] = useState<User>({
    id: '',
    role: 'guest',
    name: '',
  });
  // 初始化认证状态是否已初始化的状态
  const [isInitialized, setIsInitialized] = useState(false);

  // 组件挂载时执行初始化认证操作
  useEffect(() => {
    /**
     * 初始化认证状态
     */
    const initAuth = async () => {
      // 从本地存储获取令牌
      const token = await getToken();
      if (token) {
        try {
          // 实际项目中应调用 API 验证令牌有效性，此处使用模拟用户数据
          const mockUser: User = { id: '1', role: 'user', name: 'Demo User' };
          // 设置用户状态
          setUser(mockUser);
        } catch (error) {
          // 验证失败时移除令牌
          removeToken();
        }
      }
      // 标记认证状态已初始化
      setIsInitialized(true);
    };

    // 执行初始化认证操作
    initAuth();
  }, []);

  /**
   * 登录函数
   * @param {User} userData - 用户数据
   * @param {string} token - 认证令牌
   */
  const login = (userData: User, token: string) => {
    // 将令牌存储到本地
    setToken(token);
    // 设置用户状态
    setUser(userData);
    // 登录成功后跳转到首页
    router.replace('/');
  };

  /**
   * 登出函数
   */
  const logout = () => {
    // 移除本地存储的令牌
    removeToken();
    // 将用户状态重置为 guest
    setUser({
      id: '',
      role: 'guest',
      name: ''
    });
    // 登出后跳转到登录页
    router.replace('./login');
  };

  return (
    // 提供认证上下文值
    <AuthContext.Provider
      value={{
        user,
        // 根据用户角色判断是否已认证
        isAuthenticated: user.role !== 'guest',
        isInitialized,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * 获取认证上下文的钩子函数
 * @returns {AuthContextType} 认证上下文值
 */
export function useAuth() {
  return useContext(AuthContext);
}