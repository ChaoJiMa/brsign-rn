import { PageTitle } from '@/components/PageTitle';
import { Stack } from 'expo-router';

export default PageTitle('收银台')(function HomeScreen() {
  return <>
    <Stack.Screen options={{ title: '收银台', headerShown: false }} />
    收银台
  </>
})