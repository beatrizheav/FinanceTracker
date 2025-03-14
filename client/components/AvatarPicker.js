import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
  Button,
} from "react-native";
import { avatars } from "../constants/avatars";
import { avatarPicker } from "../styles/components/avatar-picker";
import { fontsTheme } from "../styles/fontsTheme";
import { inputs } from "../styles/components/inputs";

const AvatarPicker = ({ avatarSelected, setAvatar }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAvatarSelect = (avatarKey) => {
    console.log(avatarKey);
    setAvatar(avatarKey);
    setIsModalVisible(false);
  };

  // Look for the avatar image based on the key saved in the database
  const avatar = avatars.find((item) => item.key === avatarSelected);

  return (
    <View style={inputs.wrapper}>
      <Text style={fontsTheme.TitleSmall}>Pick an avatar!</Text>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={[inputs.container, inputs.containerSquare]}
      >
        <Image
          source={avatar ? avatar.src : require("../assets/avatars/add.png")}
          style={avatarPicker.avatarImage}
        />
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={inputs.modalBackground}>
          <View style={inputs.modalContainer}>
            <Text style={fontsTheme.TitleSmall}>Choose an Avatar</Text>
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
            <Button title="Close" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AvatarPicker;
