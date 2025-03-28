import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colorsTheme } from "../styles/colorsTheme";
import { offset, SIDE_MENU_WIDTH } from "../constants/sideMenuSizes";
import { sideMenu } from "../styles/components/side-menu";

const menuItems = [
  { key: "1", icon: "home", label: "Inicio" },
  { key: "2", icon: "credit-card", label: "Gastos" },
  { key: "3", icon: "dollar", label: "Ingresos" },
  { key: "4", icon: "folder-o", label: "Categorias" },
];

const SideMenu = ({ visible, setMenuVisible }) => {
  const slideAnim = useRef(new Animated.Value(-SIDE_MENU_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: -offset,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SIDE_MENU_WIDTH,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
      <View style={sideMenu.backdrop}>
        <TouchableWithoutFeedback>
          <Animated.View style={[sideMenu.container, { right: slideAnim }]}>
            <Pressable
              style={sideMenu.closeButton}
              onPress={() => setMenuVisible(false)}
            >
              <FontAwesome name="close" size={30} color={colorsTheme.white} />
            </Pressable>

            <View style={sideMenu.avatarSection}>
              <Image
                source={require("../assets/avatars/3.png")}
                style={sideMenu.avatar}
              />
              <Text style={sideMenu.name}>Nombre de Usuario</Text>
              <Text style={sideMenu.email}>correo@ejemplo.com</Text>
            </View>

            <FlatList
              data={menuItems}
              contentContainerStyle={{ paddingBottom: 10 }}
              scrollEnabled={false}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    sideMenu.menuButton,
                    pressed && { backgroundColor: colorsTheme.white },
                  ]}
                >
                  {({ pressed }) => (
                    <>
                      <View style={sideMenu.iconContainer}>
                        <FontAwesome
                          name={item.icon}
                          size={24}
                          style={[
                            sideMenu.icon,
                            pressed && { color: colorsTheme.darkGreen },
                          ]}
                        />
                      </View>
                      <Text
                        style={[
                          sideMenu.buttonText,
                          pressed && { color: colorsTheme.darkGreen },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </>
                  )}
                </Pressable>
              )}
            />

            <View style={sideMenu.logoutSection}>
              <Pressable
                style={({ pressed }) => [
                  sideMenu.logoutButton,
                  pressed && { backgroundColor: colorsTheme.darkGreen },
                ]}
              >
                {({ pressed }) => (
                  <>
                    <FontAwesome
                      name="sign-out"
                      size={20}
                      style={[
                        sideMenu.logoutIcon,
                        pressed && { color: colorsTheme.white },
                      ]}
                    />
                    <Text
                      style={[
                        sideMenu.logoutButtonText,
                        pressed && { color: colorsTheme.white },
                      ]}
                    >
                      Cerrar sesión
                    </Text>
                  </>
                )}
              </Pressable>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SideMenu;
