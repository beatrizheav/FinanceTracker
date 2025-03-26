import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ImagePickerComponent from "../ImagePicker";
import * as ImagePicker from "expo-image-picker";
import { CameraView } from "expo-camera";

jest.mock("expo-camera", () => ({
  CameraView: jest.fn(({ children }) => children),
  useCameraPermissions: jest.fn(() => [{ granted: true }, jest.fn()]),
}));

jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })
  ),
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({ canceled: false, assets: [{ uri: "mock-image-uri" }] })
  ),
}));

describe("ImagePickerComponent", () => {
  it("debe renderizar correctamente el componente", () => {
    const { getByText } = render(
      <ImagePickerComponent image={null} setImage={jest.fn()} />
    );
    expect(getByText("Agrega un recibo")).toBeTruthy();
    expect(getByText("Selecciona una imagen")).toBeTruthy();
  });

  it("debe mostrar la imagen seleccionada", () => {
    const { getByTestId } = render(
      <ImagePickerComponent image="mock-image-uri" setImage={jest.fn()} />
    );

    expect(getByTestId("image-preview")).toBeTruthy();
  });

  it("debe mostrar el botón de editar si hay una imagen", () => {
    const { getByText } = render(
      <ImagePickerComponent image="mock-image-uri" setImage={jest.fn()} />
    );

    expect(getByText("Editar")).toBeTruthy();
  });

  it("debe manejar permisos de la cámara", async () => {
    const requestPermissionMock = jest.fn();
    jest
      .spyOn(ImagePicker, "requestMediaLibraryPermissionsAsync")
      .mockResolvedValueOnce({
        status: "denied",
      });

    const { getByText } = render(
      <ImagePickerComponent image={null} setImage={jest.fn()} />
    );

    fireEvent.press(getByText("Selecciona una imagen"));

    await waitFor(() => {
      expect(
        getByText("Necesitamos tu permiso para acceder a la galería.")
      ).toBeTruthy();
    });
  });
});
