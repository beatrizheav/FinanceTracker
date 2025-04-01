import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { general } from "../styles/general";
import Header from "../components/Header";
import DatePickerDropdown from "../components/DatePickerDropdown";
import BalanceDisplay from "../components/BalanceDisplay";
import ExpensesScrollview from "../components/ExpensesScrollview";
import CustomText from "../components/CustomText";
import { colorsTheme } from "../styles/colorsTheme";
import ActivityDisplay from "../components/ActivityDisplay";
import { incomesData } from "../constants/incomesData";
import { expensesData } from "../constants/expensesData";

export default function home() {
  const [date, setDate] = useState({ month: "", year: "" });

  console.log(date);

  const mergeAndSortData = (incomes, expenses) => {
    const mergedData = [...incomes, ...expenses];

    return mergedData.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const combinedData = mergeAndSortData(incomesData, expensesData);
  console.log(combinedData);

  const categoria = {
    id: 2,
    name: "Casa",
    color: "#3b6e40",
    icon: {
      iconName: "house",
      iconSet: "MaterialIcons",
    },
  };

  return (
    <View style={general.safeArea}>
      <Header title={"Home"} />
      <View style={{ paddingTop: 50 }}>
        <DatePickerDropdown
          onChange={({ month, year }) =>
            setDate((prev) => ({ ...prev, month, year }))
          }
        />
        <BalanceDisplay income={10000} expense={4000} />
        <View
          style={{
            flexDirection: "row",
            marginTop: 350,
            justifyContent: "space-between",
            alignItems: "center",
            // backgroundColor: "red",
          }}
        >
          <CustomText text={"Actividad Reciente"} type={"TitleSmall"} />
          <TouchableOpacity>
            <CustomText
              text={"Ver todo"}
              type={"TextSmall"}
              color={colorsTheme.teal}
            />
          </TouchableOpacity>
        </View>
        <ActivityDisplay
          name={"Pago de renta"}
          date={"2024-03-01T10:00:00"}
          quantity={150}
          screen={"expense"}
          category={categoria}
        />
      </View>
      <ExpensesScrollview />
    </View>
  );
}
