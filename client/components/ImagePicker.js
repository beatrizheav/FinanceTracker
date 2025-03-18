import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { inputs } from "../styles/components/inputs";
import { fontsTheme } from "../styles/fontsTheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colorsTheme } from "../styles/colorsTheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

const ImageModal = ({ image, setShowImage }) => (
  <Modal>
    <CloseButton onClose={() => setShowImage(false)} />
    <Image source={{ uri: image }} style={styles.imageViewModal} />
  </Modal>
);

const PermissionRequest = ({ message, onRequest }) => (
  <Modal>
    <View style={{ height: "50%", width: "100%", backgroundColor: "red" }}>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={onRequest} title="Conceder Permiso" />
    </View>
  </Modal>
);

const CloseButton = ({ onClose }) => (
  <View
    style={[
      styles.overlayTop,
      Platform.OS === "android"
        ? styles.overlayTopAndroid
        : styles.overlayTopiOS,
    ]}
  >
    <TouchableOpacity style={styles.button} onPress={onClose}>
      <AntDesign name="close" size={25} color={colorsTheme.mediumGray} />
    </TouchableOpacity>
  </View>
);

const CameraControls = ({ onFlip, onCapture, onPickImage, cameraRef }) => (
  <View
    style={[
      styles.overlayBottom,
      Platform.OS === "android"
        ? styles.overlayBottomAndroid
        : styles.overlayBottomiOS,
    ]}
  >
    <TouchableOpacity style={styles.button} onPress={onFlip}>
      <MaterialIcons
        name="flip-camera-android"
        size={25}
        color={colorsTheme.mediumGray}
      />
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.buttonTakePicture}
      onPress={() => onCapture(cameraRef.current)}
    >
      <FontAwesome name="circle" size={70} color={colorsTheme.white} />
    </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={onPickImage}>
      <Entypo name="images" size={25} color={colorsTheme.mediumGray} />
    </TouchableOpacity>
  </View>
);

const ImagePickerModal = ({ setShow, setImage }) => {
  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [galleryPermission, setGalleryPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(status === "granted");
    };
    getPermissions();
  }, []);

  if (!permission || galleryPermission === null) return <View />;

  if (!permission.granted) {
    return (
      <PermissionRequest
        message="Necesitamos tu permiso para acceder a la cámara."
        onRequest={requestPermission}
      />
    );
  }

  if (!galleryPermission) {
    return (
      <PermissionRequest
        message="Necesitamos tu permiso para acceder a la galería."
        onRequest={() => ImagePicker.requestMediaLibraryPermissionsAsync()}
      />
    );
  }

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const takePicture = async (camera) => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  const savePicture = () => {
    setImage(photo);
    setShow(false);
  };

  const takeNewPhoto = () => {
    setPhoto(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    const uri = result.assets?.[0]?.uri;
    if (!result.canceled && uri) {
      setPhoto(uri);
    }
  };

  return (
    <Modal>
      <View style={styles.container}>
        <CloseButton onClose={() => setShow(false)} />

        {photo ? (
          <View style={styles.container}>
            <Image source={{ uri: photo }} style={styles.preview} />
            <View
              style={[
                styles.overlayBottom,
                Platform.OS === "android"
                  ? styles.overlayBottomAndroid
                  : styles.overlayBottomiOS,
              ]}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonLarge]}
                onPress={takeNewPhoto}
              >
                <Text style={[fontsTheme.TextBig, styles.textButton]}>
                  Nueva Foto
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonLarge]}
                onPress={savePicture}
              >
                <Text style={[fontsTheme.TextBig, styles.textButton]}>
                  Guardar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <CameraControls
              onFlip={toggleCameraFacing}
              onCapture={takePicture}
              onPickImage={pickImage}
              cameraRef={cameraRef}
            />
          </CameraView>
        )}
      </View>
    </Modal>
  );
};

const ImagePickerComponent = ({ image, setImage }) => {
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);

  return (
    <View style={inputs.wrapper}>
      <Text style={fontsTheme.TitleSmall}>Agrega un recibo</Text>
      <TouchableOpacity
        style={[inputs.container, styles.inputContainer]}
        onPress={() => (image ? null : setShow(true))}
      >
        {image ? (
          <TouchableOpacity
            style={styles.imagePreviewContainer}
            onPress={() => setShowImage(true)}
          >
            <Image source={{ uri: image }} style={styles.imagePreview} />
          </TouchableOpacity>
        ) : (
          <View>
            <FontAwesome
              name="image"
              size={30}
              style={styles.iconSelectImage}
            />
            <Text style={fontsTheme.TextSmall}>Selecciona una imagen</Text>
          </View>
        )}
      </TouchableOpacity>
      {image && (
        <TouchableOpacity
          style={styles.editButtonContainer}
          onPress={() => setShow(true)}
        >
          <Text style={fontsTheme.TitleSmall}>Editar</Text>
        </TouchableOpacity>
      )}
      {showImage && <ImageModal image={image} setShowImage={setShowImage} />}
      {show && <ImagePickerModal setShow={setShow} setImage={setImage} />}
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
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
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorsTheme.black,
    borderRadius: 30,
  },
  buttonLarge: {
    width: 150,
    height: 40,
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
});
