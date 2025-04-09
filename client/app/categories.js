import { View, FlatList } from "react-native";
import React from "react";
import Header from "../components/Header";
import ActivityDisplay from "../components/ActivityDisplay";
import { categories } from "../constants/categories";
import AddButton from "../components/AddButton";
import { general } from "../styles/general";

export default function CategoriesScreen() {
  return (
    <View style={general.safeArea}>
      <Header title={"Categorías"} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
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
      <AddButton />
    </View>
  );
}
