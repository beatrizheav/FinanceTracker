import { View, Alert } from "react-native";
import React, { useState } from "react";
import { handleInputChange } from "../hooks/handleInputChange";
import useFormValidation from "../hooks/useFormValidation";
import Header from "../components/Header";
import CustomText from "../components/CustomText";
import CustomInput from "../components/CustomInput";
import AvatarPicker from "../components/AvatarPicker";
import CustomButton from "../components/CustomButton";
import { registrationScreen } from "../styles/screens/registration";
import { general } from "../styles/general";

export default function registration() {
  const [registrationData, setRegistrationData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const data = { ...registrationData, confirmPassword };

  const validateForm = useFormValidation(data, "registration");

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    Alert.alert("Able to register");
  };

  return (
    <View style={[general.safeArea, registrationScreen.container]}>
      <Header title={"Crear cuenta"} />
      <View style={registrationScreen.title}>
        <CustomText text={"Crear cuenta"} type={"TitleBig"} />
        <CustomText text={"¡Estás a un paso de empezar! "} type={"TextBig"} />
      </View>
      <View>
        <View style={registrationScreen.namesContainer}>
          <View style={registrationScreen.name}>
            <CustomInput
              label={"Nombre"}
              placeholder={"Luis"}
              value={registrationData.name}
              onChange={(data) =>
                handleInputChange(setRegistrationData, "name", data)
              }
            />
          </View>
          <View style={registrationScreen.name}>
            <CustomInput
              label={"Apellido"}
              placeholder={"Ramirez"}
              value={registrationData.lastName}
              onChange={(data) =>
                handleInputChange(setRegistrationData, "lastName", data)
              }
            />
          </View>
        </View>
        <CustomInput
          label={"Correo electrónico"}
          placeholder={"Ingresa tu correo electrónico"}
          type={"email"}
          value={registrationData.email}
          onChange={(data) =>
            handleInputChange(setRegistrationData, "email", data)
          }
        />
        <CustomInput
          label={"Contraseña"}
          placeholder={"Ingresa una contraseña"}
          type={"password"}
          value={registrationData.password}
          onChange={(data) =>
            handleInputChange(setRegistrationData, "password", data)
          }
        />
        <CustomInput
          label={"Confirma tu contraseña"}
          placeholder={"Confirma tu contraseña"}
          type={"password"}
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <AvatarPicker
          value={registrationData.avatar}
          avatarSelected={registrationData.avatar}
          setAvatar={(data) =>
            handleInputChange(setRegistrationData, "avatar", data)
          }
        />
      </View>
      <CustomButton
        title={"Registrate"}
        testID="register-button"
        background={"green"}
        onPress={() => handleSubmit()}
      />
    </View>
  );
}
