import { TouchableOpacity } from 'react-native'
import React from 'react'
import { customButton } from '../styles/components/custom-button'
import CustomTitle from './CustomTitle';

const CustomButton = ({onPress, title, background, type}) => {
  const backgroundStyle = background === 'green'
    ? customButton.backgroundGreen
    : customButton.backgroundWhite;
  
  const typeStyle = type === 'modal'
    ? customButton.modal
    : null;

  const typeTitle = type === 'modal' 
    ? 'ButtonSmall'
    : 'ButtonBig';

  const textColor = background === 'white' 
    ? customButton.green
    : customButton.white;

  return (
      <TouchableOpacity 
        onPress={onPress}
        style={[customButton.container, backgroundStyle, typeStyle]}
      >
        <CustomTitle title={title} type={typeTitle} color={textColor}/>
      </TouchableOpacity>
  )
}

export default CustomButton