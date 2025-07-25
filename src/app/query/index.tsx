import { PageTitle } from '@/components/PageTitle';
import { Stack } from 'expo-router';
export default PageTitle('报告查询')(function Index() {
  return <>
    <Stack.Screen options={{ title: '报告查询', headerShown: false }} />
    报告查询
  </>
})