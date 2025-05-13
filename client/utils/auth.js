import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const logout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
  router.replace("/login");
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const isLoggedIn = async () => {
  const token = await getToken();
  return !!token;
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
