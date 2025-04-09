import { View, FlatList, Platform } from "react-native";
import React, {useState} from "react";
import { categories } from "../styles/screens/categories";
import Header from "../components/Header";
import ActivityDisplay from "../components/ActivityDisplay";
import { categoriesData } from "../constants/categories";
import AddButton from "../components/AddButton";
import { general } from "../styles/general";
import ModalCategory from "../components/ModalCategory";
import BSCategory from "../components/BSCategory";
import CustomText from "../components/CustomText";

const categoriesScreen = ({ data = categoriesData })  => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isActiveModalCategory, setIsActiveModalCategory] = useState(false);
  const [isActiveBSCategory, setIsActiveBSCategory] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const height = Platform.OS === "android" ? categories.containerAnd : categories.containerIos;

  const showModalCategory = (category) => {
    setSelectedCategory(category);
    setIsActiveModalCategory(true);
  };

  const showBottom = () => {
    setSelectedCategory(null);
    setEditMode(false);
    setIsActiveBSCategory(true);
  }
  return (
    <View style={general.safeArea}>
      <Header title={"Categorías"} />
      <View style={height}>
      { data.length === 0
        ?<View>
          <CustomText text={'No tienes ninguna Categoría creada todavía'} type={'TextSmall'} numberOfLines={0} />
         </View>
        : <FlatList
        data={data}
        keyExtractor={item => item.categoryId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ActivityDisplay
            name={item.name}
            quantity={item.budget}
            color={item.color}
            category={item.icon}
            onPress={()=> showModalCategory(item)}
            screen={"category"}
            testID="mock-category-item"
          />
        )}
      /> }
      </View>
      <AddButton onPress={showBottom}/>
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
        <BSCategory
        visible={isActiveBSCategory}
        setVisible={setIsActiveBSCategory}
        edit={editMode}
        category={selectedCategory}
      />
    </View>
  );
}

export default categoriesScreen