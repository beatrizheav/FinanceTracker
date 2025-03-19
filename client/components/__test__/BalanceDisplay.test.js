import React from 'react';
import { render, within } from '@testing-library/react-native';
import BalanceDisplay from '../BalanceDisplay';

describe('BalanceDisplay Component', () => {
  test('renders formatted income, expense, and balance correctly', () => {
    const { getByText } = render(<BalanceDisplay income={12000} expense={1700} />);

    // Verifica que los valores formateados estén en la pantalla
    expect(getByText('Balance')).toBeTruthy(); // Título
    expect(getByText('$ 12,000.00')).toBeTruthy(); // Income
    expect(getByText('$ 1,700.00')).toBeTruthy(); // Expense
    expect(getByText('$ 10,300.00')).toBeTruthy(); // Balance (income - expense)
  });

  test('renders balance as $0.00 when income and expense are 0', () => {
    const { getAllByText } = render(<BalanceDisplay income={0} expense={0} />);

    expect(getAllByText('$ 0.00')).toHaveLength(3); // Asegura que aparece 3 veces

  });

  test('renders balance as $0.00 when income and expense are null', () => {
    const { getAllByText } = render(<BalanceDisplay income={null} expense={null} />);

    expect(getAllByText('$ 0.00')).toHaveLength(3);
  });

  test('renders balance as $0.00 when income and expense are non-numeric', () => {
    const {  getAllByText } = render(<BalanceDisplay income={'abc'} expense={'xyz'} />);
    expect( getAllByText('$ 0.00')).toBeTruthy();
  });

  test('renders balance as 0.00 when income and expense are not provided', () => {
    const { getAllByText } = render(<BalanceDisplay />);
    expect(getAllByText('$ 0.00')).toBeTruthy(); // Default balance
    expect(getAllByText('$ 0.00')).toBeTruthy(); // Default income
    expect(getAllByText('$ 0.00')).toBeTruthy(); // Default expense
  });

test('renders balance correctly when income is undefined', () => {
  const { getAllByText } = render(<BalanceDisplay income={undefined} expense={300} />);
  expect(getAllByText('$ 0.00')).toBeTruthy(); // Default income
  expect(getAllByText('$ -300.00')).toBeTruthy(); // Balance
  expect(getAllByText('$ 300.00')).toBeTruthy(); // Expense
});

test('renders balance correctly when expense is undefined', () => {
  const { getAllByText } = render(<BalanceDisplay income={700} expense={undefined} />);
  expect(getAllByText('$ 700.00')).toBeTruthy(); // Income
  expect(getAllByText('$ 700.00')).toBeTruthy(); // Balance
  expect(getAllByText('$ 0.00')).toBeTruthy(); // Default expense
});

  test('renders Ionicons correctly', () => {
    const { getAllByTestId } = render(<BalanceDisplay income={12000} expense={1700} />);

    // Verifica que hay dos iconos (arrow-up y arrow-down)
    expect(getAllByTestId('arrow-up').length).toBe(1);
    expect(getAllByTestId('arrow-down').length).toBe(1);
  });
});