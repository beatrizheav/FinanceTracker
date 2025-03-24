import { StyleSheet } from "react-native";
import { colorsTheme } from "../colorsTheme";

export const imagePicker = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  camera: { flex: 1 },
  overlayBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: "center",
  },
  overlayBottomiOS: {
    bottom: 35,
  },
  overlayBottomAndroid: {
    bottom: 20,
  },
  overlayTop: {
    position: "absolute",

    right: 30,
    zIndex: 2,
    justifyContent: "space-between",
  },
  overlayTopAndroid: {
    top: 15,
  },
  overlayTopiOS: {
    top: 60,
  },
  button: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorsTheme.darkGreen,
    borderRadius: 30,
  },
  buttonTakePicture: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colorsTheme.white,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreviewContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  imagePreview: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
  },
  preview: {
    height: "450",
    width: "300",
    alignSelf: "center",
    borderRadius: 10,
  },
  inputContainer: {
    borderStyle: "dashed",
    height: 150,
    alignItems: "center",
  },
  editButtonContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingTop: 5,
  },
  textButton: {
    color: colorsTheme.mediumGray,
  },
  imageViewModal: {
    flex: 1,
  },
  iconSelectImage: {
    alignSelf: "center",
    color: colorsTheme.mediumGray,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
