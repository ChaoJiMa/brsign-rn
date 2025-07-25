import { PageTitle } from '@/components/PageTitle';
import SafeView from '@/components/SafeView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';

export default PageTitle('收银台')(function HomeScreen() {
  return <SafeView>
    <Stack.Screen options={{ title: '收银台', headerShown: false }} />
    <ThemedView>
      <ThemedText>
        收银台
      </ThemedText>
    </ThemedView>
  </SafeView>
})