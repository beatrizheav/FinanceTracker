import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import CustomTitle from "./CustomTitle";
import { expensesChart } from "../styles/components/expenses-chart";
import { categories } from "../constants/categories";

// Obtener el ancho de la pantalla
const screenWidth = Dimensions.get("window").width;

const ExpensesChart = () => {
  // Ordenar las categorías por el total de gastos de mayor a menor
  const sortedCategories = [...categories].sort(
    (a, b) => b.totalExpenses - a.totalExpenses
  );

  // Obtener los 5 principales gastos
  const topCategories = sortedCategories.slice(0, 5);

  // Sumar los gastos de las categorías restantes y crear una categoría "Otros"
  const otherExpenses = sortedCategories
    .slice(5)
    .reduce((acc, curr) => acc + curr.totalExpenses, 0);

  // Agregar la categoría "Otros" al final de los 5 principales
  const finalData = [
    ...topCategories,
    {
      name: "Otros",
      totalExpenses: otherExpenses,
      color: "#b0bec5", // Puedes elegir otro color para "Otros"
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={expensesChart.container} testID="expenses-chart">
      <CustomTitle title={"Distribución de gastos"} type={"TitleSmall"} />
      <View style={expensesChart.graphContainer}>
        {/* Lista personalizada a la izquierda */}
        <View style={expensesChart.legendContainer}>
          {finalData.map((item, index) => (
            <View key={index} style={expensesChart.legendItem}>
              <View
                style={[
                  expensesChart.legendColor,
                  { backgroundColor: item.color },
                ]}
              />
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>

        {/* Gráfico circular */}
        <PieChart
          testID="pie-chart"
          data={finalData}
          width={screenWidth * 0.6}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="totalExpenses" // Se debe usar "population" en lugar de "totalExpenses"
          backgroundColor="transparent"
          paddingLeft="0"
          hasLegend={false} // Deshabilitar la leyenda automática
          center={[25, 0]}
        />
      </View>
    </View>
  );
};

export default ExpensesChart;
