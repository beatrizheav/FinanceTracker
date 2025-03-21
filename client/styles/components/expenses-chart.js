export const expensesChart = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colorsTheme.lightGray,
    width: 340,
    height: 260,
    marginRight: 14,
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
    width: 10,
    height: 10,
    marginRight: 8,
    borderRadius: 50,
  },
});
