import { Alert, View, TouchableWithoutFeedback, Modal } from 'react-native'
import React from 'react'
import { modalCategory } from '../styles/components/modal-category';
import ModalDetail from './ModalDetail';
import CustomButton from './CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { colorsTheme } from '../styles/colorsTheme';
import CategoryIcon from './CategoryIcon';

const ModalCategory = ({name, budget = 0, totalExpenses = 0, icon, color, categoryId, setIsActiveModalCategory}) => {
    const userId = 2; //temporal userId
    const formatName = name ? name : 'Categoria no encontrada'; //Validates if there is data in the title, if not, sets a default title
    const formatBudget = budget ? ` $ ${budget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$ 0.00'; //Validates if there is data in the quantity, if not, sets a default quantity
    const formatTotalExpenses = totalExpenses ? `- $ ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$ 0.00'; //Validates if there is data in the quantity, if not, sets a default quantity
    
    const closeModal = () => {
        setIsActiveModalCategory(false);
    };
    const handleDelete = (userId, categoryId) => {
        //agregar la logica para eliminar el gasto
        Alert.alert(
            `Eliminar Gasto con id: ${categoryId}`,
            '¿Estas seguro que deseas eliminar el gasto?',
            [
              {
                text: 'Eliminar',
                onPress: () => {
                    Alert.alert('Gasto Eliminado'),
                    setIsActiveModalCategory(false)},
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
    const handleEdit = (categoryId) => {
        //agregar logica para editar el gasto
    }

    return (
        <Modal>
        <TouchableWithoutFeedback onPress={closeModal}>
            <View style={modalCategory.overlay}>
            <TouchableWithoutFeedback>
                <View style={modalCategory.container}>
                    <View style={modalCategory.container_closeIcon}>
                        <Ionicons
                            onPress={closeModal} 
                            name={'close'} 
                            size={27} 
                            color={colorsTheme.black}
                            testID='close-icon'
                            />
                    </View>
                    <View>
                        <View style={modalCategory.container_icon}>
                            <CategoryIcon icon={icon} type={"big"} color={color}/>
                        </View>
                    </View>
                    <View style={modalCategory.container_details}>
                        <ModalDetail title={'Categoría:'} text={formatName}/>
                        <ModalDetail title={'Presupuesto:'} text={formatBudget} color={modalCategory.teal}/>
                        <ModalDetail title={'Gastos totales:'} text={formatTotalExpenses} color={modalCategory.red}/>
                    </View>
                    <View style={modalCategory.container_buttons}>
                        <CustomButton 
                            onPress={() => handleDelete(userId, categoryId)} 
                            title={'Eliminar'} 
                            background={'white'} 
                            type={'modal'} 
                            testID='button-Eliminar'/>
                        <CustomButton 
                            onPress={() => handleEdit(categoryId)} 
                            title={'Editar'} 
                            background={'green'} 
                            type={'modal'} 
                            testID='button-Editar'/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ModalCategory