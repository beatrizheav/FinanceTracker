import React from "react";
import { View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import CustomText from "./CustomText";
import { expensesChart } from "../styles/components/expenses-chart";

// Obtener el ancho de la pantalla
const screenWidth = Dimensions.get("window").width;

const ExpensesChart = ({ categories }) => {
  const categoriesWithNumericExpense = categories.map((item) => ({
    ...item,
    expense: Number(item.expense), // Convertir 'expense' a número
  }));

  const sortedCategories = categoriesWithNumericExpense.sort(
    (a, b) => b.expense - a.expense
  );

  // Obtener los 5 principales gastos
  const topCategories = sortedCategories.slice(0, 5);

  // Sumar los gastos de las categorías restantes y crear una categoría "Otros"
  const otherExpenses = sortedCategories
    .slice(5)
    .reduce((acc, curr) => acc + curr.expense, 0);

  // Agregar la categoría "Otros" al final de los 5 principales
  const finalData = [
    ...topCategories,
    {
      name: "Otros",
      expense: otherExpenses,
      color: "#EEEEEE", // Puedes elegir otro color para "Otros"
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={expensesChart.container} testID="expenses-chart">
      <CustomText title={"Distribución de gastos"} type={"TitleSmall"} />
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
              <CustomText type={"TextBig"} text={item.name} />
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
          accessor="expense"
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
