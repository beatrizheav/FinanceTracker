import { View, Text, Image } from "react-native";
import React from "react";
import { splashScreen } from "../styles/screens/splash-screen";
import CustomText from "../components/CustomText";
import { colorsTheme } from "../styles/colorsTheme";

const SplashScreen = () => {
  return (
    <View style={splashScreen.background}>
      <Image
        source={require("../assets/images/PigLogo.png")}
        style={splashScreen.logo}
      />
      <View style={splashScreen.titleContainer}>
        <Text style={splashScreen.title1}>Finance </Text>
        <Text style={splashScreen.title2}>Tracker</Text>
      </View>
      <CustomText
        text={"Cargando..."}
        type={"TextBig"}
        color={colorsTheme.darkGreen}
      />
    </View>
  );
};

export default SplashScreen;
