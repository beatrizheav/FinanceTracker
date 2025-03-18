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
    iconBackground: {
        padding: 13,
        borderRadius: 50,  
    },
    description: {
        marginLeft: 8,
    },
    iconForward: {
        marginRight: -7,
    }
})