import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import BSCategory from "../BSCategory";

jest.mock("react-native-raw-bottom-sheet", () => {
  return jest.fn().mockImplementation(({ children }) => children);
});

jest.mock("../../hooks/handleInputChange", () => ({
  handleInputChange: jest.fn((setState, key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }),
}));

describe("BSCategory Component", () => {
  const mockSetVisible = jest.fn();
  const mockCategory = {
    name: "Comida",
    budget: "1000",
    color: "#ff0000",
    icon: "food",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with initial props", () => {
    const { getByText, getByPlaceholderText } = render(
      <BSCategory visible={true} setVisible={mockSetVisible} />
    );

    expect(getByText("Categoría")).toBeTruthy();
    expect(
      getByPlaceholderText("Ingresa el nombre de la categoría")
    ).toBeTruthy();
    expect(
      getByPlaceholderText("Ingresa el presupuesto de la categoría")
    ).toBeTruthy();
    expect(getByText("Agregar categoría")).toBeTruthy();
  });

  it("renders with edit mode and populates fields", () => {
    const { getByDisplayValue, getByText } = render(
      <BSCategory
        visible={true}
        setVisible={mockSetVisible}
        edit={true}
        category={mockCategory}
      />
    );

    expect(getByDisplayValue("Comida")).toBeTruthy();
    expect(getByDisplayValue("1000")).toBeTruthy();
    expect(getByText("Guardar cambios")).toBeTruthy();
  });

  it("updates category name on input change", () => {
    const { getByPlaceholderText } = render(
      <BSCategory visible={true} setVisible={mockSetVisible} />
    );

    const nameInput = getByPlaceholderText("Ingresa el nombre de la categoría");
    fireEvent.changeText(nameInput, "Transporte");

    expect(nameInput.props.value).toBe("Transporte");
  });

  it("calls setVisible when the sheet closes", () => {
    const { unmount } = render(
      <BSCategory visible={true} setVisible={mockSetVisible} />
    );

    unmount();
    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });

  it("disables dragging when modals are open", async () => {
    const { getByTestId } = render(
      <BSCategory visible={true} setVisible={mockSetVisible} />
    );

    const colorPicker = getByTestId("color-picker");
    fireEvent.press(colorPicker);

    await waitFor(() => {
      expect(mockSetVisible).not.toHaveBeenCalled();
    });
  });

  it("renders the correct button text for add vs. edit mode", () => {
    const { getByText, rerender } = render(
      <BSCategory visible={true} setVisible={mockSetVisible} />
    );

    expect(getByText("Agregar categoría")).toBeTruthy();

    rerender(
      <BSCategory
        visible={true}
        setVisible={mockSetVisible}
        edit={true}
        category={mockCategory}
      />
    );

    expect(getByText("Guardar cambios")).toBeTruthy();
  });
});
