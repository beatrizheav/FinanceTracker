import { Alert, View, TouchableWithoutFeedback, Modal } from "react-native";
import React from "react";
import { modalCategory } from "../styles/components/modal-category";
import ModalDetail from "./ModalDetail";
import CustomButton from "./CustomButton";
import { Ionicons } from "@expo/vector-icons";
import apiClient from "../api/apiClient";
import { colorsTheme } from "../styles/colorsTheme";
import CategoryIcon from "./CategoryIcon";

const ModalCategory = ({
  name,
  budget = 0,
  expense = 0,
  icon,
  color,
  id,
  onEdit,
  onDelete,
  setIsActiveModalCategory,
}) => {
  const formatName = name ? name : "Categoria no encontrada"; //Validates if there is data in the title, if not, sets a default title
  const formatBudget = budget
    ? ` $ ${budget.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "$ 0.00"; //Validates if there is data in the quantity, if not, sets a default quantity
  const formatTotalExpenses = expense
    ? `- $ ${expense.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "$ 0.00"; //Validates if there is data in the quantity, if not, sets a default quantity

  const deleteCategory = async () => {
    const body = { categoryId: id };

    try {
      await apiClient.post("/category/delete", body);
      setIsActiveModalCategory(false);
      onDelete?.();
      Alert.alert("Gasto eliminado", "Tu gasto se ha eliminado correctamente");
    } catch (error) {
      console.error("Error al intentar eliminar el gasto", error);
      Alert.alert("Error", "Porfavor intentalo de nuevo");
    }
  };

  const handleDelete = () => {
    //agregar la logica para eliminar el gasto
    Alert.alert(
      `Eliminar Categoria con id: ${id}`,
      "¿Estas seguro que deseas eliminar la categoria?",
      [
        {
          text: "Eliminar",
          onPress: () => {
            deleteCategory();
          },
          style: "default",
        },
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
      ]
    );
  };
  const handleEdit = (categoryId) => {
    onEdit();
  };

  const closeModal = () => {
    setIsActiveModalCategory(false);
  };
  return (
    <Modal transparent={true}>
      <TouchableWithoutFeedback onPress={closeModal} testID="modal-overlay">
        <View style={modalCategory.overlay}>
          <TouchableWithoutFeedback>
            <View style={modalCategory.container}>
              <View style={modalCategory.container_closeIcon}>
                <Ionicons
                  onPress={closeModal}
                  name={"close"}
                  size={27}
                  color={colorsTheme.black}
                  testID="close-icon"
                />
              </View>
              <View>
                <View style={modalCategory.container_icon}>
                  <CategoryIcon icon={icon} type={"big"} color={color} />
                </View>
              </View>
              <View style={modalCategory.container_details}>
                <ModalDetail title={"Categoría:"} text={formatName} />
                <ModalDetail
                  title={"Presupuesto:"}
                  text={formatBudget}
                  color={modalCategory.teal.color}
                />
                <ModalDetail
                  title={"Gastos totales:"}
                  text={formatTotalExpenses}
                  color={modalCategory.red.color}
                />
              </View>
              <View style={modalCategory.container_buttons}>
                <CustomButton
                  onPress={() => handleDelete()}
                  title={"Eliminar"}
                  background={"white"}
                  type={"modal"}
                  testID="button-Eliminar"
                />
                <CustomButton
                  onPress={() => handleEdit(id)}
                  title={"Editar"}
                  background={"green"}
                  type={"modal"}
                  testID="button-Editar"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalCategory;
