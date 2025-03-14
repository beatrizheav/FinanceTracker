import { TouchableOpacity } from 'react-native'
import React from 'react'
import { customButton } from '../styles/components/custom-button'
import CustomTitle from './CustomTitle';

const CustomButton = ({onPress, title, background, type}) => {
  const backgroundStyle = background === 'green'
    ? customButton.green
    : customButton.white;
  
  const typeStyle = type === 'modal'
    ? customButton.modal
    : null;

  const typeTitle = background === 'white'
    ? 'ButtonSmallGreen'
    : type === 'modal' && background === 'green'
    ? 'ButtonSmall'
    : 'ButtonBig'

  return (
      <TouchableOpacity 
        onPress={onPress}
        style={[customButton.container, backgroundStyle, typeStyle]}
      >
        <CustomTitle title={title} type={typeTitle}
        />
      </TouchableOpacity>
  )
}

export default CustomButton