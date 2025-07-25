import { PageTitle } from '@/components/PageTitle';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouteTitle } from '@/hooks/useRouteTitle';

export default PageTitle()(function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: useRouteTitle() }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title"> 您访问的页面不存在!</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">返回首页</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
