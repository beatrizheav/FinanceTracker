import { View, FlatList, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { isSameDay, isAfter, isBefore, subDays } from "date-fns";
import Header from "../components/Header";
import ActivityDisplay from "../components/ActivityDisplay";
import CustomText from "../components/CustomText";
import AddButton from "../components/AddButton";
import BSIncome from "../components/BSIncome";
import ModalIncome from "../components/ModalIncome";
import { incomesData } from "../constants/incomesData";
import { general } from "../styles/general";
import { colorsTheme } from "../styles/colorsTheme";
import { incomes } from "../styles/screens/incomes";

const Incomes = ({ data = incomesData }) => {
  const height =
    Platform.OS === "android" ? incomes.containerAnd : incomes.containerIos;
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [isActiveModalIncome, setIsActiveModalIncome] = useState(false);
  const [isActiveBSIncome, setIsActiveBSIncome] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const fixedIncomes = data.filter((item) => item.fixed === true); //incomes fixed
  const today = new Date();
  const twoWeeksAgo = subDays(today, 14);
  const [expandedSections, setExpandedSections] = useState({
    fixed: false,
    today: false,
    last: false,
  });

  const todayIncomes = data.filter(
    (
      item //incomes of today
    ) => isSameDay(new Date(item.date), today)
  );

  const lastTwoWeeksIncomes = data.filter((item) => {
    //incomes of last two weeks
    const incomeDate = new Date(item.date);
    return isAfter(incomeDate, twoWeeksAgo) && isBefore(incomeDate, today);
  });

  const showModalIncome = (income) => {
    setSelectedIncome(income);
    setIsActiveModalIncome(true);
  };

  const showBottom = () => {
    setSelectedIncome(null);
    setEditMode(false);
    setIsActiveBSIncome(true);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => {
      const isCurrentlyOpen = prev[section];
      // Si ya está abierta, solo ciérrala (permitiendo que ninguna esté abierta)
      if (isCurrentlyOpen) {
        return {
          fixed: false,
          today: false,
          last: false,
        };
      }
      // Si está cerrada, ábrela y cierra las demás
      return {
        fixed: false,
        today: false,
        last: false,
        [section]: true,
      };
    });
  };

  const getIcon = (section) =>
    expandedSections[section] ? "chevron-up-outline" : "chevron-down-outline";

  return (
    <View style={general.safeArea}>
      <Header title={"Ingresos"} />
      <View style={height}>
        <View style={incomes.section}>
          <Pressable
            onPress={() => toggleSection("fixed")}
            style={incomes.container_title}
          >
            <CustomText text={"Ingresos fijos"} type={"TitleMedium"} />
            <Ionicons
              onPress={() => toggleSection("fixed")}
              name={getIcon("fixed")}
              size={27}
              color={colorsTheme.black}
              style={incomes.icon_chev}
              testID="chevron-down-outline"
            />
          </Pressable>
          {expandedSections.fixed && fixedIncomes.length === 0 ? (
            <View style={incomes.container_text}>
              <CustomText
                text={"No tienes ningún Ingreso fijo todavía"}
                type={"TextSmall"}
                numberOfLines={0}
              />
            </View>
          ) : expandedSections.fixed ? (
            <FlatList
              data={fixedIncomes}
              keyExtractor={(item) => item.incomeId.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ActivityDisplay
                  {...item}
                  onPress={() => showModalIncome(item)}
                  screen={"income"}
                  testID="mock-income-item"
                />
              )}
            />
          ) : null}
        </View>
        <View style={incomes.section}>
          <Pressable
            onPress={() => toggleSection("today")}
            style={incomes.container_title}
          >
            <CustomText text={"Hoy"} type={"TitleMedium"} />
            <Ionicons
              onPress={() => toggleSection("today")}
              name={getIcon("today")}
              size={27}
              color={colorsTheme.black}
              style={incomes.icon_chev}
              testID="chevron-down-outline"
            />
          </Pressable>
          {expandedSections.today && todayIncomes.length === 0 ? (
            <View style={incomes.container_text}>
              <CustomText
                text={"No tienes ningún Ingreso hoy todavía"}
                type={"TextSmall"}
                numberOfLines={0}
              />
            </View>
          ) : expandedSections.today ? (
            <FlatList
              data={todayIncomes}
              keyExtractor={(item) => item.incomeId.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ActivityDisplay
                  {...item}
                  onPress={() => showModalIncome(item)}
                  screen={"income"}
                  testID="mock-income-item"
                />
              )}
            />
          ) : null}
        </View>
        <View style={incomes.section}>
          <Pressable
            onPress={() => toggleSection("last")}
            style={incomes.container_title}
          >
            <CustomText text={"Últimas dos semanas"} type={"TitleMedium"} />
            <Ionicons
              onPress={() => toggleSection("last")}
              name={getIcon("last")}
              size={27}
              color={colorsTheme.black}
              style={incomes.icon_chev}
              testID="chevron-down-outline"
            />
          </Pressable>
          {expandedSections.last && lastTwoWeeksIncomes.length === 0 ? (
            <View style={incomes.container_text}>
              <CustomText
                text={"No tienes ningún Ingreso en las últimas dos semanas"}
                type={"TextSmall"}
                numberOfLines={0}
              />
            </View>
          ) : expandedSections.last ? (
            <FlatList
              data={lastTwoWeeksIncomes}
              keyExtractor={(item) => item.incomeId.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ActivityDisplay
                  {...item}
                  onPress={() => showModalIncome(item)}
                  screen={"income"}
                  testID="mock-income-item"
                />
              )}
            />
          ) : null}
        </View>
      </View>
      <AddButton onPress={showBottom} />
      {isActiveModalIncome && selectedIncome && (
        <ModalIncome
          {...selectedIncome}
          setIsActiveModalIncome={setIsActiveModalIncome}
          onEdit={() => {
            setEditMode(true);
            setIsActiveModalIncome(false);
            setIsActiveBSIncome(true);
          }}
        />
      )}
      <BSIncome
        visible={isActiveBSIncome}
        setVisible={setIsActiveBSIncome}
        edit={editMode}
        income={selectedIncome}
      />
    </View>
  );
};

export default Incomes;
