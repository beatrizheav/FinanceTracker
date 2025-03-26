import React from "react";
import { render, screen } from "@testing-library/react-native";
import ExpensesChart from "../ExpensesChart"; // Ajusta la ruta
import { PieChart } from "react-native-chart-kit"; // Asegúrate de importar PieChart directamente
import { categories } from "../../constants/categories";

// Mock de PieChart
jest.mock("react-native-chart-kit", () => ({
  PieChart: jest.fn(() => null), // Esto asegura que PieChart es una función mockeada que retorna null
}));

describe("ExpensesChart", () => {
  it("should render the title correctly", () => {
    render(<ExpensesChart />);

    // Verifica si el título 'Distribución de gastos' está presente
    expect(screen.getByText("Distribución de gastos")).toBeTruthy();
  });

  it("should render the correct number of legend items", () => {
    render(<ExpensesChart />);

    // Verifica si la cantidad de elementos en la leyenda corresponde a las 5 categorías principales más 'Otros'
    expect(screen.getAllByText(/^[a-zA-Z]/).length).toBe(7); // 5 categorías + "Otros"
  });

  it("should render a pie chart with correct data", () => {
    render(<ExpensesChart />);

    // Verifica si el gráfico PieChart ha sido llamado
    expect(PieChart).toHaveBeenCalledTimes(1); // Asegura que PieChart ha sido renderizado una vez

    // Verifica que PieChart haya sido llamado con los datos esperados
    expect(PieChart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            totalExpenses: expect.any(Number),
          }),
        ]),
      }),
      expect.anything()
    );
  });
});
