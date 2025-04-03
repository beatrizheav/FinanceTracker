import { render } from "@testing-library/react-native";
import CategoriesScreen from "../../app/categories"; // Adjusted import path
import React from "react";

// Mock Header to avoid using usePathname
jest.mock("../../components/Header", () => {
  return function MockHeader() {
    return null; // Simple mock that does nothing
  };
});

describe("CategoriesScreen", () => {
  it("should render without crashing", () => {
    render(<CategoriesScreen />);

    // Check if CategoriesScreen renders without crashing
    expect(true).toBeTruthy(); // Placeholder simple check
  });
});
