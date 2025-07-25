import { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * SecurityView 组件用于在 React Native 应用中提供安全区域视图。
 * 该组件会将其子元素包裹在 SafeAreaView 内，确保内容显示在设备屏幕的安全区域内，
 * 避免被设备的刘海、圆角、状态栏等遮挡。
 * 
 * @param children - 该组件的子元素，会被渲染在安全区域内。
 * @returns 一个包裹在 SafeAreaView 中的 React 元素。
 */
export default function SafeView({ children }: { children: ReactNode }) {
  // 返回一个 SafeAreaView 组件，将子元素包裹在其中
  return (
    <SafeAreaView>
      {/* 渲染传递给组件的子元素 */}
      {children}
    </SafeAreaView>
  );
}