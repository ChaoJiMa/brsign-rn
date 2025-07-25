/**
 * 自定义 React Hook，用于设置网页的标题。
 * 该 Hook 会检查 `document` 对象是否可用，避免在非浏览器环境（如 Node.js）中运行时出错。
 * 
 * @param title - 要设置的网页标题字符串。
 * @returns 返回传入的网页标题字符串。
 */
export const usePageTitle = (title: string) => {
  // 检查 document 对象是否存在，避免在非浏览器环境中使用时出错
  if (typeof document !== 'undefined') {
    // 如果 document 对象存在，则将传入的标题设置为网页标题
    document.title = title
  }
  // 返回传入的标题字符串
  return title
}