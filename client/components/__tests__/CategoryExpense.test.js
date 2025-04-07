import React from "react";
import { render } from "@testing-library/react-native";
import CategoryExpense from "../CategoryExpense";

describe("CategoryExpense Component", () => {
  const props = {
    name: "Food",
    icon: { iconName: "fast-food-outline", iconSet: "Ionicons" },
    budget: 1000,
    totalExpenses: 500,
    color: "#FF5733",
  };

  it("renders correctly with provided props", () => {
    const { getByText, getByTestId } = render(<CategoryExpense {...props} />);

    expect(getByText("Food")).toBeTruthy();
    expect(getByText("$500 de $1000")).toBeTruthy(); // CustomText

    const progressBar = getByTestId("progress-bar");
    expect(progressBar).toBeTruthy();
  });

  it("calculates and displays the correct progress", () => {
    const { getByTestId } = render(<CategoryExpense {...props} />);

    const progressBar = getByTestId("progress-bar");
    expect(progressBar.props.progress).toBe(0.5); // 500 / 1000
  });

  it("renders CategoryIcon with correct props", () => {
    const { getByTestId } = render(<CategoryExpense {...props} />);

    const icon = getByTestId("default-icon");

    expect(icon.props.children).toBe(props.icon.iconName);
    expect(icon.props.color).toBe(props.color);
    expect(icon.props.size).toBe(50);
  });

  it("handles zero budget without crashing", () => {
    const zeroBudgetProps = { ...props, budget: 0, totalExpenses: 500 };
    const { getByTestId } = render(<CategoryExpense {...zeroBudgetProps} />);

    const progressBar = getByTestId("progress-bar");
    expect(progressBar.props.progress).toBe(Infinity);
  });

  it("renders with zero expenses", () => {
    const zeroExpensesProps = { ...props, totalExpenses: 0 };
    const { getByText, getByTestId } = render(
      <CategoryExpense {...zeroExpensesProps} />
    );

    expect(getByText("$0 de $1000")).toBeTruthy();

    const progressBar = getByTestId("progress-bar");
    expect(progressBar.props.progress).toBe(0);
  });
});
