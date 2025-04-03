import React from "react";
import { Alert } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import Registration from "../registration";

jest.spyOn(Alert, "alert").mockImplementation(() => {}); // Mockear Alert.alert

jest.mock("../../hooks/handleInputChange", () => ({
  handleInputChange: jest.fn((setState, field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }),
}));

jest.mock("../../hooks/useFormValidation", () => {
  return jest.fn(() => jest.fn(() => true));
});

describe("Registration Screen", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Registration />);
    expect(getByText("Registrate")).toBeTruthy();
    expect(getByPlaceholderText("Luis")).toBeTruthy();
    expect(getByPlaceholderText("Ramirez")).toBeTruthy();
    expect(getByPlaceholderText("Ingresa tu correo electrónico")).toBeTruthy();
    expect(getByPlaceholderText("Ingresa una contraseña")).toBeTruthy();
    expect(getByPlaceholderText("Confirma tu contraseña")).toBeTruthy();
  });

  it("updates input fields on change", () => {
    const { getByPlaceholderText } = render(<Registration />);
    const nameInput = getByPlaceholderText("Luis");
    const emailInput = getByPlaceholderText("Ingresa tu correo electrónico");

    fireEvent.changeText(nameInput, "Juan");
    fireEvent.changeText(emailInput, "juan@example.com");

    expect(nameInput.props.value).toBe("Juan");
    expect(emailInput.props.value).toBe("juan@example.com");
  });

  it("calls handleSubmit when pressing the button", () => {
    const { getByText } = render(<Registration />);
    const button = getByText("Registrate");

    fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalledWith("Able to register");
  });
});
