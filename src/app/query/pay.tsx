import { PageTitle } from '@/components/PageTitle';
import SafeView from '@/components/SafeView';
import { ThemedText } from '@/components/ThemedText';
import { Stack } from 'expo-router';

export default PageTitle('收银台')(function HomeScreen() {
  return <SafeView>
    <Stack.Screen options={{ title: '收银台', headerShown: false }} />
    <ThemedText>
      收银台
    </ThemedText>
  </SafeView>
})