import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import ColorPickerComponent from "../ColorPicker";
import { waitFor } from "@testing-library/react-native";

jest.mock("@expo/vector-icons/AntDesign", () => "AntDesign");

describe("ColorPickerComponent", () => {
  it("opens and closes the color picker modal", () => {
    const mockSetColor = jest.fn();
    const { getByLabelText, getByText, queryByText } = render(
      <ColorPickerComponent color="#ff0000" setColor={mockSetColor} />
    );

    // Abrir el modal
    fireEvent.press(getByLabelText("Open Color Picker"));
    expect(getByText("Seleccionar color")).toBeTruthy();

    // Cerrar el modal
    fireEvent.press(getByText("Seleccionar color"));
    expect(queryByText("Seleccionar color")).toBeNull();
  });

  it("renders the plus icon when no color is provided", () => {
    const { getByLabelText } = render(
      <ColorPickerComponent color={null} setColor={jest.fn()} />
    );

    expect(getByLabelText("Open Color Picker")).toBeTruthy();
  });

  it("renders the circle with the correct background color", () => {
    const { getByLabelText, getByTestId } = render(
      <ColorPickerComponent color="#123456" setColor={jest.fn()} />
    );

    fireEvent.press(getByLabelText("Open Color Picker"));

    expect(getByTestId("color-circle").props.style[1].backgroundColor).toBe(
      "#123456"
    );
  });

  it("does not break when no initial color is provided", () => {
    const mockSetColor = jest.fn();
    const { getByLabelText } = render(
      <ColorPickerComponent color={undefined} setColor={mockSetColor} />
    );

    fireEvent.press(getByLabelText("Open Color Picker"));

    expect(getByLabelText("Open Color Picker")).toBeTruthy();
  });
});
