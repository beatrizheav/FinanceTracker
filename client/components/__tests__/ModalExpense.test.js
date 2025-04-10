import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import ModalExpense from '../ModalExpense';

jest.mock('@expo/vector-icons', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return {
    Ionicons: ({ onPress, name, testID }) => (
      <TouchableOpacity onPress={onPress} testID={testID}>
        <Text>{name}</Text>
      </TouchableOpacity>
    ),
  AntDesign: jest.fn().mockReturnValue(null),
  FontAwesome: jest.fn().mockReturnValue(null),
  MaterialIcons: jest.fn().mockReturnValue(null),
  }
});

jest.mock('../ImagePicker', () => 'ImagePickerComponent');
jest.mock('../CustomButton', () => {
    const { TouchableOpacity, Text} = require('react-native');
  return ({onPress, title}) => 
        (<TouchableOpacity onPress={onPress} testID={`button-${title}`}>
            <Text>{title}</Text>
         </TouchableOpacity>);
  
});


// Mock Alert.alert
jest.spyOn(Alert, 'alert');

describe('ModalExpense Component', () => {
  const mockProps = {
    category: { name: 'Comida', color: '#ff0000', icon: { iconName: 'pizza', iconSet: 'Ionicons' } },
    name: 'Tacos al pastor',
    date: "2011-10-10T14:48:00",
    quantity: 200,
    description: 'Cena con amigos',
    image: 'fake-image-uri',
    userId: '1234',
    expenseId: '5678',
    onEdit: jest.fn(),
    setIsActiveModalExpense: jest.fn(),
  };

  it('renders modal with provided data', () => {
    const { getByText, getByDisplayValue } = render(<ModalExpense {...mockProps} />);
    expect(getByText('Comida')).toBeTruthy();
    expect(getByText('Tacos al pastor')).toBeTruthy();
    expect(getByText('- $ 200.00')).toBeTruthy();
    expect(getByDisplayValue('Cena con amigos')).toBeTruthy();
  });

  it('renders fallback values when category name and color are missing', () => {
    const { getByText } = render(
      <ModalExpense
        {...mockProps}
        category={{ icon: { iconName: 'alert-circle-sharp', iconSet: 'Ionicons' } }}
      />
    );
    expect(getByText('Categoria no encontrada')).toBeTruthy();
  });

  it('renders fallback value when name are missing', () => {
    const { getByText } = render(
      <ModalExpense
        {...mockProps}
        name={null}
      />
    );
    expect(getByText('Titulo no encontrado')).toBeTruthy();
  });

  it('renders fallback value when date are missing', () => {
    const { getByText } = render(
      <ModalExpense
        {...mockProps}
        date={null}
      />
    );
    expect(getByText('fecha no encontrada')).toBeTruthy();
  });

  it('renders fallback value when quantity are missing', () => {
    const { getByText } = render(
      <ModalExpense
        {...mockProps}
        quantity={null}
      />
    );
    expect(getByText('$ 0.00')).toBeTruthy();
  });

  it('calls close Modal when pressing overlay or close icon', () => {
    const { getAllByTestId, getByTestId } = render(<ModalExpense {...mockProps} />);

    fireEvent.press(getByTestId('close-icon'));
    expect(mockProps.setIsActiveModalExpense).toHaveBeenCalledWith(false);
    fireEvent.press(getByTestId('modal-overlay'));
    expect(mockProps.setIsActiveModalExpense).toHaveBeenCalledWith(false);
  });

  it('renders modal correctly without an image', () => {
    const { queryByTestId } = render(
      <ModalExpense
        {...mockProps}
        image={undefined}
      />
    );
  
    expect(queryByTestId('image-picker')).toBeNull();
  });


it('executes onPress of Alert when Eliminar is confirmed', () => {
  
    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
        if (Array.isArray(buttons)) {
          const eliminarButton = buttons.find(btn => btn.text === 'Eliminar');
          eliminarButton?.onPress(); 
        }
      });
  
    const { getByTestId } = render(<ModalExpense {...mockProps} visible={true} />);
    fireEvent.press(getByTestId('button-Eliminar'));
  
    expect(Alert.alert).toHaveBeenCalledWith('Gasto Eliminado');
    mockAlert.mockRestore();
  });

  it('calls handleEdit and logs expenseId', () => {
    const { getByTestId } = render(<ModalExpense {...mockProps} />);

    fireEvent.press(getByTestId('button-Editar'));
  });
});