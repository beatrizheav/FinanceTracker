import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import DropdownSelect from "../DropdownSelect"; // Update this to the actual path
import { data } from "../../constants/categoryData"; // Make sure this is the same import as in your component

describe("DropdownSelect", () => {
  const mockSetValue = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to ensure isolated tests
  });

  test("renders correctly with the provided label", () => {
    const { getByText } = render(
      <DropdownSelect label="Category" value={null} setValue={mockSetValue} />
    );

    // Check if the label is rendered
    expect(getByText("Category")).toBeTruthy();
  });

  test("renders the placeholder correctly when not focused", () => {
    const { getByText } = render(
      <DropdownSelect label="Category" value={null} setValue={mockSetValue} />
    );

    // Check that the placeholder text is rendered as expected
    expect(getByText("Select item")).toBeTruthy();
  });

  it("should update value and focus state when an item is selected", async () => {
    const setValue = jest.fn();
    const { getByTestId, getByText } = render(
      <DropdownSelect label="Category" value="" setValue={setValue} />
    );

    const dropdown = getByTestId("dropdown-select");

    // Simula el enfoque en el dropdown
    fireEvent.press(dropdown);

    // Simula la selección de un item
    const item = { value: "1", label: "Option 1" }; // Asegúrate de que este valor exista en `data`
    fireEvent(dropdown, "onChange", item);

    // Espera que setValue haya sido llamado con el valor correcto
    await waitFor(() => {
      expect(setValue).toHaveBeenCalledWith(item.value);
    });
  });

  test("renders the chevron icon correctly", async () => {
    const { queryByTestId } = render(
      <DropdownSelect label="Category" value={null} setValue={mockSetValue} />
    );

    // Wait for the chevron icon to be rendered
    await waitFor(() => {
      const chevronIcon = queryByTestId("chevron-icon");
      expect(chevronIcon).toBeTruthy();
    });
  });

  test("updates placeholder text when focused", () => {
    const { getByText, getByTestId } = render(
      <DropdownSelect label="Category" value={null} setValue={mockSetValue} />
    );

    // Focus the dropdown
    fireEvent.press(getByTestId("dropdown-select"));

    // Check that the placeholder changes to '...'
    expect(getByText("...")).toBeTruthy();
  });

  test("does not call setValue when item is not selected", async () => {
    const { getByText, getByTestId, queryByText } = render(
      <DropdownSelect label="Category" value={null} setValue={mockSetValue} />
    );

    // Open the dropdown
    fireEvent.press(getByTestId("dropdown-select"));

    // Wait for the options to render, but do not select any item
    await waitFor(() => queryByText(data[0].label));

    // Simulate closing the dropdown by pressing outside (or by clicking away, depending on implementation)
    fireEvent.press(getByTestId("dropdown-select"));

    // Ensure setValue is not called since no item is selected
    expect(mockSetValue).not.toHaveBeenCalled();
  });
});
