import React, { useRef, useEffect } from "react";
import {
  View,
  Image,
  Pressable,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colorsTheme } from "../styles/colorsTheme";
import { offset, SIDE_MENU_WIDTH } from "../constants/sideMenuSizes";
import CustomText from "./CustomText";
import { sideMenu } from "../styles/components/side-menu";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const menuItems = [
  { key: "1", icon: "home", label: "Inicio", route: "/home" },
  { key: "2", icon: "credit-card", label: "Gastos", route: "/expenses" },
  { key: "3", icon: "dollar", label: "Ingresos", route: "/Incomes" },
  { key: "4", icon: "folder-o", label: "Categorias", route: "/categories" },
];

const SideMenu = ({ visible, setMenuVisible }) => {
  const slideAnim = useRef(new Animated.Value(-SIDE_MENU_WIDTH)).current;
  const router = useRouter();

  const handleMenuNavigation = (route) => {
    setMenuVisible(false);
    router.push(route);
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () => {
            router.replace("/login");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

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
              <AntDesign name="close" size={30} color={colorsTheme.white} />
            </Pressable>

            <View style={sideMenu.avatarSection}>
              <Image
                source={require("../assets/avatars/3.png")}
                style={sideMenu.avatar}
              />
              <CustomText
                text={"Nombre de Usuario"}
                type={"TitleMedium"}
                color={colorsTheme.white}
              />
              <CustomText
                text={"correo@ejemplo.com"}
                type={"TextBig"}
                color={colorsTheme.white}
              />
            </View>

            <FlatList
              data={menuItems}
              contentContainerStyle={{ paddingBottom: 10 }}
              scrollEnabled={false}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleMenuNavigation(item.route)}
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
                      <CustomText
                        text={item.label}
                        type={"TextBig"}
                        color={
                          pressed ? colorsTheme.darkGreen : colorsTheme.white
                        }
                      />
                    </>
                  )}
                </Pressable>
              )}
            />

            <View style={sideMenu.logoutSection}>
              <Pressable
                onPress={handleLogout}
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
                    <CustomText
                      text={"Cerrar sesión"}
                      type={"TextBig"}
                      color={
                        pressed ? colorsTheme.white : colorsTheme.darkGreen
                      }
                    />
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
