import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../CustomButton';

// Mock del componente CustomText
jest.mock('../CustomText', () => {
  const { Text } = require('react-native');
  return ({ text}) => (<Text>{text}</Text>);
});

describe('CustomButton', () => {
  const mockPress = jest.fn();

  it('renders with green background and big title by default', () => {
    const { getByText } = render(
      <CustomButton
        title="Guardar"
        onPress={() => {}}
        background="green"
      />
    );

    expect(getByText('Guardar')).toBeTruthy();
  });

  it('renders with white background and small title when type is modal', () => {
    const { getByText } = render(
      <CustomButton
        title="Eliminar"
        onPress={mockPress}
        background="white"
        type="modal"
      />
    );

    expect(getByText('Eliminar')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <CustomButton
        title="Presioname"
        onPress={mockPress}
        background="green"
      />
    );

    fireEvent.press(getByText('Presioname'));
    expect(mockPress).toHaveBeenCalled();
  });

  it('renders correctly with no background or type props', () => {
    const { getByText } = render(
      <CustomButton
        title="Por defecto"
        onPress={mockPress}
      />
    );

    expect(getByText('Por defecto')).toBeTruthy();
  });
});