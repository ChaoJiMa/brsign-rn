import { PageTitle } from '@/components/PageTitle';
import SafeView from '@/components/SafeView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouteTitle } from '@/hooks/useRouteTitle';
import { Stack } from 'expo-router';

export default PageTitle()(function Index() {
  return <SafeView>
    <Stack.Screen options={{ title: useRouteTitle(), headerShown: false }} />
    <ThemedView>
      <ThemedText>报告查询</ThemedText>
    </ThemedView>
  </SafeView>
})