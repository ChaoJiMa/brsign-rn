import { PageTitle } from '@/components/PageTitle'
import { Stack } from 'expo-router'
export default PageTitle('登录')(function Index() {
  return <>
    <Stack.Screen options={{ title: '登录', headerShown: false }} />
    登录
  </>
})