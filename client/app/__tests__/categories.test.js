import { render, fireEvent } from "@testing-library/react-native";
import Categories from "../categories"; // Adjusted import path
import React from "react";

jest.mock('@expo/vector-icons', () => ({
  Ionicons: (props) => <div {...props} />,
}));

jest.mock('../../components/Header', () => {
  const { Text } = require('react-native');
  return ({title}) => (
      <Text>{title}</Text>
  )
});

jest.mock('../../components/ActivityDisplay', () => {
  const { Text } = require('react-native');
  return ({ name, onPress }) => (
      <Text  onPress={onPress} testID="mock-category-item">{name}</Text>
  )
});

jest.mock('../../components/AddButton', () => {
  const { Text } = require('react-native');
  return ({ onPress }) => (
  <Text onPress={onPress}>Add Button</Text>)
});

jest.mock('../../components/CustomButton', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return ({ onPress, title }) => (
      <TouchableOpacity onPress={onPress} testID={`button-${title}`}>
      <Text>{title}</Text>
      </TouchableOpacity>
  );
});

jest.mock('../../components/ModalCategory', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
return ({ onEdit }) => (
  <View>
      <Text>ModalCategory</Text>
          <TouchableOpacity onPress={onEdit}>
          <Text>Editar</Text>
      </TouchableOpacity>
</View>
);
});

jest.mock('../../components/BSCategory', () => {
  const { Text } = require('react-native');
  return () => <Text>BSCategory</Text>;
});

const mockCategoriesData = [
  {
    categoryId: 1,
    name: "Alimentación",
    description: "Gastos relacionados con comida y bebidas.",
    budget: 500,
    totalExpenses: 400,
    color: "#FF6347",
    icon: {
      iconName: "fast-food-outline",
      iconSet: "Ionicons",
    },
  },
  {
    categoryId: 2,
    name: "Transporte",
    description: "Gastos relacionados con transporte público, gasolina, etc.",
    budget: 200,
    totalExpenses: 150,
    color: "#4682B4",
    icon: {
      iconName: "car-sport-outline",
      iconSet: "Ionicons",
    },
  }
]

const mockEmptyData = [];



describe("Categories Screen", () => {
  it('renders header and AddButton', () => {
    const { getByText } = render(<Categories/>);
    expect(getByText('Categorías')).toBeTruthy();
    expect(getByText('Add Button')).toBeTruthy();
  });

  it('opens ModalCategory when pressing on a category item', () => {
    const { getAllByTestId, getByText } = render(<Categories data={mockCategoriesData}/>); 
    fireEvent.press(getAllByTestId('mock-category-item')[0]);

    expect(getByText('ModalCategory')).toBeTruthy();
  });

  it('opens BSCategory when pressing edit from ModalCategory', () => {
    const { getAllByTestId, getByText } = render(<Categories data={mockCategoriesData} />);
    
    fireEvent.press(getAllByTestId('mock-category-item')[0]);
  
    const editar = getByText('Editar');
    fireEvent.press(editar);
  
    expect(getByText('BSCategory')).toBeTruthy();
  });

  it('shows empty message when no data', () => {
    const { getByText } = render(<Categories data={mockEmptyData}/>);

    expect(getByText('No tienes ninguna Categoría creada todavía')).toBeTruthy();
  
  });

  it('opens BSCategory when AddButton is pressed', () => {
    const { getByText } = render(<Categories />);
    
    const addButton = getByText('Add Button');
    fireEvent.press(addButton);
    
    expect(getByText('BSCategory')).toBeTruthy();
  });

});
