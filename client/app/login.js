import { View } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import useFormValidation from "../hooks/useFormValidation";
import { handleInputChange } from "../hooks/handleInputChange";
import CustomText from "../components/CustomText";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { loginScreen } from "../styles/screens/login-screen";
import { colorsTheme } from "../styles/colorsTheme";

export default function login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const data = { ...loginData };

  const validateForm = useFormValidation(data, "login");
  const router = useRouter();

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    router.replace("/home");
  };

  return (
    <View style={loginScreen.screenContainer}>
      <View style={loginScreen.itemsContainer}>
        <View style={loginScreen.titleContainer}>
          <CustomText
            type={"TitleBig"}
            numberOfLines={2}
            text={"Bienvenido a \nFinance Tracker!"}
          />
          <CustomText
            type={"TexSmall"}
            color={colorsTheme.darkGray}
            text={"Lleva el control de tus finanzas desde tu celular"}
          />
        </View>

        <View style={loginScreen.inputsContainer}>
          <CustomInput
            type={"email"}
            label={"Correo Electronico"}
            placeholder={"Ingresa tu correo electronico"}
            value={loginData.email}
            onChange={(text) => {
              handleInputChange(setLoginData, "email", text);
            }}
          />
          <CustomInput
            type={"password"}
            label={"Contrasena"}
            placeholder={"Ingresa tu contrasena"}
            value={loginData.password}
            onChange={(text) => {
              handleInputChange(setLoginData, "password", text);
            }}
          />
        </View>
        <View style={loginScreen.buttonContainer}>
          <CustomButton
            title={"Iniciar Sesion"}
            background={"green"}
            onPress={() => handleSubmit()}
          />
          <View style={loginScreen.labelsContainer}>
            <CustomText
              text={"Aún no tienes una cuenta? "}
              type={"TextBig"}
              color={colorsTheme.darkGray}
            />
            <Link href="/registration" style={loginScreen.registerLink}>
              Registrate
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
