import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../home";
import { incomesData } from "../../constants/incomesData";
import { expensesData } from "../../constants/expensesData";

// Mock para @grassper/react-native-icon-picker
jest.mock("@grassper/react-native-icon-picker", () => ({
  IconPicker: () => null,
}));

jest.mock("expo-router", () => ({
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: jest.fn().mockReturnValue(null),
  MaterialIcons: jest.fn().mockReturnValue(null),
  SimpleLineIcons: jest.fn().mockReturnValue(null),
}));

describe("HomeScreen", () => {
  it("renders correctly", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Actividad Reciente")).toBeTruthy();
  });

  it("displays recent activity sorted by date", () => {
    const { getByText } = render(<HomeScreen />);
    const sortedData = [...incomesData, ...expensesData].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    sortedData.slice(0, 10).forEach((item) => {
      expect(getByText(item.name)).toBeTruthy();
    });
  });

  it("opens and closes income and expense modals", () => {
    const { getByText, getByTestId } = render(<HomeScreen />);

    const mergeAndSortData = [...incomesData, ...expensesData]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    const incomeItem = getByText(mergeAndSortData[0].name);
    fireEvent.press(incomeItem);
    expect(getByTestId("modal-overlay")).toBeTruthy();

    fireEvent.press(getByTestId("close-icon"));
    expect(() => getByTestId("modal-overlay")).toThrow();

    const expenseItem = getByText(mergeAndSortData[9].name);
    fireEvent.press(expenseItem);
    expect(getByTestId("modal-overlay")).toBeTruthy();

    fireEvent.press(getByTestId("close-icon"));
    expect(() => getByTestId("modal-overlay")).toThrow();
  });

  it("should toggle MenuDropdown visibility when AddButton is pressed", () => {
    // Renderiza el componente
    const { getByTestId, queryByTestId } = render(<HomeScreen />);

    // Verifica que el MenuDropdown no esté visible al inicio
    expect(queryByTestId("menu-overlay")).toBeNull();

    // Encuentra el botón de agregar y simula un clic
    const addButton = getByTestId("add-button");
    fireEvent.press(addButton);

    // Verifica que el MenuDropdown ahora es visible
    expect(queryByTestId("menu-overlay")).not.toBeNull();

    // Simula otro clic para cerrar el menú
    fireEvent.press(addButton);

    // Verifica que el MenuDropdown ya no sea visible
    expect(queryByTestId("menu-overlay")).toBeNull();
  });

  it("should open the sheet when Edit is pressed for 'Ingreso'", () => {
    const { getByText, getByTestId } = render(<HomeScreen />);

    const mergeAndSortData = [...incomesData, ...expensesData]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    const incomeItem = getByText(mergeAndSortData[0].name);
    fireEvent.press(incomeItem);
    expect(getByTestId("modal-overlay")).toBeTruthy();

    fireEvent.press(getByText("Editar"));
    expect(() => getByTestId("BS-Income")).not.toBeNull();
  });

  it("should open the sheet when Edit is pressed for 'Gasto'", () => {
    const { getByText, getByTestId } = render(<HomeScreen />);

    const mergeAndSortData = [...incomesData, ...expensesData]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    const expenseItem = getByText(mergeAndSortData[9].name);
    fireEvent.press(expenseItem);
    expect(getByTestId("modal-overlay")).toBeTruthy();

    fireEvent.press(getByText("Editar"));
    expect(() => getByTestId("BS-Expense")).not.toBeNull();
  });
});
