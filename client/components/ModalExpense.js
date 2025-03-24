import { View, Text, Modal, Alert, Platform, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import * as Icon from "@expo/vector-icons";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import CustomButton from './CustomButton'
import ModalDetail from './ModalDetail';
import CustomInput from './CustomInput'
import ImagePickerComponent from './ImagePicker';
import { modalExpense } from '../styles/components/modal-expense';
import { colorsTheme } from '../styles/colorsTheme';
import { fontsTheme } from '../styles/fontsTheme';

const ModalExpense = ({category, name, date, quantity = 0, description, icon, image, userId, expenseId, setIsActiveModal}) => {
    const formatNameCategory = category.name ? category.name : 'Categoria no encontrada'; //Validates if there is data in the title, if not, sets a default title
    const formatNameExpense = name ? name : 'Titulo no encontrado';
    const formatDate = date ? format(date, "dd 'de' MMMM yyyy", {locale: es}) : 'fecha no encontrada'; //takes the date and formats it
    const iconColor = category.color ? category.color : '#c94848'; //Validates if there is data in the color, if not, sets a default color
    const iconBackground = category.color ? `${category.color}1a` : '#c948481a'; // takes the property color and adds a default opacity to it
    const validQuantity = Number(quantity) || 0;
    const quantityText = quantity ? `- $ ${validQuantity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$ 0.00'; //Validates if there is data in the quantity, if not, sets a default quantity
    const validImage = image ? image : false;
    const heightModal = image 
        ? Platform.OS === "android" ? {height: '85%'} : {height: '77%'} 
        : Platform.OS === "android" ? {height: '67%'} : {height: '60%'};
    const heightInputs = image ? {height: '37%'} : {height: '20%'};

    const handleDelete = (userId, expenseId) => {
        Alert.alert(
            'Eliminar Gasto',
            '¿Estas seguro que deseas eliminar el gasto?',
            [
              {
                text: 'Eliminar',
                onPress: () => {
                    console.log('userId:', userId, 'expenseId:', expenseId), 
                    Alert.alert('Gasto Eliminado')},
                style: 'default',
              },
              {
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
              },
            ],
        )
    }

    const handleEdit = (expenseId) => {
        console.log('expenseId:', expenseId)
    }

    const renderIcon = ({ icon }) => {
        const iconSets = {
          AntDesign: Icon.AntDesign,
          FontAwesome: Icon.FontAwesome,
          MaterialIcons: Icon.MaterialIcons,
          Ionicons: Icon.Ionicons,
        };
        const IconComponent = iconSets[category.icon?.iconSet || 'Ionicons'];
        const iconName = category.icon.iconSet ? category.icon?.iconName : 'alert-circle-sharp'
        if (IconComponent) {
          return (
            <IconComponent 
              testID='default-icon'
              name={iconName} 
              size={50} 
              color={iconColor} />
          );
        }
    };

    const closeMenu = () => {
        setIsActiveModal(false);
    };
  return (
    <Modal>
        <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={modalExpense.overlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
                <View style={[modalExpense.container, heightModal]}>
                    <View style={modalExpense.container_closeIcon}>
                        <Ionicons
                            onPress={closeMenu} 
                            name={'close'} 
                            size={27} 
                            color={colorsTheme.black}/>
                    </View>
                    <View>
                        <View style={modalExpense.container_icon}>
                            <View style={[modalExpense.iconBackground, {backgroundColor: iconBackground}]}>
                                <View>{renderIcon({ icon })}</View>
                            </View>
                            <Text style={[fontsTheme.TitleSmall, {color: iconColor}]}>{formatNameCategory}</Text>
                        </View>
                    </View>
                    <View style={modalExpense.container_details}>
                        <ModalDetail title={'Gasto:'} text={formatNameExpense}/>
                        <ModalDetail title={'Cantidad:'} text={quantityText} color={modalExpense.red}/>
                        <ModalDetail title={'Fecha:'} text={formatDate}/>
                    </View>
                    <View style={[modalExpense.container_inputAndImage, heightInputs]}>
                        <CustomInput 
                            label={'Descripcion:'}
                            type={'paragraph'}
                            value={description}
                            />

                        { validImage && 
                            <ImagePickerComponent
                            image={image}
                            label={'Recibo:'}
                        />}
                    </View>
                    <View style={modalExpense.container_buttons}>
                        <CustomButton onPress={() => handleDelete(userId, expenseId)} title={'Eliminar'} background={'white'} type={'modal'} />
                        <CustomButton onPress={() => handleEdit(expenseId)} title={'Editar'} background={'green'} type={'modal'} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ModalExpense