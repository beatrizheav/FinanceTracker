import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SideMenu from "../SideMenu";

jest.mock("@expo/vector-icons", () => ({
  FontAwesome: ({ name }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return <Text>Icon: {name}</Text>;
  },
}));

describe("SideMenu component", () => {
  const onCloseMock = jest.fn();

  it("should render correctly when visible", () => {
    const { getByText } = render(
      <SideMenu visible={true} onClose={onCloseMock} />
    );
    expect(getByText("Nombre de Usuario")).toBeTruthy();
    expect(getByText("correo@ejemplo.com")).toBeTruthy();
  });

  it("should call onClose when close button is pressed", () => {
    const { getByText } = render(
      <SideMenu visible={true} onClose={onCloseMock} />
    );
    fireEvent.press(getByText("Icon: close"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("should not render when not visible", () => {
    const { queryByText } = render(
      <SideMenu visible={false} onClose={onCloseMock} />
    );
    expect(queryByText("Nombre de Usuario")).toBeNull();
  });
});
