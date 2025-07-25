import { PageTitle } from '@/components/PageTitle';
import SafeView from '@/components/SafeView';
import { ThemedText } from '@/components/ThemedText';
import { Stack } from 'expo-router';
export default PageTitle('报告查询')(function Index() {
  return <SafeView>
    <Stack.Screen options={{ title: '报告查询', headerShown: false }} />
    <ThemedText>报告查询</ThemedText>
  </SafeView>
})