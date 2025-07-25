import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = PropsWithChildren<{
  children: ReactNode;
  headerBackgroundColor?: { dark: string; light: string };
}>;

/**
 * SecurityView 组件用于在 React Native 应用中提供安全区域视图。
 * 该组件会将其子元素包裹在 SafeAreaView 内，确保内容显示在设备屏幕的安全区域内，
 * 避免被设备的刘海、圆角、状态栏等遮挡。
 * 
 * @param children - 该组件的子元素，会被渲染在安全区域内。
 * @returns 一个包裹在 SafeAreaView 中的 React 元素。
*/
export default function SafeView({
  children,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = 0;
  const height = 250;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: height,
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      padding: 32,
      gap: 16,
      overflow: 'hidden',
    },
  });
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-height, 0, height],
            [-height / 2, 0, height * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-height, 0, height], [2, 1, 1]),
        },
      ],
    };
  });
  // 返回一个 SafeAreaView 组件，将子元素包裹在其中
  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        {/* <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor && headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
          {children}
        </Animated.View> */}
        {/* 渲染传递给组件的子元素 */}
        <ThemedView style={styles.content}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

