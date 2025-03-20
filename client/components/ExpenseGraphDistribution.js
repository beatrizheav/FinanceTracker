import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import CustomTitle from "../components/CustomTitle";
import { colorsTheme } from "../styles/colorsTheme";

const screenWidth = Dimensions.get("window").width;

const data = [
  {
    name: "Casa",
    population: 2000,
    color: "#f00",
  },
  {
    name: "Mascota",
    population: 3000,
    color: "#0f0",
  },
  {
    name: "Comida",
    population: 5000,
    color: "#00f",
  },
];

const ChartWithCustomLegend = () => {
  return (
    <View style={styles.container}>
      <CustomTitle title={"Distribución de gastos"} type={"TitleSmall"} />
      <View style={styles.graphContainer}>
        {/* Lista personalizada a la izquierda */}
        <View style={styles.legendContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: item.color }]}
              />
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>

        {/* Gráfico circular */}
        <PieChart
          data={data}
          width={screenWidth * 0.6}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          hasLegend={false} // Deshabilitar la leyenda automática
          center={[80, 0]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colorsTheme.lightGray,
  },
  graphContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendContainer: {
    marginRight: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 15,
    height: 15,
    marginRight: 8,
    borderRadius: 50,
  },
});

export default ChartWithCustomLegend;
