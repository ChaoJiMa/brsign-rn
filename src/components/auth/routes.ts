
export interface Route {
  path: string;
  name: string;
}

// 定义所有路由列表
const routes: Route[] = [
  {
    path: '/+not-found',
    name: '哎呀！页面不存在',
  },
  {
    path: '/',
    name: '首页',
  },
  {
    path: '/login',
    name: '登录',
  },
  {
    path:'/explore',
    name:'发现'
  },
  {
    path: '/register',
    name: '注册',
  },
  {
    path: '/query',
    name: '报告查询',
  },
  {
    path: '/query/pay',
    name: '收银台',
  },
]
// 定义公开路由列表，这些路由不需要进行权限验证
const publicRoutes = ['/+not-found', '/', '/login', '/query'];

export { publicRoutes, routes };

