import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const ImagePickerComponent = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  // Handle camera permissions
  useEffect(() => {
    const getPermissions = async () => {
      const galleryPermissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryPermissionResult.status === "granted");
    };
    getPermissions();
  }, []);

  // Handle camera permission loading
  if (!permission || galleryPermission === null) return <View />;

  // Ask for camera permission if not granted
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to access the camera.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Ask for gallery permission if not granted
  if (!galleryPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to access the gallery.
        </Text>
        <Button
          onPress={() => ImagePicker.requestMediaLibraryPermissionsAsync()}
          title="Grant Gallery Permission"
        />
      </View>
    );
  }

  // Toggle the camera's facing mode
  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  // Capture photo
  const takePicture = async (camera) => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  const takeNewPhoto = () => {
    setPhoto(null);
  };

  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // Correct usage
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    const uri = result.assets[0]?.uri;
    console.log(uri);

    if (!result.canceled) {
      setPhoto(uri);
    }
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.container}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <TouchableOpacity style={styles.button} onPress={takeNewPhoto}>
            <Text style={styles.text}>New Photo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          <View style={styles.overlay}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => takePicture(this.camera)}
            >
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={pickImage} // Open the gallery to pick an image
            >
              <Text style={styles.text}>Pick From Gallery</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  preview: {
    height: "60%",
    width: "80%",
    borderRadius: 10,
  },
});
