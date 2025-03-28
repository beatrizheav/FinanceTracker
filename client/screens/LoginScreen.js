import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomTitle from "../components/CustomTitle";
import CustomInput from "../components/CustomInput";
import { colorsTheme } from "../styles/colorsTheme";
import CustomButton from "../components/CustomButton";
import { loginScreen } from "../styles/screens/login-screen";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={loginScreen.screenContainer}>
      <View style={loginScreen.itemsContainer}>
        <View style={loginScreen.titleContainer}>
          <CustomTitle
            title={"Bienvenido a \nFinance Tracker!"}
            type={"TitleBig"}
            numberOfLines={2}
          />
          <CustomTitle
            title={"Lleva el control de tus finanzas desde tu celular"}
            type={"TextSmall"}
            color={{ color: colorsTheme.darkGray }}
          />
        </View>

        <View style={loginScreen.inputsContainer}>
          <CustomInput
            type={"email"}
            label={"Correo Electronico"}
            placeholder={"Ingresa tu correo electronico"}
            value={email}
            onChange={setEmail}
          />
          <CustomInput
            type={"password"}
            label={"Contrasena"}
            placeholder={"Ingresa tu contrasena"}
            value={password}
            onChange={setPassword}
          />
        </View>
        <View style={loginScreen.buttonContainer}>
          <CustomButton title={"Iniciar Sesion"} background={"green"} />
          <View style={loginScreen.labelsContainer}>
            <CustomTitle
              title={"Aun no tienes una cuenta? "}
              type={"ButtonSmall"}
              color={{ color: colorsTheme.darkGray }}
            />
            <CustomTitle
              title={"Registrate"}
              type={"ButtonSmall"}
              color={{ color: colorsTheme.teal }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
