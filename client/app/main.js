import { View } from "react-native";
import React, { useState } from "react";
import { general } from "../styles/general";
import CustomInput from "../components/CustomInput";
import DatePicker from "../components/DatePicker";
import DropdownSelect from "../components/DropdownSelect";
import ColorPicker from "../components/ColorPicker";
import IconPicker from "../components/IconPicker";
import AvatarPicker from "../components/AvatarPicker";
import ImagePickerComponent from "../components/ImagePicker";

const main = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [icon, setIcon] = useState(null);
  const [avatar, setAvatar] = useState(null);

  return (
    <View style={general.safeArea}>
      {/* <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <CustomInput
          label={"Nombre"}
          placeholder={"Nombre"}
          type={"text"}
          value={nombre}
          onChange={setNombre}
        />
        <CustomInput
          label={"Apellido"}
          placeholder={"Apellido"}
          type={"text"}
          value={apellido}
          onChange={setApellido}
        />
      </View>
      <CustomInput
        label={"Contraseña"}
        placeholder={"Ingresa una contraseña"}
        type={"password"}
        value={password}
        onChange={setPassword}
      />
      <CustomInput
        label={"Correo electronico"}
        placeholder={"Ingresa tu correo electronico"}
        type={"email"}
        value={email}
        onChange={setEmail}
      />
      <CustomInput
        label={"Descripción"}
        placeholder={"Ingresa una descripción"}
        type={"paragraph"}
        value={paragraph}
        onChange={setParagraph}
      />
      <CustomInput
        label={"Presupuesto"}
        placeholder={"Ingresa el presupuesto"}
        type={"number"}
        value={presupuesto}
        onChange={setPresupuesto}
      />
      <DatePicker label={"Fecha"} date={date} setDate={setDate} />
      <DropdownSelect
        label={"Categoria"}
        value={category}
        setValue={setCategory}
      />
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <ColorPicker color={color} setColor={setColor} />
        <IconPicker icon={icon} setIcon={setIcon} />
      </View> */}
      {/* <AvatarPicker
        avatarSelected={avatar}
        setAvatar={(avatarSrc) => setAvatar(avatarSrc)}
      /> */}
      <ImagePickerComponent />
    </View>
  );
};

export default main;
