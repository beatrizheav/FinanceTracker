import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import ModalIncome from '../ModalIncome';

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

describe('ModalIncome Component', () => {
  const mockProps = {
    userId: 1,
    incomeId: 1,
    name: "Pago de renta",
    date: "2011-10-10T14:48:00",
    color: "#3b6e40",
    icon: {
        "iconName": "attach-money",
        "iconSet": "MaterialIcons"
        },
    quantity: 1000,
    onEdit: jest.fn(),
    setIsActiveModalIncome: jest.fn()
  }

  it('renders modal with provided data', () => {
    const { getByText } = render(<ModalIncome {...mockProps} />);
    expect(getByText('Pago de renta')).toBeTruthy();
    expect(getByText(' $ 1,000.00')).toBeTruthy();
    expect(getByText('10 de octubre 2011')).toBeTruthy();
  });

  it('renders fallback values when quantity are not provided', () => {
    const { getAllByText } = render(
      <ModalIncome
        name="Bono extra"
        icon={{
            iconName: "attach-money",
            iconSet: "MaterialIcons"
            }}
        color="#3b6e40"
        categoryId={5}
        setIsActiveModalIncome={jest.fn()}
      />
    );
  
    expect(getAllByText('$ 0.00')).toBeTruthy(); // quantity
  });

  it('renders fallback values when name are missing', () => {
    const { getByText } = render(
      <ModalIncome
        {...mockProps}
        name={null}
      />
    );
    expect(getByText('Nombre no encontrado')).toBeTruthy();
  });


  it('renders fallback value when quantity are missing', () => {
    const { getByText } = render(
      <ModalIncome
        {...mockProps}
        quantity={null}
      />
    );
    expect(getByText('$ 0.00')).toBeTruthy();
  });

  it('renders fallback value when date are missing', () => {
    const { getByText } = render(
      <ModalIncome
        {...mockProps}
        date={null}
      />
    );
    expect(getByText('fecha no encontrada')).toBeTruthy();
  });


  it('calls close Modal when pressing overlay or close icon', () => {
    const { getByTestId } = render(<ModalIncome {...mockProps} />);

    fireEvent.press(getByTestId('close-icon'));
    expect(mockProps.setIsActiveModalIncome).toHaveBeenCalledWith(false);
    fireEvent.press(getByTestId('modal-overlay'));
    expect(mockProps.setIsActiveModalIncome).toHaveBeenCalledWith(false);
  });


it('executes onPress of Alert when Eliminar is confirmed', () => {
  
    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
        if (Array.isArray(buttons)) {
          const eliminarButton = buttons.find(btn => btn.text === 'Eliminar');
          eliminarButton?.onPress(); 
        }
      });
  
    const { getByTestId } = render(<ModalIncome {...mockProps} visible={true} />);
    fireEvent.press(getByTestId('button-Eliminar'));
  
    expect(Alert.alert).toHaveBeenCalledWith('Ingreso Eliminado');
    mockAlert.mockRestore();
  });

  it('calls handleEdit and logs IncomeId', () => {
    const { getByTestId } = render(<ModalIncome {...mockProps} />);

    fireEvent.press(getByTestId('button-Editar'));
  });
});