import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const router = useRouter();
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  const assets = [
    require("../assets/avatars/1.png"),
    require("../assets/avatars/2.png"),
    require("../assets/avatars/3.png"),
    require("../assets/avatars/4.png"),
    require("../assets/avatars/5.png"),
    require("../assets/avatars/6.png"),
    require("../assets/avatars/7.png"),
    require("../assets/avatars/8.png"),
    require("../assets/avatars/9.png"),
    require("../assets/avatars/10.png"),
    require("../assets/avatars/11.png"),
    require("../assets/avatars/12.png"),
    require("../assets/avatars/13.png"),
    require("../assets/avatars/14.png"),
    require("../assets/avatars/15.png"),
    require("../assets/avatars/16.png"),
    require("../assets/avatars/add.png"),
    require("../assets/images/LogoSplash.png"),
  ];

  useEffect(() => {
    async function loadAssets() {
      await Asset.loadAsync(assets);
      setAssetsLoaded(true);
    }
    loadAssets();
  }, []);

  useEffect(() => {
    if (fontsLoaded && assetsLoaded) {
      SplashScreen.hideAsync();
      const token = AsyncStorage.getItem("token");
      if (token) {
        router.replace("/home");
      } else router.replace("/login");
    }
  }, [fontsLoaded, router, assetsLoaded]);

  return null;
}
