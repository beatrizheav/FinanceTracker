import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const addButton = StyleSheet.create({
    position: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 30,
    },
    background: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: colorsTheme.white,
    }
})
