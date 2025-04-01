import { View, FlatList, Animated, Easing, Pressable } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { isSameDay, isAfter, isBefore, subDays } from 'date-fns';
import Header from '../components/Header'
import CustomTitle from '../components/CustomTitle'
import ActivityDisplay from '../components/ActivityDisplay'
import CustomText from '../components/CustomText'
import AddButton from '../components/AddButton'
import { incomesData } from '../constants/incomesData'
import { general } from '../styles/general'
import { colorsTheme } from '../styles/colorsTheme';
import { incomes } from '../styles/screens/incomes';
import ModalIncome from '../components/ModalIncome';

const Incomes = () => {
    const [selectedIncome, setSelectedIncome] = useState(null);
    const [isActiveModalIncome, setIsActiveModalIncome] = useState(false);
    const fixedIncomes = incomesData.filter(item => item.fixed === true); //incomes fixed
    const today = new Date();
    const twoWeeksAgo = subDays(today, 14);
    const [isActiveAddButton, setIsActiveAddButton] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        fixed: false,
        today: false,
        last: false
      });

      const todayIncomes = incomesData.filter((item) => //incomes of today
        isSameDay(new Date(item.date), today)
      );

      const lastTwoWeeksIncomes = incomesData.filter((item) => { //incomes of last two weeks
        const incomeDate = new Date(item.date);
        return isAfter(incomeDate, twoWeeksAgo) && isBefore(incomeDate, today);
      });

      const toggleSection = (section) => {
        setExpandedSections((prev) => ({
          ...prev,
          [section]: !prev[section],
        }));
      };
      
      const getIcon = (section) => 
        expandedSections[section] ? 'chevron-up-outline' : 'chevron-down-outline';
      
      const showBottom = () => {
        setIsActiveAddButton(!isActiveAddButton)
      }

      // const getDynamicHeight = () => {
      //   if (expandedSections.fixed){
      //     if(fixedIncomes.length === 1){
      //         return { height: '10%', borderColor: 'blue'}
      //     } else if(fixedIncomes.length === 2) {
      //         return { height: '20%', borderColor: 'green'}
      //     } else {
      //         return { height: '30%', borderWidth: 1, borderColor: 'pink'}
      //     }
      //   };

      //   if (expandedSections.today){
      //     if(todayIncomes.length === 1){
      //         return { height: '10%', borderWidth: 1, borderColor: 'blue'}
      //     } else if(todayIncomes.length === 2) {
      //         return { height: '20%'}
      //     } else {
      //         return { height: '30%', borderWidth: 1, borderColor: 'yellow'}
      //     }
      //   };

      //   if (expandedSections.last){
      //     if(!expandedSections.fixed && !expandedSections.today){
      //         return { height: '80%'}
      //     }
      //   }
      // }

      const getFixedHeightStyle = () => {
        if (!expandedSections.fixed) return {};
        if (fixedIncomes.length === 1) return { height: '10%', borderColor: 'blue', borderWidth: 1 };
        if (fixedIncomes.length === 2) return { height: '20%', borderColor: 'green', borderWidth: 1 };
        return { maxHeight: '45%', borderColor: 'yellow', borderWidth: 1 };
      };

      const showModalIncome = (income) => {
        setSelectedIncome(income);
        setIsActiveModalIncome(true);
      };
  return (
    <View style={general.safeArea}>
        <Header title={'Ingresos'}/>
        <View style={incomes.container}>
            <View>
                <Pressable 
                  onPress={() => toggleSection('fixed')}
                  style={incomes.container_title}>
                    <CustomTitle title={'Ingresos fijos'} type={'TitleBig'}/>
                        <Ionicons
                            onPress={() => toggleSection('fixed')}
                            name={getIcon('fixed')}
                            size={27}
                            color={colorsTheme.black}
                            style={incomes.icon_chev}
                            testID="down-icon"
                        />
                </Pressable>
                {expandedSections.fixed && fixedIncomes.length === 0
                    ? ( <View style={incomes.container_text}>
                            <CustomText text={"No tienes ningún Ingreso fijo todavía"} type={'TextSmall'} numberOfLines={0}/>
                        </View>
                      )
                    :   expandedSections.fixed ? 
                      ( 
                      <FlatList
                            data={fixedIncomes}
                            keyExtractor={item => item.incomeId.toString()}
                            showsVerticalScrollIndicator={false}
                            style={getFixedHeightStyle()}
                            renderItem={({item}) => 
                                <ActivityDisplay 
                                  {... item}
                                  onPress={()=> showModalIncome(item)} 
                                  screen={'income'}/>
                            }
                        />
                      )
                    : null 
                }
                
            </View>
            <View>
                <Pressable
                  onPress={() => toggleSection('today')}
                  style={incomes.container_title}>
                    <CustomTitle title={'Hoy'} type={'TitleBig'}/>
                    <Ionicons
                        onPress={() => toggleSection('today')} 
                        name={getIcon('today')} 
                        size={27} 
                        color={colorsTheme.black}
                        style={incomes.icon_chev}
                        testID='down-icon'
                    />
                </Pressable>
                {expandedSections.today && todayIncomes.length === 0
                    ? ( <View style={incomes.container_text}>
                            <CustomText text={"No tienes ningún Ingreso hoy todavía"} type={'TextSmall'} numberOfLines={0}/>
                        </View>
                      )
                    :   expandedSections.today ? 
                      ( <FlatList
                            data={todayIncomes}
                            keyExtractor={item => item.incomeId.toString()}
                            showsVerticalScrollIndicator={false}
                            //style={[getDynamicHeight(), incomes.border]}
                            renderItem={({item}) => 
                                <ActivityDisplay 
                                  {... item}
                                  onPress={()=> showModalIncome(item)} 
                                  screen={'income'}/>
                            }
                        />
                      )
                    : null 
                }
            </View>
            <View>
                <Pressable
                  onPress={() => toggleSection('last')}
                  style={incomes.container_title}>
                    <CustomTitle title={'Últimas dos semanas'} type={'TitleBig'}/>
                    <Ionicons
                        onPress={() => toggleSection('last')} 
                        name={getIcon('last')} 
                        size={27} 
                        color={colorsTheme.black}
                        style={incomes.icon_chev}
                        testID='down-icon'
                    />
                </Pressable>
                {expandedSections.last && lastTwoWeeksIncomes.length === 0
                    ? ( <View style={incomes.container_text}>
                            <CustomText text={"No tienes ningún Ingreso en las últimas dos semanas"} type={'TextSmall'} numberOfLines={0}/>
                        </View>
                      )
                    :   expandedSections.last ? 
                      ( <FlatList
                            data={lastTwoWeeksIncomes}
                            keyExtractor={item => item.incomeId.toString()}
                            showsVerticalScrollIndicator={false}
                            //style={[getDynamicHeight(), incomes.border]}
                            renderItem={({item}) => 
                                <ActivityDisplay 
                                  {... item} 
                                  onPress={()=> showModalIncome(item)}
                                  screen={'income'}/>
                            }
                        />
                      )
                    : null 
                }
            </View>
        </View>
        <AddButton onPress={showBottom} isActiveAddButton={isActiveAddButton}/>
        {isActiveModalIncome && selectedIncome && (
          <ModalIncome
            {...selectedIncome}
            setIsActiveModalIncome={setIsActiveModalIncome}
          />
        )}
    </View>
  )
}

export default Incomes