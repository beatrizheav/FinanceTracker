import { ActivityIndicator, View, FlatList, Platform } from "react-native";
import React, { useState } from "react";
import useCategories from "../hooks/useCategories";
import Header from "../components/Header";
import ActivityDisplay from "../components/ActivityDisplay";
import AddButton from "../components/AddButton";
import ModalCategory from "../components/ModalCategory";
import BSCategory from "../components/BSCategory";
import CustomText from "../components/CustomText";
import { general } from "../styles/general";
import { categoriesStyles } from "../styles/screens/categories";
const categoriesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isActiveModalCategory, setIsActiveModalCategory] = useState(false);
  const [isActiveBSCategory, setIsActiveBSCategory] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const height =
    Platform.OS === "android"
      ? categoriesStyles.containerAnd
      : categoriesStyles.containerIos;

  const showModalCategory = (category) => {
    setSelectedCategory(category);
    setIsActiveModalCategory(true);
  };

  const showBottom = () => {
    setSelectedCategory(null);
    setEditMode(false);
    setIsActiveBSCategory(true);
  };

  const { categories, loading, getCategories } = useCategories();

  const handleCategoryCreated = () => {
    getCategories();
    setIsActiveBSCategory(false);
  };

  return (
    <View style={general.safeArea}>
      <Header title={"Categorías"} />
      <View style={height}>
        {loading ? (
          <View style={categoriesStyles.loader}>
            <ActivityIndicator size="large" color="#466146" />
          </View>
        ) : categories.length === 0 ? (
          <View>
            <CustomText
              text={"No tienes ninguna Categoría creada todavía"}
              type={"TextSmall"}
              numberOfLines={0}
            />
          </View>
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ActivityDisplay
                name={item.name}
                amount={item.expense}
                color={item.color}
                category={item.icon}
                onPress={() => showModalCategory(item)}
                screen={"category"}
                testID="mock-category-item"
              />
            )}
          />
        )}
      </View>
      <AddButton onPress={showBottom} />
      {isActiveModalCategory && selectedCategory && (
        <ModalCategory
          {...selectedCategory}
          setIsActiveModalCategory={setIsActiveModalCategory}
          onEdit={() => {
            setEditMode(true);
            setIsActiveModalCategory(false);
            setIsActiveBSCategory(true);
          }}
        />
      )}
      {isActiveBSCategory && (
        <BSCategory
          visible={isActiveBSCategory}
          setVisible={setIsActiveBSCategory}
          edit={editMode}
          category={selectedCategory}
          onCreate={handleCategoryCreated}
        />
      )}
    </View>
  );
};

export default categoriesScreen;
