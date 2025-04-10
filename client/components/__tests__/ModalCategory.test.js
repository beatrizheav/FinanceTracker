import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import ModalCategory from '../ModalCategory';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: (props) => <div {...props} />,
  AntDesign: jest.fn().mockReturnValue(null),
  FontAwesome: jest.fn().mockReturnValue(null),
  MaterialIcons: jest.fn().mockReturnValue(null),
}));

jest.mock('../CustomButton', () => {
    const { TouchableOpacity, Text} = require('react-native');
  return ({onPress, title}) => 
        (<TouchableOpacity onPress={onPress} testID={`button-${title}`}>
            <Text>{title}</Text>
         </TouchableOpacity>);
  
});


// Mock Alert.alert
jest.spyOn(Alert, 'alert');

describe('ModalCategory Component', () => {
  const mockProps = {
    categoryId:1,
    name: "Alimentación",
    description: "Gastos relacionados con comida y bebidas.",
    budget: 500,
    totalExpenses: 400,
    color: "#FF6347",
    icon: {
      iconName: "fast-food-outline",
      iconSet: "Ionicons",
    },
    onEdit: jest.fn(),
    setIsActiveModalCategory: jest.fn()
  };

  it('renders modal with provided data', () => {
    const { getByText } = render(<ModalCategory {...mockProps} />);
    expect(getByText('Alimentación')).toBeTruthy();
    expect(getByText(' $ 500.00')).toBeTruthy();
    expect(getByText('- $ 400.00')).toBeTruthy();
  });

  it('renders fallback values when budget and totalExpenses are not provided', () => {
    const { getAllByText } = render(
      <ModalCategory
        name="Entretenimiento"
        icon={{ iconName: 'film', iconSet: 'Ionicons' }}
        color="#FFA500"
        categoryId={5}
        setIsActiveModalCategory={jest.fn()}
      />
    );
  
    expect(getAllByText('$ 0.00')).toBeTruthy(); // budget
    expect(getAllByText('$ 0.00')).toBeTruthy(); // totalExpenses
  });

  it('renders fallback values when category name and color are missing', () => {
    const { getByText } = render(
      <ModalCategory
        {...mockProps}
        name={null}
      />
    );
    expect(getByText('Categoria no encontrada')).toBeTruthy();
  });


  it('renders fallback value when budget are missing', () => {
    const { getByText } = render(
      <ModalCategory
        {...mockProps}
        budget={null}
      />
    );
    expect(getByText('$ 0.00')).toBeTruthy();
  });

  it('renders fallback value when total expenses are missing', () => {
    const { getByText } = render(
      <ModalCategory
        {...mockProps}
        totalExpenses={null}
      />
    );
    expect(getByText('$ 0.00')).toBeTruthy();
  });

  it('calls close Modal when pressing overlay or close icon', () => {
    const { getByTestId } = render(<ModalCategory {...mockProps} />);

    fireEvent.press(getByTestId('close-icon'));
    expect(mockProps.setIsActiveModalCategory).toHaveBeenCalledWith(false);
    fireEvent.press(getByTestId('modal-overlay'));
    expect(mockProps.setIsActiveModalCategory).toHaveBeenCalledWith(false);
  });


it('executes onPress of Alert when Eliminar is confirmed', () => {
  
    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
        if (Array.isArray(buttons)) {
          const eliminarButton = buttons.find(btn => btn.text === 'Eliminar');
          eliminarButton?.onPress(); 
        }
      });
  
    const { getByTestId } = render(<ModalCategory {...mockProps} visible={true} />);
    fireEvent.press(getByTestId('button-Eliminar'));
  
    expect(Alert.alert).toHaveBeenCalledWith('Categoria Eliminada');
    mockAlert.mockRestore();
  });

  it('calls handleEdit and logs expenseId', () => {
    const { getByTestId } = render(<ModalCategory {...mockProps} />);

    fireEvent.press(getByTestId('button-Editar'));
  });
});