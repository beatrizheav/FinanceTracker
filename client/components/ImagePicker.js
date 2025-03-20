import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colorsTheme } from "../styles/colorsTheme";
import CustomButton from "./CustomButton";
import CustomText from "./CustomText";
import { imagePicker } from "../styles/components/image-picker";
import { inputs } from "../styles/components/inputs";
import { fontsTheme } from "../styles/fontsTheme";

const ImageModal = ({ image, setShowImage }) => (
  <Modal>
    <CloseButton onClose={() => setShowImage(false)} />
    <Image source={{ uri: image }} style={imagePicker.imageViewModal} />
  </Modal>
);

const CloseButton = ({ onClose }) => (
  <View
    style={[
      imagePicker.overlayTop,
      Platform.OS === "android"
        ? imagePicker.overlayTopAndroid
        : imagePicker.overlayTopiOS,
    ]}
  >
    <TouchableOpacity style={imagePicker.button} onPress={onClose}>
      <AntDesign name="close" size={25} color={colorsTheme.mediumGray} />
    </TouchableOpacity>
  </View>
);

const PermissionRequest = ({ message, onRequest }) => (
  <Modal>
    <View style={imagePicker.permissionContainer}>
      <CustomText type={"TitleSmall"} text={message} />
      <CustomButton
        title={"Conceder permiso"}
        background={"green"}
        type={"modal"}
        onPress={onRequest}
      />
    </View>
  </Modal>
);

const CameraControls = ({ onFlip, onCapture, onPickImage, cameraRef }) => (
  <View
    style={[
      imagePicker.overlayBottom,
      Platform.OS === "android"
        ? imagePicker.overlayBottomAndroid
        : imagePicker.overlayBottomiOS,
    ]}
  >
    <TouchableOpacity style={imagePicker.button} onPress={onFlip}>
      <MaterialIcons
        name="flip-camera-android"
        size={25}
        color={colorsTheme.mediumGray}
      />
    </TouchableOpacity>

    <TouchableOpacity
      style={imagePicker.buttonTakePicture}
      onPress={() => onCapture(cameraRef.current)}
    >
      <FontAwesome name="circle" size={70} color={colorsTheme.white} />
    </TouchableOpacity>

    <TouchableOpacity
      style={imagePicker.button}
      onPress={onPickImage}
      testID="pick-image-button"
    >
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
      <View style={imagePicker.container} testID="image-picker-modal">
        <CloseButton onClose={() => setShow(false)} />

        {photo ? (
          <View style={imagePicker.container}>
            <Image source={{ uri: photo }} style={imagePicker.preview} />
            <View
              style={[
                imagePicker.overlayBottom,
                Platform.OS === "android"
                  ? imagePicker.overlayBottomAndroid
                  : imagePicker.overlayBottomiOS,
              ]}
            >
              <TouchableOpacity
                style={[imagePicker.button, imagePicker.buttonLarge]}
                onPress={takeNewPhoto}
              >
                <Text style={[fontsTheme.TextBig, imagePicker.textButton]}>
                  Nueva Foto
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[imagePicker.button, imagePicker.buttonLarge]}
                onPress={savePicture}
              >
                <Text style={[fontsTheme.TextBig, imagePicker.textButton]}>
                  Guardar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <CameraView
            style={imagePicker.camera}
            facing={facing}
            ref={cameraRef}
          >
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

  const imageEditable = setImage ? true : false;

  return (
    <View style={inputs.wrapper}>
      <Text style={fontsTheme.TitleSmall}>Agrega un recibo</Text>
      <TouchableOpacity
        style={[inputs.container, imagePicker.inputContainer]}
        onPress={() => (image ? null : setShow(true))}
        testID="button-open-modal"
      >
        {image ? (
          <TouchableOpacity
            style={imagePicker.imagePreviewContainer}
            onPress={() => setShowImage(true)}
          >
            <Image
              source={{ uri: image }}
              style={imagePicker.imagePreview}
              testID="image-preview"
            />
          </TouchableOpacity>
        ) : (
          <View>
            <FontAwesome
              name="image"
              size={30}
              style={imagePicker.iconSelectImage}
            />
            <Text style={fontsTheme.TextSmall}>Selecciona una imagen</Text>
          </View>
        )}
      </TouchableOpacity>
      {image && imageEditable && (
        <TouchableOpacity
          style={imagePicker.editButtonContainer}
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
