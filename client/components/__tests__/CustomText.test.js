import React from 'react';
import { render } from '@testing-library/react-native';
import CustomText from '../CustomText';
import { colorsTheme } from '../../styles/colorsTheme';

describe('CustomText', () => {
  it('renders the provided text', () => {
    const { getByText } = render(<CustomText text="Hola Mundo" />);
    expect(getByText('Hola Mundo')).toBeTruthy();
  });

  it('applies the correct text style when type is provided', () => {
    const { getByText } = render(<CustomText text="Título" type="TextSmall" />);
    const textComponent = getByText('Título');
    expect(textComponent.props.style[0]).toHaveProperty('fontSize'); // Asegura que aplica estilo desde fontsTheme
  });

  it('uses default style "TextBig" when no type is given', () => {
    const { getByText } = render(<CustomText text="Sin tipo" />);
    const textComponent = getByText('Sin tipo');
    expect(textComponent.props.style[0]).toEqual(expect.objectContaining({ fontSize: expect.any(Number) }));
  });

  it('limits the number of lines when numberOfLines is passed', () => {
    const { getByText } = render(<CustomText text="Texto largo" numberOfLines={2} />);
    const textComponent = getByText('Texto largo');
    expect(textComponent.props.numberOfLines).toBe(2);
    expect(textComponent.props.ellipsizeMode).toBe('tail');
  });

  it('applies the correct color', () => {
    const { getByText } = render(<CustomText text="Coloreado" color={colorsTheme.red} />);
    const textComponent = getByText('Coloreado');
    expect(textComponent.props.style[1]).toEqual({ color: colorsTheme.red });
  });
});