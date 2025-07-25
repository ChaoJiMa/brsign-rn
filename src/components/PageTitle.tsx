/**
 * 创建一个高阶组件，用于为传入的组件设置网页标题。
 * 
 * @param title - 要设置的网页标题字符串。
 * @returns 返回一个接受 React 组件作为参数的函数，该函数返回一个带有标题设置功能的新组件。
 */
export function PageTitle(title: string) {
  /**
   * 接受一个 React 组件作为参数，返回一个新的组件。
   * 
   * @param Component - 要包装的 React 组件。
   * @returns 返回一个新的组件，该组件在渲染时会设置网页标题。
   */
  return function WrappedComponent(Component: React.ComponentType) {
    /**
     * 带有标题设置功能的新组件。
     * 在渲染时会检查 `document` 对象是否可用，若可用则设置网页标题。
     * 
     * @returns 返回传入的 React 组件。
     */
    return function PageWithTitle() {
      // 检查 document 对象是否存在，避免在非浏览器环境（如 Node.js）中运行时出错
      if (typeof document !== 'undefined') {
        // 如果 document 对象存在，则将传入的标题设置为网页标题
        document.title = title;
      }
      // 渲染传入的组件
      return <Component />;
    };
  };
}