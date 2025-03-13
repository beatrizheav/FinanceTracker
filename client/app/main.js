import { View } from "react-native";
import React, { useState } from "react";
import { general } from "../styles/general";
import CustomInputText from "../components/CustomInputText";
import CustomInputDate from "../components/CustomInputDate";
import CustomInputDropdown from "../components/CustomInputDropdown";

const main = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");

  return (
    <View style={general.safeArea}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <CustomInputText
          label={"Nombre"}
          placeholder={"Nombre"}
          type={"text"}
          value={nombre}
          onChange={setNombre}
        />
        <CustomInputText
          label={"Apellido"}
          placeholder={"Apellido"}
          type={"text"}
          value={apellido}
          onChange={setApellido}
        />
      </View>
      <CustomInputText
        label={"Contraseña"}
        placeholder={"Ingresa una contraseña"}
        type={"password"}
        value={password}
        onChange={setPassword}
      />
      <CustomInputText
        label={"Correo electronico"}
        placeholder={"Ingresa tu correo electronico"}
        type={"email"}
        value={email}
        onChange={setEmail}
      />
      <CustomInputText
        label={"Descripción"}
        placeholder={"Ingresa una descripción"}
        type={"paragraph"}
        value={paragraph}
        onChange={setParagraph}
      />
      <CustomInputText
        label={"Presupuesto"}
        placeholder={"Ingresa el presupuesto"}
        type={"number"}
        value={presupuesto}
        onChange={setPresupuesto}
      />
      <CustomInputDate label={"Fecha"} date={date} setDate={setDate} />
      <CustomInputDropdown
        label={"Categoria"}
        value={category}
        setValue={setCategory}
      />
    </View>
  );
};

export default main;
