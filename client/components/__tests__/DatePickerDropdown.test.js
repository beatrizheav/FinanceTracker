import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import DatePickerDropdown from "../../components/DatePickerDropdown"; // adjust path if necessary
import { currentMonth, currentYear, months } from "../../constants/getDate";

describe("DatePickerDropdown Component", () => {
  it("renders correctly with default values", () => {
    const { getByText } = render(<DatePickerDropdown onChange={() => {}} />);

    // Check if current month and year are displayed
    expect(getByText(`${months[currentMonth]} ▼`)).toBeTruthy();
    expect(getByText(`${currentYear} ▼`)).toBeTruthy();
  });

  it("opens month dropdown and selects a month", async () => {
    const mockOnChange = jest.fn();
    const { getByText, queryByText } = render(
      <DatePickerDropdown onChange={mockOnChange} />
    );

    // Open month dropdown
    fireEvent.press(getByText(`${months[currentMonth]} ▼`));

    // Check if the month options are displayed
    expect(getByText(months[0])).toBeTruthy(); // Check if "January" is present, adjust based on language

    // Select a new month
    fireEvent.press(getByText(months[1])); // Selecting February

    // Check if onChange was called with the selected month and the current year
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        month: months[1], // February
        year: currentYear,
      });
    });
  });

  it("opens year dropdown and selects a year", async () => {
    const mockOnChange = jest.fn();
    const { getByText } = render(
      <DatePickerDropdown onChange={mockOnChange} />
    );

    // Open year dropdown
    fireEvent.press(getByText(`${currentYear} ▼`));

    // Select a future year
    const targetYear = currentYear + 1;
    fireEvent.press(getByText(targetYear.toString()));

    // Check if onChange was called with the selected year and current month
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        month: months[currentMonth],
        year: targetYear,
      });
    });
  });
});
