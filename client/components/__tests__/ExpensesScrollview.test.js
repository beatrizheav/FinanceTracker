import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ExpensesScrollview from "../ExpensesScrollview";
import { categories } from "../../constants/categories";

jest.mock("react-native", () => {
  const RN = jest.requireActual("react-native");
  RN.Dimensions.get = jest.fn().mockReturnValue({ width: 400 }); // mock window width
  return RN;
});

describe("ExpensesScrollview", () => {
  it("should render correctly", () => {
    const { toJSON } = render(<ExpensesScrollview />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render the correct number of CategoryExpense components", () => {
    const { getAllByTestId } = render(<ExpensesScrollview />);
    const categoryExpenses = getAllByTestId("container-icon");
    expect(categoryExpenses.length).toBe(categories.length); // should match the number of categories
  });

  it("should calculate initialOffset correctly", () => {
    const { getByTestId } = render(<ExpensesScrollview />);
    const scrollView = getByTestId("expenses-scrollview");

    // You can validate the initial offset calculation here
    expect(scrollView.props.contentContainerStyle.paddingLeft).toBe(
      (400 - 340) / 2
    ); // check if offset calculation is correct
  });

  it("should render the ExpensesChart component", () => {
    const { getByTestId } = render(<ExpensesScrollview />);
    const chart = getByTestId("expenses-chart"); // Add a testID to ExpensesChart component
    expect(chart).toBeTruthy();
  });

  it("should allow horizontal scrolling", () => {
    const { getByTestId } = render(<ExpensesScrollview />);
    const scrollView = getByTestId("expenses-scrollview");

    fireEvent.scroll(scrollView, {
      nativeEvent: { contentOffset: { x: 100 } },
    });
    expect(scrollView.props.contentContainerStyle.paddingLeft).toBe(30);
  });
});
