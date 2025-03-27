import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import DatePicker from "../DatePicker";
import { Platform } from "react-native";
import { format } from "date-fns";

describe("DatePicker", () => {
  it("should open modal when TouchableOpacity is pressed", async () => {
    const { getByText, getByRole, findByText } = render(
      <DatePicker label="Pick a Date" date={new Date()} setDate={() => {}} />
    );

    // Verifica que el texto del botón "Select Date" no está en el modal al inicio
    expect(() => getByText("Select Date")).toThrow();

    // Simula el toque en el TouchableOpacity para abrir el modal
    fireEvent.press(getByRole("button"));

    // Verifica que el modal ahora está visible
    const selectDateText = await findByText("Select date");
    expect(selectDateText).toBeVisible();
  });

  it("hides the modal when 'Select Date' is pressed on iOS", async () => {
    Platform.OS = "ios";

    const mockSetDate = jest.fn();
    const { getByLabelText, getByText, queryByText, findByText } = render(
      <DatePicker label="Pick a date" date={new Date()} setDate={mockSetDate} />
    );

    // Abrir el modal
    fireEvent.press(getByLabelText("Open Date Picker"));
    const selectDateText = await findByText("Select date");
    expect(selectDateText).toBeVisible();

    // Cerrar el modal
    fireEvent.press(selectDateText); // Disparar el evento para cerrar el modal
    await waitFor(() => expect(queryByText("Select Date")).toBeNull()); // Esperar a que no esté presente
  });

  it("updates the date and hides the modal on Android", () => {
    Platform.OS = "android";

    const mockSetDate = jest.fn();
    const { getByLabelText, getByTestId, queryByTestId } = render(
      <DatePicker label="Pick a date" date={new Date()} setDate={mockSetDate} />
    );

    // Abrir el DatePicker
    fireEvent.press(getByLabelText("Open Date Picker"));

    // Simular selección de fecha
    const selectedDate = new Date(2025, 5, 15);
    fireEvent(getByTestId("date-picker"), "onChange", {
      nativeEvent: { timestamp: selectedDate.getTime() },
    });

    // Verificar que se actualizó la fecha
    expect(mockSetDate).toHaveBeenCalledWith(selectedDate);

    // Verificar que se oculta el modal
    expect(queryByTestId("date-picker")).toBeNull();
  });

  it("uses the provided date when selectedDate is undefined", () => {
    Platform.OS = "android";

    const mockSetDate = jest.fn();
    const currentDate = new Date(2025, 5, 15);

    const { getByLabelText, getByTestId } = render(
      <DatePicker
        label="Pick a date"
        date={currentDate}
        setDate={mockSetDate}
      />
    );

    fireEvent.press(getByLabelText("Open Date Picker"));

    fireEvent(getByTestId("date-picker"), "onChange", {
      nativeEvent: { timestamp: undefined },
    });

    expect(mockSetDate).toHaveBeenCalledWith(currentDate);
  });

  it("does not hide the modal on iOS after selecting a date", async () => {
    Platform.OS = "ios";

    const mockSetDate = jest.fn();
    const { getByLabelText, getByTestId, findByText } = render(
      <DatePicker label="Pick a date" date={new Date()} setDate={mockSetDate} />
    );

    fireEvent.press(getByLabelText("Open Date Picker"));

    const selectedDate = new Date(2025, 5, 15);
    fireEvent(getByTestId("date-picker"), "onChange", {
      nativeEvent: { timestamp: selectedDate.getTime() },
    });

    const selectDateText = await findByText("Select date");
    expect(selectDateText).toBeVisible();
  });

  it("displays 'Today' when the selected date is today", () => {
    const today = new Date();
    const { getByText } = render(
      <DatePicker label="Pick a date" date={today} setDate={jest.fn()} />
    );

    expect(getByText("Today")).toBeTruthy();
  });

  it("displays formatted date when the selected date is not today", () => {
    const customDate = new Date(2025, 5, 15);
    const formattedDate = format(customDate, "MMMM dd, yyyy");

    const { getByText } = render(
      <DatePicker label="Pick a date" date={customDate} setDate={jest.fn()} />
    );

    expect(getByText(formattedDate)).toBeTruthy();
  });
});
