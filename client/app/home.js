import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useState, useMemo } from "react";
import { incomesData } from "../constants/incomesData";
import { expensesData } from "../constants/expensesData";

import Header from "../components/Header";
import DatePickerDropdown from "../components/DatePickerDropdown";
import BalanceDisplay from "../components/BalanceDisplay";
import ExpensesScrollview from "../components/ExpensesScrollview";
import CustomText from "../components/CustomText";
import ActivityDisplay from "../components/ActivityDisplay";
import MenuDropdown from "../components/MenuDropdown";
import AddButton from "../components/AddButton";
import BSCategory from "../components/BSCategory";
import BSExpense from "../components/BSExpense";
import BSIncome from "../components/BSIncome";
import ModalExpense from "../components/ModalExpense";
import ModalIncome from "../components/ModalIncome";

import { colorsTheme } from "../styles/colorsTheme";
import { general } from "../styles/general";

// Function to combine and sort data
const mergeAndSortData = (incomes, expenses) => {
  return [...incomes, ...expenses]
    .map((item, index) => ({ ...item, id: (index + 1).toString() }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
};

export default function home() {
  const [date, setDate] = useState({ month: "", year: "" });
  const [addButton, setAddButton] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);
  const [activeBS, setActiveBS] = useState(""); // "Categoria", "Ingreso" o "Gasto"
  const [activeModal, setActiveModal] = useState("");
  const [activity, setActivity] = useState(null);

  // Combined data with useMemo to avoid recalculate in every render
  const combinedData = useMemo(
    () => mergeAndSortData(incomesData, expensesData),
    []
  );

  const selectActivity = (item) => {
    setActivity(item);
    item.category ? setActiveModal("Gasto") : setActiveModal("Ingreso");
  };
  const handleCloseBS = () => {
    setActiveBS("");
    setActivity(null);
  };

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
              onPress={() => selectActivity(item)}
            />
          )}
        />
      </View>

      {/* Float button tu open menu */}
      <AddButton
        onPress={() => [
          setAddButton(!addButton),
          setMenuDropdown(!menuDropdown),
        ]}
        isActiveAddButton={addButton}
      />

      {menuDropdown && (
        <MenuDropdown
          setIsActiveAddButton={setAddButton}
          setIsActiveMenuDropdown={setMenuDropdown}
          setActiveBS={setActiveBS}
        />
      )}

      {/* Conditional renders of the bottom sheets */}
      {activeBS === "Categoria" && (
        <BSCategory visible={true} setVisible={handleCloseBS} edit={false} />
      )}
      {activeBS === "Ingreso" && (
        <BSIncome
          visible={true}
          setVisible={handleCloseBS}
          edit={!!activity}
          income={activity}
        />
      )}
      {activeBS === "Gasto" && (
        <BSExpense
          visible={true}
          setVisible={handleCloseBS}
          edit={!!activity}
          expense={activity}
        />
      )}

      {/* Conditional renders of the modals */}
      {activeModal === "Gasto" && (
        <ModalExpense
          {...activity}
          setIsActiveModalExpense={() => {
            setActiveModal(""), setActivity(null);
          }}
          onEdit={() => {
            setActiveModal("");
            setActiveBS("Gasto");
          }}
        />
      )}
      {activeModal === "Ingreso" && (
        <ModalIncome
          {...activity}
          setIsActiveModalIncome={() => {
            setActiveModal(""), setActivity(null);
          }}
          onEdit={() => {
            setActiveModal("");
            setActiveBS("Ingreso");
          }}
        />
      )}
    </View>
  );
}
