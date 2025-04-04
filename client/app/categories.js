import { View, FlatList } from "react-native";
import React from "react";
import { categoriesScreen } from "../styles/screens/categories";
import Header from "../components/Header";
import ActivityDisplay from "../components/ActivityDisplay";
import { categoriesData } from "../constants/categories";
import AddButton from "../components/AddButton";
import { general } from "../styles/general";

export default function CategoriesScreen() {
  return (
    <View style={general.safeArea}>
      <Header title={"Categorías"} />
      <View style={categoriesScreen.listContainer}>
        <FlatList
          data={categoriesData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ActivityDisplay
              name={item.name}
              category={item}
              screen={"category"}
              quantity={item.budget}
            />
          )}
        />
      </View>
      <AddButton />
    </View>
  );
}
