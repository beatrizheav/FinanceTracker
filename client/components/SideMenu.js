import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colorsTheme } from "../styles/colorsTheme";

const { width, height } = Dimensions.get("window");
const SIDE_MENU_WIDTH = width * 0.8;
const AVATAR_SECTION_HEIGHT = height * 0.25;
const BUTTON_HEIGHT = height * 0.065;

const menuItems = [
  { key: "1", icon: "home", label: "Inicio" },
  { key: "2", icon: "credit-card", label: "Gastos" },
  { key: "3", icon: "dollar", label: "Ingresos" },
  { key: "4", icon: "folder-o", label: "Categorias" },
];

const SideMenu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Nombre de Usuario</Text>
        <Text style={styles.email}>correo@ejemplo.com</Text>
      </View>

      <FlatList
        data={menuItems}
        contentContainerStyle={{ paddingBottom: 10 }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Pressable style={styles.menuButton}>
            <FontAwesome name={item.icon} size={24} style={styles.icon} />
            <Text style={styles.buttonText}>{item.label}</Text>
          </Pressable>
        )}
      />

      <View style={styles.logoutSection}>
        <Pressable style={styles.logoutButton}>
          <FontAwesome name="sign-out" size={20} style={styles.logoutIcon} />
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    top: 0,
    height: height,
    width: SIDE_MENU_WIDTH,
    elevation: 5,
    paddingHorizontal: "10%",
    paddingBottom: 40,
    display: "flex",
    backgroundColor: colorsTheme.darkGreen,
    borderRadius: 5,
    opacity: 0.9,
  },
  avatarSection: {
    height: AVATAR_SECTION_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorsTheme.white,
  },
  email: {
    fontSize: 14,
    color: colorsTheme.white,
  },
  menuButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: BUTTON_HEIGHT,
    borderRadius: 5,
  },
  icon: {
    marginRight: 15,
    color: colorsTheme.white,
  },
  buttonText: {
    fontSize: 16,
    color: colorsTheme.white,
  },
  logoutSection: {
    backgroundColor: colorsTheme.white,
    opacity: 0.8,
    display: "flex",
    height: BUTTON_HEIGHT,
    borderRadius: 5,
    justifyContent: "center",
  },
  logoutButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutIcon: {
    marginRight: 15,
    color: colorsTheme.darkGreen,
    position: "absolute",
    left: 15,
  },
  logoutButtonText: {
    fontSize: 16,
    color: colorsTheme.darkGreen,
  },
});

export default SideMenu;
