import { APIProvider } from '@/api/common/api-provider';
import { AuthProvider } from '@/components/auth/AuthContext';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useThemeConfig } from '@/lib/use-theme-config';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { KeyboardProvider } from 'react-native-keyboard-controller';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync(); // 阻止启动页自动隐藏
export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard>
        <Providers>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </Providers>
      </AuthGuard>
    </AuthProvider>
  )
}
function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const prepare = async () => {
      // 初始化任务
      setIsReady(true);
      await SplashScreen.hideAsync(); // 所有任务完成后隐藏启动页
    }
    prepare();
  }, []);
  // 等待所有任务完成后才渲染应用
  if (!isReady) return null;
  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `dark` : undefined}
    >
      {/* <KeyboardProvider> */}
      <ThemeProvider value={theme}>
        <APIProvider>
          <BottomSheetModalProvider>
            {children}
            <FlashMessage position="top" />
          </BottomSheetModalProvider>
        </APIProvider>
      </ThemeProvider>
      {/* </KeyboardProvider> */}
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
