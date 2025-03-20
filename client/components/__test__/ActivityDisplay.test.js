import React from 'react';
import { render } from '@testing-library/react-native';
import ActivityDisplay from '../ActivityDisplay';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Mock para evitar errores con Iconos
jest.mock('@expo/vector-icons', () => ({
    Ionicons: ({ name, size, color, testID }) => (
        <mock-Ionicons testID={testID} name={name} size={size} color={color} />
      ),
}));

describe('ActivityDisplay Component', () => {
  const mockProps = {
    title: 'Compra',
    date: new Date(2024, 2, 15),
    quantity: 150.75,
    icon: { iconName: 'cart', iconSet: 'Ionicons' },
    screen: 'expense',
    color: '#ff5733',
  };

  test('renders correctly with given props', () => {
    const { getByText } = render(<ActivityDisplay {...mockProps} />);
    expect(getByText('Compra')).toBeTruthy();
    expect(getByText(format(mockProps.date, "dd 'de' MMMM yyyy", { locale: es }))).toBeTruthy();
    expect(getByText('- $ 150.75')).toBeTruthy();
  });

  test('renders default values when no props are provided', () => {
    const { getByText, getByTestId } = render(<ActivityDisplay />);
    expect(getByText('nombre no encontrado')).toBeTruthy();
    expect(getByText('fecha no encontrada')).toBeTruthy();
    expect(getByTestId('default-icon')).toBeTruthy();
    expect(getByText('$ 0.00')).toBeTruthy();
  });

  test('renders correct quantity format for income screen', () => {
    const { getByText } = render(<ActivityDisplay {...mockProps} screen='income' />);
    expect(getByText('$ 150.75')).toBeTruthy();
  });

  test('renders correct quantity format for expense screen', () => {
    const { getByText } = render(<ActivityDisplay {...mockProps} screen='expense' />);
    expect(getByText('- $ 150.75')).toBeTruthy();
  });

  test('renders chevron-forward icon', () => {
    const { getByTestId } = render(<ActivityDisplay {...mockProps} />);
    expect(getByTestId('chevron-forward')).toBeTruthy();
  });
});