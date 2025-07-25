import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
// import { MMKV } from 'react-native-mmkv';

// // Web 平台不传 encryptionKey
// const webSafeConfig = Platform.select({
//   native: {
//     id: 'user-storage',
//     encryptionKey: 'your-secret-key-32-chars' // 仅原生平台生效
//   },
//   default: {
//     id: 'user-storage' // Web 平台配置
//   }
// });
// export const storage = new MMKV(webSafeConfig);

// export function getItem<T>(key: string): T | null {
//   const value = storage.getString(key);
//   return value ? JSON.parse(value) || null : null;
// }

// export async function setItem<T>(key: string, value: T) {
//   storage.set(key, JSON.stringify(value));
// }

// export async function removeItem(key: string) {
//   storage.delete(key);
// }

export async function getItem<T>(key: string): Promise<T | null> {
  let value: any;
  if (Platform.OS === 'web') {
    await AsyncStorage.getItem(key, value);
  } else {
    await SecureStore.getItemAsync(key, value);
  }
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } else {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }
}

export async function removeItem(key: string) {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}