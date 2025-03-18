import { View } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import CustomTitle from './CustomTitle'
import { balanceDisplay } from '../styles/components/balance-display'
import { colorsTheme } from '../styles/colorsTheme';

const BalanceDisplay = ({income = 0, expense = 0}) => {
    const validIncome = Number(income) || 0;
    const validExpense = Number(expense) || 0;
    const balance = validIncome - validExpense || '0.00';
  return (
    < LinearGradient
        start={[0, 1]}
        end={[1, 0]}
        colors={['#466146', '#30462E', '#2c3d2b']}
        style={balanceDisplay.container}>
        <View style={balanceDisplay.details}>
            <CustomTitle title={'Balance'} type='TitleSmallWhite'/>
            <View style={balanceDisplay.amount}>
                <Ionicons testID="arrow-up" name={'arrow-up'} size={22} color={colorsTheme.white} />
                <CustomTitle title={`$ ${validIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} type='TitleSmallWhite'/>
            </View>
        </View>
        <View style={balanceDisplay.details}>
            <CustomTitle title={`$ ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} type='TitleMediumWhite'/>
            <View style={balanceDisplay.amount}>
                <Ionicons testID="arrow-down" name={'arrow-down'} size={22} color={colorsTheme.white} />
                <CustomTitle title={`$ ${validExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} type='TitleSmallWhite'/>
            </View>
        </View>
    </LinearGradient>
  )
}

export default BalanceDisplay