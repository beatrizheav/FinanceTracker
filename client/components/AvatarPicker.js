import React, { useState } from "react";
import { Modal, TouchableOpacity, View, FlatList, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { avatars } from "../constants/avatars";
import CustomButton from "./CustomButton";
import CustomText from "./CustomText";
import { avatarPicker } from "../styles/components/avatar-picker";
import { inputs } from "../styles/components/inputs";
import { colorsTheme } from "../styles/colorsTheme";

const AvatarPicker = ({ avatarSelected, setAvatar }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAvatarSelect = (avatarKey) => {
    setAvatar(avatarKey);
    setIsModalVisible(false);
  };

  // Look for the avatar image based on the key saved in the database
  const avatar = avatars.find((item) => item.key === avatarSelected);

  return (
    <View style={inputs.wrapper}>
      <CustomText
        text={"Selecciona un avatar para tu perfil"}
        type={"TitleSmall"}
      />
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={[inputs.container, inputs.containerSquare]}
      >
        {avatar ? (
          <Image source={avatar.src} style={avatarPicker.avatarImage} />
        ) : (
          <AntDesign
            name="pluscircleo"
            size={40}
            color={colorsTheme.mediumGray}
          />
        )}
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={inputs.modalBackground}>
          <View style={inputs.modalContainer}>
            <CustomText text={"Selecciona un avatar"} type={"TitleSmall"} />
            <FlatList
              data={avatars}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleAvatarSelect(item.key)}>
                  <Image source={item.src} style={avatarPicker.avatarModal} />
                </TouchableOpacity>
              )}
            />
            <CustomButton
              title={"Close"}
              onPress={() => setIsModalVisible(false)}
              type={"modal"}
              background={"green"}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AvatarPicker;
