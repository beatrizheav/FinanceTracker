import { View, Text } from 'react-native'
import React from 'react'
import { fontsTheme } from '../styles/fontsTheme'
import { colorsTheme } from '../styles/colorsTheme';

const CustomTitle = ({title, type, numberOfLines = 1, color}) => {
  const textColor = color ? color : colorsTheme.black;
    return (
          <View>
              <Text 
              style={[fontsTheme[type], textColor]}
              numberOfLines={numberOfLines} 
              ellipsizeMode="tail">{title}</Text>
          </View>
    )
  }

export default CustomTitle