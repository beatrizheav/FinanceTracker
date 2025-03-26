import React from "react";
import { render } from "@testing-library/react-native";
import * as Icon from "@expo/vector-icons";
import CategoryIcon from "../CategoryIcon";
import { colorsTheme } from "../../styles/colorsTheme";

describe("CategoryIcon Component", () => {
  const defaultProps = {
    type: "big",
    icon: { iconSet: "Ionicons", iconName: "home" },
    color: "#FF5733",
  };

  it("renders the correct icon with provided props", () => {
    const { getByTestId } = render(<CategoryIcon {...defaultProps} />);

    const icon = getByTestId("default-icon");

    expect(icon).toBeTruthy();
    expect(icon.props.children).toBe("home");
    expect(icon.props.color).toBe("#FF5733");
    expect(icon.props.size).toBe(50); // big size
  });

  it("renders with small size when type is 'small'", () => {
    const smallProps = { ...defaultProps, type: "small" };
    const { getByTestId } = render(<CategoryIcon {...smallProps} />);

    const icon = getByTestId("default-icon");
    expect(icon.props.size).toBe(30); // small size
  });

  it("renders with default icon when no icon is provided", () => {
    const noIconProps = { type: "big", color: "#FF5733" };
    const { getByTestId } = render(<CategoryIcon {...noIconProps} />);

    const icon = getByTestId("default-icon");
    expect(icon.props.children).toBe("alert-circle-sharp"); // default icon
    expect(icon.props.color).toBe("#FF5733");
  });

  it("renders with default color when no color is provided", () => {
    const noColorProps = { ...defaultProps, color: undefined };
    const { getByTestId } = render(<CategoryIcon {...noColorProps} />);

    const icon = getByTestId("default-icon");
    expect(icon.props.color).toBe(colorsTheme.red);
  });

  it("applies the correct background color with transparency", () => {
    const props = {
      type: "big",
      icon: { iconSet: "Ionicons", iconName: "home" },
      color: "#FF5733",
    };
    const { getByTestId } = render(<CategoryIcon {...props} />);

    const container = getByTestId("container-icon");

    // Busca el estilo de backgroundColor
    const backgroundColor = container.props.style.find(
      (s) => s.backgroundColor
    ).backgroundColor;

    expect(backgroundColor).toBe("#FF57331a");
  });

  it("renders with Ionicons by default if an unknown iconSet is provided", () => {
    const props = {
      type: "big",
      icon: { iconSet: null, iconName: "alert-circle-sharp" },
      color: "#FF5733",
    };
    const { getByTestId } = render(<CategoryIcon {...props} />);

    const icon = getByTestId("default-icon");

    // Validar el nombre del icono
    expect(icon.props.children).toBe("alert-circle-sharp");
    // Validar el color
    expect(icon.props.color).toBe(props.color);
    // Validar el tamaño
    expect(icon.props.size).toBe(50);
  });
});
