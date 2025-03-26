import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const activityDisplay = StyleSheet.create({
    container: {
        paddingVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: colorsTheme.lightGray
    },
    format: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    description: {
        marginLeft: 8,
    },
    iconForward: {
        marginRight: -7,
    },
    darkGray: {
        color: colorsTheme.darkGray
    },
    green: {
        color: colorsTheme.lightGreen
    },
    red: {
        color: colorsTheme.red
    },
    teal: {
        color: colorsTheme.teal
    }
})