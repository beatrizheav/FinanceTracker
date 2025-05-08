import { Alert, View, TouchableWithoutFeedback, Modal } from "react-native";
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { modalIncome } from "../styles/components/modal-income";
import ModalDetail from "./ModalDetail";
import CustomButton from "./CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { colorsTheme } from "../styles/colorsTheme";
import CategoryIcon from "./CategoryIcon";
import apiClient from "../api/apiClient";

const ModalIncome = ({
  name,
  date,
  amount,
  id,
  setIsActiveModalIncome,
  onEdit,
  onDelete,
}) => {
  const userId = 2; //temporal userId
  const formatName = name ? name : "Nombre no encontrado"; //Validates if there is data in the title, if not, sets a default title
  const formatDate = date
    ? format(date, "dd 'de' MMMM yyyy", { locale: es })
    : "fecha no encontrada"; //takes the date and formats it
  const formatQuantity = amount
    ? ` $ ${amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "$ 0.00"; //Validates if there is data in the amount, if not, sets a default amount
  const icon = { iconName: "attach-money", iconSet: "MaterialIcons" };
  const color = colorsTheme.lightGreen;

  const handleDelete = async (userId, incomeId) => {
    Alert.alert(
      `Eliminar Ingreso`,
      "¿Estás seguro que deseas eliminar este ingreso?",
      [
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              const response = await apiClient.post("/incomes/delete", {
                incomeId,
              });

              Alert.alert("Ingreso eliminado correctamente.");
              setIsActiveModalIncome(false);
            } catch (error) {
              console.error("❌ Error eliminando ingreso:", error.message);
              if (error.response?.status === 403) {
                Alert.alert("No tienes permisos para eliminar este ingreso.");
              } else if (error.response?.status === 404) {
                Alert.alert("Ingreso no encontrado.");
              } else {
                Alert.alert("No se pudo eliminar el ingreso.");
              }
            }
            onDelete();
          },
          style: "destructive",
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  const handleEdit = () => {
    onEdit();
  };

  const closeModal = () => {
    setIsActiveModalIncome(false);
  };
  return (
    <Modal transparent={true}>
      <TouchableWithoutFeedback onPress={closeModal} testID="modal-overlay">
        <View style={modalIncome.overlay}>
          <TouchableWithoutFeedback>
            <View style={modalIncome.container}>
              <View style={modalIncome.container_closeIcon}>
                <Ionicons
                  onPress={closeModal}
                  name={"close"}
                  size={27}
                  color={colorsTheme.black}
                  testID="close-icon"
                />
              </View>
              <View>
                <View style={modalIncome.container_icon}>
                  <CategoryIcon icon={icon} type={"big"} color={color} />
                </View>
              </View>
              <View style={modalIncome.container_details}>
                <ModalDetail title={"Ingreso:"} text={formatName} />
                <ModalDetail
                  title={"Cantidad:"}
                  text={formatQuantity}
                  color={color}
                />
                <ModalDetail title={"fecha:"} text={formatDate} />
              </View>
              <View style={modalIncome.container_buttons}>
                <CustomButton
                  onPress={() => handleDelete(userId, id)}
                  title={"Eliminar"}
                  background={"white"}
                  type={"modal"}
                  testID="button-Eliminar"
                />
                <CustomButton
                  onPress={() => handleEdit()}
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

export default ModalIncome;
