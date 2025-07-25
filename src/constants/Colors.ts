/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// 默认浅色模式下的主题强调色。
const tintColorLight = '#000';
// 定义深色模式下的主题强调色。
const tintColorDark = '#fff';

export const Colors = {
  light: {
    // 文本颜色
    text: '#11181C',
    // 背景颜色
    background: '#fff',
    // 边框颜色
    tint: tintColorLight,
    // 图标颜色
    icon: '#687076',
    // 标签页图标颜色
    tabIconDefault: '#687076',
    // 标签页选中图标颜色
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#121212',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
