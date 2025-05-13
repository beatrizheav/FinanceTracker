import { View, FlatList, Pressable, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { isSameDay, parseISO } from "date-fns";
import Header from "../components/Header";
import ActivityDisplay from "../components/ActivityDisplay";
import CustomText from "../components/CustomText";
import AddButton from "../components/AddButton";
import BSIncome from "../components/BSIncome";
import ModalIncome from "../components/ModalIncome";
import apiClient from "../api/apiClient";
import { general } from "../styles/general";
import { colorsTheme } from "../styles/colorsTheme";
import { incomes } from "../styles/screens/incomes";
import useAuthGuard from "../hooks/useAuthGuard";

const Incomes = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useAuthGuard();

  const loadIncomes = async () => {
    try {
      const data = await apiClient.get("/incomes/user");
      // Ordenar por fecha descendente
      const sorted = [...data].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setIncomeList(sorted);
    } catch (err) {
      console.error("Error fetching incomes:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncomes();
  }, []);

  const height =
    Platform.OS === "android" ? incomes.containerAnd : incomes.containerIos;
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [isActiveModalIncome, setIsActiveModalIncome] = useState(false);
  const [isActiveBSIncome, setIsActiveBSIncome] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const fixedIncomes = incomeList.filter(
    (item) => item.fixed === true || item.fixed === 1 || item.fixed === "true"
  );
  const today = new Date();

  const todayIncomes = incomeList.filter((item) =>
    isSameDay(parseISO(item.date), today)
  );

  const [expandedSections, setExpandedSections] = useState({
    fixed: false,
    today: false,
    all: false,
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
      return {
        fixed: false,
        today: false,
        all: false,
        [section]: !isCurrentlyOpen,
      };
    });
  };

  const getIcon = (section) =>
    expandedSections[section] ? "chevron-up-outline" : "chevron-down-outline";

  return (
    <>
      {loading ? (
        <CustomText text="Cargando ingresos..." type="TextMedium" />
      ) : error ? (
        <CustomText text={`Error: ${error}`} type="TextMedium" />
      ) : (
        <View style={general.safeArea}>
          <Header title={"Ingresos"} />
          <View style={height}>
            {/* Ingresos Fijos */}
            <View style={incomes.section}>
              <Pressable
                onPress={() => toggleSection("fixed")}
                style={incomes.container_title}
              >
                <CustomText text={"Ingresos fijos"} type={"TitleMedium"} />
                <Ionicons
                  name={getIcon("fixed")}
                  size={27}
                  color={colorsTheme.black}
                  style={incomes.icon_chev}
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
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ActivityDisplay
                      {...item}
                      onPress={() => showModalIncome(item)}
                      screen={"income"}
                    />
                  )}
                />
              ) : null}
            </View>

            {/* Ingresos Hoy */}
            <View style={incomes.section}>
              <Pressable
                onPress={() => toggleSection("today")}
                style={incomes.container_title}
              >
                <CustomText text={"Hoy"} type={"TitleMedium"} />
                <Ionicons
                  name={getIcon("today")}
                  size={27}
                  color={colorsTheme.black}
                  style={incomes.icon_chev}
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
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ActivityDisplay
                      {...item}
                      onPress={() => showModalIncome(item)}
                      screen={"income"}
                    />
                  )}
                />
              ) : null}
            </View>

            {/* Todos los ingresos */}
            <View style={incomes.section}>
              <Pressable
                onPress={() => toggleSection("all")}
                style={incomes.container_title}
              >
                <CustomText text={"Todos los ingresos"} type={"TitleMedium"} />
                <Ionicons
                  name={getIcon("all")}
                  size={27}
                  color={colorsTheme.black}
                  style={incomes.icon_chev}
                />
              </Pressable>
              {expandedSections.all && incomeList.length === 0 ? (
                <View style={incomes.container_text}>
                  <CustomText
                    text={"No tienes ningún ingreso registrado todavía"}
                    type={"TextSmall"}
                    numberOfLines={0}
                  />
                </View>
              ) : expandedSections.all ? (
                <FlatList
                  data={incomeList}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ActivityDisplay
                      {...item}
                      onPress={() => showModalIncome(item)}
                      screen={"income"}
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
              incomeId={selectedIncome.id}
              setIsActiveModalIncome={setIsActiveModalIncome}
              onEdit={() => {
                setEditMode(true);
                setIsActiveModalIncome(false);
                setIsActiveBSIncome(true);
              }}
              onDelete={loadIncomes}
            />
          )}

          {isActiveBSIncome && (
            <BSIncome
              visible={isActiveBSIncome}
              setVisible={setIsActiveBSIncome}
              edit={editMode}
              income={selectedIncome}
              onSave={loadIncomes}
            />
          )}
        </View>
      )}
    </>
  );
};

export default Incomes;
