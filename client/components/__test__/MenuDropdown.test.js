import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MenuDropdown from '../MenuDropdown';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: jest.fn().mockReturnValue(null),
    MaterialIcons: jest.fn().mockReturnValue(null),
    SimpleLineIcons: jest.fn().mockReturnValue(null),
  }));

describe('MenuDropdown Component', () => {
  let setIsActiveAddButtonMock, setIsActiveMenuDropdownMock;

  beforeEach(() => {
    setIsActiveAddButtonMock = jest.fn();
    setIsActiveMenuDropdownMock = jest.fn();
  });

  test('renders menu items correctly', () => {
    const { getByText } = render(
      <MenuDropdown 
        setIsActiveAddButton={setIsActiveAddButtonMock} 
        setIsActiveMenuDropdown={setIsActiveMenuDropdownMock} 
      />
    );

    expect(getByText('Gasto')).toBeTruthy();
    expect(getByText('Ingreso')).toBeTruthy();
    expect(getByText('Categoria')).toBeTruthy();
  });

  test('calls handleNavigation when an option is pressed', () => {
    const setIsActiveAddButtonMock = jest.fn();
    const setIsActiveMenuDropdownMock = jest.fn();
    const { getByText } = render(
      <MenuDropdown 
        setIsActiveAddButton={setIsActiveAddButtonMock} 
        setIsActiveMenuDropdown={setIsActiveMenuDropdownMock} 
      />
    );

    fireEvent.press(getByText('Gasto'));
    fireEvent.press(getByText('Ingreso'));
    fireEvent.press(getByText('Categoria'));
    expect(setIsActiveAddButtonMock).toHaveBeenCalledWith(false);
    expect(setIsActiveMenuDropdownMock).toHaveBeenCalledWith(false);
  });

  test('closes menu when clicking outside', () => {
    const setIsActiveAddButtonMock = jest.fn();
    const setIsActiveMenuDropdownMock = jest.fn();
    const { getByTestId } = render(
      <MenuDropdown 
        setIsActiveAddButton={setIsActiveAddButtonMock} 
        setIsActiveMenuDropdown={setIsActiveMenuDropdownMock} 
      />
    );

    fireEvent.press(getByTestId('menu-overlay'));
    expect(setIsActiveAddButtonMock).toHaveBeenCalledWith(false);
    expect(setIsActiveMenuDropdownMock).toHaveBeenCalledWith(false);
  });
});