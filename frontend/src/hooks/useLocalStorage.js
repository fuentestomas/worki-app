import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToLocalStorage = async (key, value) => {
  const jsonObj = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonObj);
};

export const loadFromLocalStorage = async (key) => {
  const value = await AsyncStorage.getItem(key);
  if (value) {
    const parsedObj = JSON.parse(value);
    return parsedObj;
  }
  return null;
};

export const clearLocalStorage = (key) => {
  AsyncStorage.removeItem(key);
};

export const clearAllLocalStorage = async () => {
  await AsyncStorage.clear();
};
