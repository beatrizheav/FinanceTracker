import React from "react";
import { render, fireEvent, act, rere } from "@testing-library/react-native";
import CustomInput from "../CustomInput";

describe("CustomInput", () => {
  it("should render correctly with a label and placeholder", () => {
    const { getByText, getByPlaceholderText } = render(
      <CustomInput
        label="Test Label"
        placeholder="Enter text"
        value=""
        onChange={() => {}}
        type="text"
      />
    );

    expect(getByText("Test Label")).toBeTruthy();
    expect(getByPlaceholderText("Enter text")).toBeTruthy();
  });

  it("should handle text input changes", () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomInput
        label="Test Label"
        placeholder="Enter text"
        value=""
        onChange={onChangeMock}
        type="text"
      />
    );

    const input = getByPlaceholderText("Enter text");
    fireEvent.changeText(input, "Hello");

    expect(onChangeMock).toHaveBeenCalledWith("Hello");
  });

  it("should toggle password visibility when the eye icon is pressed", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <CustomInput
        label="Password"
        placeholder="Enter password"
        value=""
        onChange={() => {}}
        type="password"
      />
    );

    const input = getByPlaceholderText("Enter password");
    const eyeIcon = getByTestId("eye-icon");

    // Initially, password should be hidden
    expect(input.props.secureTextEntry).toBe(true);

    // Press the eye icon to toggle visibility
    act(() => {
      fireEvent.press(eyeIcon);
    });
    expect(input.props.secureTextEntry).toBe(false);

    // Press again to hide the password
    act(() => {
      fireEvent.press(eyeIcon);
    });
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("should render the correct keyboardType for email", () => {
    const { getByPlaceholderText } = render(
      <CustomInput
        label="Email"
        placeholder="Enter email"
        value=""
        onChange={() => {}}
        type="email"
      />
    );

    const input = getByPlaceholderText("Enter email");
    expect(input.props.keyboardType).toBe("email-address");
  });

  it("should render the correct keyboardType for number", () => {
    const { getByPlaceholderText } = render(
      <CustomInput
        label="Amount"
        placeholder="Enter amount"
        value=""
        onChange={() => {}}
        type="number"
      />
    );

    const input = getByPlaceholderText("Enter amount");
    expect(input.props.keyboardType).toBe("number-pad");
  });

  it("should render the correct keyboardType for text", () => {
    const { getByPlaceholderText } = render(
      <CustomInput
        label="Amount"
        placeholder="Enter amount"
        value=""
        onChange={() => {}}
        type="text"
      />
    );

    const input = getByPlaceholderText("Enter amount");
    expect(input.props.keyboardType).toBe("default");
  });

  it("should render the correct keyboardType for password", () => {
    const { getByPlaceholderText } = render(
      <CustomInput
        label="Amount"
        placeholder="Enter amount"
        value=""
        onChange={() => {}}
        type="password"
      />
    );

    const input = getByPlaceholderText("Enter amount");
    expect(input.props.keyboardType).toBe("default");
  });

  it("should render the correct keyboardType for paragraph", () => {
    const { getByPlaceholderText } = render(
      <CustomInput
        label="Amount"
        placeholder="Enter amount"
        value=""
        onChange={() => {}}
        type="paragraph"
      />
    );

    const input = getByPlaceholderText("Enter amount");
    expect(input.props.keyboardType).toBe("default");
  });

  it("should render the keyboardType default when no type is provided", () => {
    const { getByPlaceholderText } = render(
      <CustomInput
        label="Amount"
        placeholder="Enter amount"
        value=""
        onChange={() => {}}
      />
    );

    const input = getByPlaceholderText("Enter amount");
    expect(input.props.keyboardType).toBe("default");
  });
});
