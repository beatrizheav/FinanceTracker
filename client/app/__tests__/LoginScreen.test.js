import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen from "../loginScreen";

jest.mock("expo-router", () => ({
  Link: ({ children }) => children,
}));

// Ensure alert is mocked before tests
beforeAll(() => {
  global.alert = jest.fn();
});

describe("LoginScreen", () => {
  it("should render the main elements", () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    expect(getByText("Bienvenido a \nFinance Tracker!")).toBeTruthy();
    expect(
      getByText("Lleva el control de tus finanzas desde tu celular")
    ).toBeTruthy();
    expect(getByPlaceholderText("Ingresa tu correo electronico")).toBeTruthy();
    expect(getByPlaceholderText("Ingresa tu contrasena")).toBeTruthy();
    expect(getByText("Iniciar Sesion")).toBeTruthy();
  });

  it("should allow entering data into input fields", () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText("Ingresa tu correo electronico");
    const passwordInput = getByPlaceholderText("Ingresa tu contrasena");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password123");
  });

  it("should execute handleSubmit when pressing the button", () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText("Ingresa tu correo electronico");
    const passwordInput = getByPlaceholderText("Ingresa tu contrasena");
    const button = getByText("Iniciar Sesion");

    // Fill in the form to pass validation
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    fireEvent.press(button);
    expect(global.alert).toHaveBeenCalledWith("Able to log in");
  });
});
