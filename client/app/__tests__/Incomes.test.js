import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Incomes from '../Incomes';

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
        <Text  onPress={onPress} testID="mock-income-item">{name}</Text>
    )
});
jest.mock('../../components/CustomText', () => {
    const { Text } = require('react-native');
    return ({text}) => (<Text>{text}</Text>)
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

jest.mock('../../components/ModalIncome', () => {
    const { View, Text, TouchableOpacity } = require('react-native');
  return ({ onEdit }) => (
    <View>
        <Text>ModalIncome</Text>
            <TouchableOpacity onPress={onEdit}>
            <Text>Editar</Text>
        </TouchableOpacity>
  </View>
);
});

jest.mock('../../components/BSIncome', () => {
    const { Text } = require('react-native');
    return () => <Text>BSIncome</Text>;
});

const mockIncomesData = [
    {
        incomeId: 1,
        name: 'Sueldo',
        date: new Date().toISOString(),
        fixed: true,
      },
      {
        incomeId: 2,
        name: 'Venta',
        date: new Date().toISOString(),
        fixed: false,
      },
  ]
;

const mockEmptyData = [];


describe('Incomes Screen', () => {
  it('renders header and AddButton', () => {
    const { getByText } = render(<Incomes />);
    expect(getByText('Ingresos')).toBeTruthy();
    expect(getByText('Add Button')).toBeTruthy();
  });

  it('toggles fixed section and shows fixed income', () => {
    const { getByText, getAllByTestId } = render(<Incomes data={mockIncomesData}/>);
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]); // abre 'fixed'
    expect(getByText('Sueldo')).toBeTruthy(); // fixed income name
  });

  it('toggles today section and shows today incomes', () => {
    const { getAllByTestId, getByText } = render(<Incomes data={mockIncomesData}/>);
    fireEvent.press(getAllByTestId('chevron-down-outline')[1]); // abre 'today'
    expect(getByText('Venta')).toBeTruthy(); // today income
  });

  it('toggles last two weeks section', () => {
    const { getAllByTestId, getByText } = render(<Incomes data={mockIncomesData}/>);
    fireEvent.press(getAllByTestId('chevron-down-outline')[2]); // abre 'last'
    expect(getByText('Últimas dos semanas')).toBeTruthy();
  });

  it('opens ModalIncome when pressing on an income item', () => {
    const { getAllByTestId, getByText } = render(<Incomes data={mockIncomesData}/>);
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]); 
    fireEvent.press(getAllByTestId('mock-income-item')[0]);

    expect(getByText('ModalIncome')).toBeTruthy();
  });

  it('opens BSIncome when pressing edit from ModalIncome', () => {
    const { getAllByTestId, getByText } = render(<Incomes data={mockIncomesData} />);
    
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]);
    fireEvent.press(getAllByTestId('mock-income-item')[0]);
  
    const editar = getByText('Editar');
    fireEvent.press(editar);
  
    expect(getByText('BSIncome')).toBeTruthy();
  });

  it('shows empty messages for all sections when no data', () => {
    const { getAllByTestId, getByText } = render(<Incomes data={mockEmptyData}/>);
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]);
    expect(getByText('No tienes ningún Ingreso fijo todavía')).toBeTruthy();
  
    fireEvent.press(getAllByTestId('chevron-down-outline')[1]);
    expect(getByText('No tienes ningún Ingreso hoy todavía')).toBeTruthy();
  
    fireEvent.press(getAllByTestId('chevron-down-outline')[2]);
    expect(getByText('No tienes ningún Ingreso en las últimas dos semanas')).toBeTruthy();
  });

  it('returns correct height styles based on income length', () => {
    const singleIncome = [{
      incomeId: 1,
      name: 'Sueldo',
      date: new Date().toISOString(),
      fixed: true,
    }];
  
    const { getAllByTestId, rerender } = render(<Incomes data={singleIncome} />);
  
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]);
    
    rerender(<Incomes data={singleIncome} />);
    
    const flatLists = getAllByTestId('mock-income-item');
    expect(flatLists.length).toBe(1);
  });

  it('returns correct height for fixed incomes section', () => {
    const testData = [
      { incomeId: 1, name: 'Ingreso 1', date: new Date().toISOString(), fixed: true },
      { incomeId: 2, name: 'Ingreso 2', date: new Date().toISOString(), fixed: true },
      { incomeId: 3, name: 'Ingreso 3', date: new Date().toISOString(), fixed: true }
    ];
    const { getAllByTestId } = render(<Incomes data={testData} />);
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]); // Expand 'fixed'
  });

  it('opens BSIncome when AddButton is pressed', () => {
    const { getByText } = render(<Incomes />);
    
    const addButton = getByText('Add Button');
    fireEvent.press(addButton);
    
    expect(getByText('BSIncome')).toBeTruthy();
  });
});
