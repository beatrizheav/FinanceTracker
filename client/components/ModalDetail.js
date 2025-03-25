import { View } from 'react-native'
import React from 'react'
import CustomTitle from './CustomTitle'
import CustomText from './CustomText'
import { modalDetail } from '../styles/components/modal-detail'

const ModalDetail = ({title, text, color}) => {
  return (
      <View style={modalDetail.container}>
        <CustomTitle title={title} type={'TitleSmall'} />
        <CustomText text={text} type={'TextBig'} color={color}/>
      </View>
  )
}

export default ModalDetail