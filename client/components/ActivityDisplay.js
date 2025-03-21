import { View } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import * as Icon from "@expo/vector-icons";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { activityDisplay } from '../styles/components/activity-display'
import CustomText from './CustomText'
import { colorsTheme } from '../styles/colorsTheme';

const ActivityDisplay = ({title, date, quantity = 0, icon, screen, color}) => {
    const formatTitle = title ? title : 'nombre no encontrado'; //Validates if there is data in the title, if not, sets a default title
    const formatDate = date ? format(date, "dd 'de' MMMM yyyy", {locale: es}) : 'fecha no encontrada'; //takes the date and formats it
    const iconColor = color ? color : '#c94848'; //Validates if there is data in the color, if not, sets a default color
    const iconBackground = color ? `${color}1a` : '#c948481a'; // takes the property color and adds a default opacity to it
    const quantityColor = screen === 'income' //changes the text color depending on the screen
        ? activityDisplay.green
        : screen === 'expense'
            ? activityDisplay.red
            : activityDisplay.teal
    const validQuantity = Number(quantity) || 0; //Validates if the quantity is a number and if not, adds 0 by default.
    const quantityText = quantity ? `${screen === 'expense' ? '-' : ''} $ ${validQuantity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$ 0.00'; //Validates if there is data in the quantity, if not, sets a default quantity

    const renderIcon = ({ icon }) => {
        const iconSets = {
          AntDesign: Icon.AntDesign,
          FontAwesome: Icon.FontAwesome,
          MaterialIcons: Icon.MaterialIcons,
          Ionicons: Icon.Ionicons,
        };
        const IconComponent = iconSets[icon?.iconSet || 'Ionicons'];
        const iconName = icon?.iconName || 'alert-circle-sharp';
        if (IconComponent) {
          return (
            <IconComponent 
              testID='default-icon'
              name={iconName} 
              size={30} 
              color={iconColor} />
          );
        }
      };

  return (
    <View style={[activityDisplay.container, activityDisplay.format]}>
        <View style={activityDisplay.format}>
            <View style={[activityDisplay.iconBackground, {backgroundColor: iconBackground}]}>
            <View>{renderIcon({ icon })}</View>
            </View>
            <View style={activityDisplay.description}>
                <CustomText text={formatTitle} type={'TextBig'}/>
                { screen === 'category' ? null : <CustomText text={formatDate} type={'TextSmall'} color={activityDisplay.darkGray}/>}
            </View>
        </View>
        <View style={activityDisplay.format}>
            <CustomText 
                text={quantityText} 
                type={'TextBig'}
                color={quantityColor}
            />
            <Ionicons 
                testID="chevron-forward" 
                name={'chevron-forward'} 
                size={22} 
                color={colorsTheme.dark} 
                style={activityDisplay.iconForward}
            />
        </View>
    </View>
  )
}

export default ActivityDisplay