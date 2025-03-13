import { View, Text } from "react-native";
import React, { useState } from "react";
import { general } from "../styles/general";
import { Button } from "react-native";
import CustomInput from "../components/CustomInput";

const main = () => {
  return (
    <View style={general.safeArea}>
      {/* <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <CustomInput label={"Nombre"} placeholder={"Nombre"} type={"text"} />
        <CustomInput
          label={"Apellido"}
          placeholder={"Apellido"}
          type={"text"}
        />
      </View>
      <CustomInput
        label={"Contraseña"}
        placeholder={"Ingresa una contraseña"}
        type={"password"}
      />
      <CustomInput
        label={"Correo electronico"}
        placeholder={"Ingresa tu correo electronico"}
        type={"email"}
      />
      <CustomInput
        label={"Descripción"}
        placeholder={"Ingresa una descripción"}
        type={"paragraph"}
      /> */}
      <CustomInput
        label={"Prespuesto"}
        placeholder={"Ingresa el presupuesto"}
        type={"number"}
      />
      <CustomInput
        label={"Fecha"}
        placeholder={"Selecciona una fecha"}
        type={"date"}
      />
    </View>
  );
};

export default main;
