import { PageTitle } from '@/components/PageTitle';
import SafeView from '@/components/SafeView';
import { ThemedText } from '@/components/ThemedText';
import { Stack } from 'expo-router';

export default PageTitle('登录')(function Index() {
  return <SafeView>
    <Stack.Screen options={{ title: '登录', headerShown: false }} />
    <ThemedText>
      登录
    </ThemedText>
  </SafeView>
})