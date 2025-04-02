import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomTitle from "../components/CustomTitle";
import CustomInput from "../components/CustomInput";
import { colorsTheme } from "../styles/colorsTheme";
import CustomButton from "../components/CustomButton";
import { loginScreen } from "../styles/screens/login-screen";
import { handleInputChange } from "../hooks/handleInputChange";
import { Link } from "expo-router";
import useFormValidation from "../hooks/useFormValidation";

export default function login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const data = { ...loginData };

  const validateForm = useFormValidation(data, "login");

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    alert("Able to log in");
  };

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
            <CustomTitle
              title={"Aun no tienes una cuenta? "}
              type={"ButtonSmall"}
              color={{ color: colorsTheme.darkGray }}
            />
            <Link href="/" style={loginScreen.registerLink}>
              Registrate
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
