import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { customButton } from '../styles/components/custom-button'

const Button = ({onPress, title, background, type}) => {
  const backgroundStyle = background === 'green' 
    ? customButton.green
    : customButton.white;
  
  const typeStyle = type === 'modal'
    ? customButton.modal
    : null;

  return (
      <TouchableOpacity 
        onPress={onPress}
        style={[customButton.container, backgroundStyle, typeStyle]}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
  )
}

export default Button