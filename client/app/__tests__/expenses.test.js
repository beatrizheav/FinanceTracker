import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Expenses from '../expenses';

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
        <Text  onPress={onPress} testID="mock-expense-item">{name}</Text>
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

jest.mock('../../components/ModalExpense', () => {
    const { View, Text, TouchableOpacity } = require('react-native');
  return ({ onEdit }) => (
    <View>
        <Text>ModalExpense</Text>
            <TouchableOpacity onPress={onEdit}>
            <Text>Editar</Text>
        </TouchableOpacity>
  </View>
);
});

jest.mock('../../components/BSExpense', () => {
    const { Text } = require('react-native');
    return () => <Text>BSExpense</Text>;
});

const mockExpensesData = [
    {
        userId: 2,
        expenseId: 12,
        category: {
          id: 2,
          name: "Casa",
          color: "#403b6e",
          icon: { iconName: "house", iconSet: "MaterialIcons" }
        },
        name: "Cortinas",
        date: "2025-03-25T19:27:00",
        quantity: 1843.4,
        description: "Nuevas cortinas para mi sala",
        image: "",
        fixed: true
      },
      {
          userId: 5,
          expenseId: 13,
          category: {
              id: 3,
              name: "Transporte",
              color: "#ffb347",
              icon: { iconName: "directions-bus", iconSet: "MaterialIcons" }
          },
          name: "Pasaje",
          date: "2025-04-03T11:14:00",
          quantity: 18.00,
          description: "Gastos en autobús",
          image: "",
          fixed: false
          },
  ]
;

const mockEmptyData = [];


describe('Expenses Screen', () => {
  it('renders header and AddButton', () => {
    const { getByText } = render(<Expenses/>);
    expect(getByText('Gastos')).toBeTruthy();
    expect(getByText('Add Button')).toBeTruthy();
  });

  it('toggles fixed section and shows fixed expense', () => {
    const { getByText, getAllByTestId } = render(<Expenses data={mockExpensesData}/>);
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]); // abre 'fixed'
    expect(getByText('Cortinas')).toBeTruthy(); // fixed expense name
  });

  it('toggles today section and shows today expenses', () => {
    const { getAllByTestId, getByText } = render(<Expenses data={mockExpensesData}/>);
    fireEvent.press(getAllByTestId('chevron-down-outline')[1]); // abre 'today'
    expect(getByText('Pasaje')).toBeTruthy(); // today expense
  });

  it('toggles last two weeks section', () => {
    const { getAllByTestId, getByText } = render(<Expenses data={mockExpensesData}/>);
    fireEvent.press(getAllByTestId('chevron-down-outline')[2]); // abre 'last'
    expect(getByText('Últimas dos semanas')).toBeTruthy();
  });

  it('opens ModalExpense when pressing on an expense item', () => {
    const { getAllByTestId, getByText } = render(<Expenses data={mockExpensesData}/>);
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]); 
    fireEvent.press(getAllByTestId('mock-expense-item')[0]);

    expect(getByText('ModalExpense')).toBeTruthy();
  });

  it('opens BSExpense when pressing edit from ModalExpense', () => {
    const { getAllByTestId, getByText } = render(<Expenses data={mockExpensesData} />);
    
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]);
    fireEvent.press(getAllByTestId('mock-expense-item')[0]);
  
    const editar = getByText('Editar');
    fireEvent.press(editar);
  
    expect(getByText('BSExpense')).toBeTruthy();
  });

  it('shows empty messages for all sections when no data', () => {
    const { getAllByTestId, getByText } = render(<Expenses data={mockEmptyData}/>);
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]);
    expect(getByText('No tienes ningún Gasto fijo todavía')).toBeTruthy();
  
    fireEvent.press(getAllByTestId('chevron-down-outline')[1]);
    expect(getByText('No tienes ningún Gasto hoy todavía')).toBeTruthy();
  
    fireEvent.press(getAllByTestId('chevron-down-outline')[2]);
    expect(getByText('No tienes ningún Gasto en las últimas dos semanas')).toBeTruthy();
  });

  it('returns correct height styles based on expense length', () => {
    const singleExpense = [{
      expenseId: 1,
      name: 'Sueldo',
      date: new Date().toISOString(),
      fixed: true,
    }];
  
    const { getAllByTestId, rerender } = render(<Expenses data={singleExpense} />);
  
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]);
    
    rerender(<Expenses data={singleExpense} />);
    
    const flatLists = getAllByTestId('mock-expense-item');
    expect(flatLists.length).toBe(1);
  });

  it('returns correct height for fixed expenses section', () => {
    const testData = [
      { expenseId: 1, name: 'Gasto 1', date: new Date().toISOString(), fixed: true },
      { expenseId: 2, name: 'Gasto 2', date: new Date().toISOString(), fixed: true },
      { expenseId: 3, name: 'Gasto 3', date: new Date().toISOString(), fixed: true }
    ];
    const { getAllByTestId } = render(<Expenses data={testData} />);
    fireEvent.press(getAllByTestId('chevron-down-outline')[0]); // Expand 'fixed'
  });

  it('opens BSExpense when AddButton is pressed', () => {
    const { getByText } = render(<Expenses />);
    
    const addButton = getByText('Add Button');
    fireEvent.press(addButton);
    
    expect(getByText('BSExpense')).toBeTruthy();
  });
});
