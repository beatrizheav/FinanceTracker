import { FlatList, TouchableOpacity, View, Dimensions } from "react-native";
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
import AddButton from "../components/AddButton";
import MenuDropdown from "../components/MenuDropdown";

export default function home() {
  const [date, setDate] = useState({ month: "", year: "" });
  const [activePlusButton, setActivePlusButton] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);

  const mergeAndSortData = (incomes, expenses) => {
    const mergedData = [...incomes, ...expenses].map((item, index) => ({
      ...item,
      id: (index + 1).toString(),
    }));
    return mergedData
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
  };

  const combinedData = mergeAndSortData(incomesData, expensesData);

  return (
    <View style={general.safeArea}>
      <Header title={"Home"} />
      <View style={{ paddingTop: 50, flex: 1 }}>
        <DatePickerDropdown
          onChange={({ month, year }) =>
            setDate((prev) => ({ ...prev, month, year }))
          }
        />
        <BalanceDisplay income={10000} expense={4000} />
        <View style={{ marginHorizontal: -16, paddingVertical: 10 }}>
          <ExpensesScrollview />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
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
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          data={combinedData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ActivityDisplay
              name={item.name}
              date={item.date}
              quantity={item.quantity}
              screen={item.category ? "expense" : "income"}
              category={item.category}
            />
          )}
        />
      </View>
      <AddButton
        onPress={() => [
          setActivePlusButton(!activePlusButton),
          setMenuDropdown(!menuDropdown),
        ]}
        isActiveAddButton={activePlusButton}
      />
      {menuDropdown && (
        <MenuDropdown
          setIsActiveAddButton={setActivePlusButton}
          setIsActiveMenuDropdown={setMenuDropdown}
        />
      )}
    </View>
  );
}
