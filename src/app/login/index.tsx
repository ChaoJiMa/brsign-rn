import { PageTitle } from '@/components/PageTitle';
import SafeView from '@/components/SafeView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';

export default PageTitle('登录')(function Index() {
  return <SafeView>
    <Stack.Screen options={{ title: '登录', headerShown: false }} />
    <ThemedView>
      <ThemedText>
        登录
      </ThemedText>
    </ThemedView>
  </SafeView>
})