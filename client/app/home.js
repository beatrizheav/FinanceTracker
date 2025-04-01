import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { general } from "../styles/general";
import Header from "../components/Header";
import DatePickerDropdown from "../components/DatePickerDropdown";
import BalanceDisplay from "../components/BalanceDisplay";
import ExpensesScrollview from "../components/ExpensesScrollview";
import CustomText from "../components/CustomText";
import { colorsTheme } from "../styles/colorsTheme";

export default function home() {
  const [date, setDate] = useState({ month: "", year: "" });

  console.log(date);
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
      </View>
      <ExpensesScrollview />
    </View>
  );
}
