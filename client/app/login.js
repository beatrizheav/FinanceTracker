import { View } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFormValidation from "../hooks/useFormValidation";
import { handleInputChange } from "../hooks/handleInputChange";
import apiClient from "../api/apiClient";
import CustomText from "../components/CustomText";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { loginScreen } from "../styles/screens/login-screen";
import { colorsTheme } from "../styles/colorsTheme";
import { general } from "../styles/general";

export default function login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const data = { ...loginData };

  const validateForm = useFormValidation(data, "login");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const data = await apiClient.post("/user/login", loginData)
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("user", JSON.stringify(data.user));
      router.replace("/home");
    } catch (error) {
      alert("Error al iniciar sesion:" + error.message)
    }
  };

  return (
    <View style={[general.safeArea, loginScreen.container]}>
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
          placeholder={"Ingresa tu contraseña"}
          value={loginData.password}
          onChange={(text) => {
            handleInputChange(setLoginData, "password", text);
          }}
        />
      </View>

      <View style={loginScreen.buttonContainer}>
        <CustomButton
          title={"Iniciar Sesión"}
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
  );
}
