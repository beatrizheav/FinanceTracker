import {
  View,
  Modal,
  Alert,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import CustomButton from "./CustomButton";
import ModalDetail from "./ModalDetail";
import CustomInput from "./CustomInput";
import CategoryIcon from "./CategoryIcon";
import CustomText from "./CustomText";
import ImagePickerComponent from "./ImagePicker";
import { modalExpense } from "../styles/components/modal-expense";
import { colorsTheme } from "../styles/colorsTheme";
import apiClient from "../api/apiClient";

const ModalExpense = ({
  category = {},
  name,
  date,
  amount = 0,
  description,
  image,
  id,
  onEdit,
  onDelete,
  setIsActiveModalExpense,
}) => {
  const formatNameCategory = category.name
    ? category.name
    : "Categoria no encontrada"; //Validates if there is data in the title, if not, sets a default title
  const formatNameExpense = name ? name : "Titulo no encontrado";
  const formatDate = date
    ? format(date, "dd 'de' MMMM yyyy", { locale: es })
    : "fecha no encontrada"; //takes the date and formats it
  const validQuantity = Number(amount) || 0;
  const amountText = amount
    ? `- $ ${validQuantity.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "$ 0.00"; //Validates if there is data in the amount, if not, sets a default amount
  const validImage = image ? image : false;
  const heightModal = image
    ? Platform.OS === "android"
      ? { height: "85%" }
      : { height: "77%" }
    : Platform.OS === "android"
    ? { height: "67%" }
    : { height: "60%" };
  const heightInputs = image ? { height: "37%" } : { height: "20%" };

  const deleteExpense = async () => {
    try {
      await apiClient.post("/expenses/delete", {id})
      setIsActiveModalExpense(false)
      onDelete?.()
      Alert.alert("Gasto eliminado", "Tu gasto se ha eliminado correctamente")
    } catch (error){
      console.error("Error al intentar eliminar el gasto", error)
      Alert.alert("Error", "Porfavor intentalo de nuevo")
    }
  }

  const handleDelete = (id) => {
    Alert.alert(
      `Eliminar Gasto: ${name}`,
      "¿Estas seguro que deseas eliminar el gasto?",
      [
        {
          text: "Eliminar",
          onPress: () => {
            deleteExpense(id)
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

  const handleEdit = () => {
    onEdit();
  };

  const closeModal = () => {
    setIsActiveModalExpense(false);
  };
  return (
    <Modal transparent={true}>
      <TouchableWithoutFeedback onPress={closeModal} testID="modal-overlay">
        <View style={modalExpense.overlay}>
          <TouchableWithoutFeedback>
            <View style={[modalExpense.container, heightModal]}>
              <View style={modalExpense.container_closeIcon}>
                <Ionicons
                  onPress={closeModal}
                  name={"close"}
                  size={27}
                  color={colorsTheme.black}
                  testID="close-icon"
                />
              </View>
              <View>
                <View style={modalExpense.container_icon}>
                  <CategoryIcon
                    icon={category.icon}
                    type={"big"}
                    color={category.color}
                  />
                  <CustomText
                    text={formatNameCategory}
                    type={"TitleSmall"}
                    color={category.color}
                  />
                </View>
              </View>
              <View style={modalExpense.container_details}>
                <ModalDetail title={"Gasto:"} text={formatNameExpense} />
                <ModalDetail
                  title={"Cantidad:"}
                  text={amountText}
                  color={modalExpense.red.color}
                />
                <ModalDetail title={"Fecha:"} text={formatDate} />
              </View>
              <View
                style={[modalExpense.container_inputAndImage, heightInputs]}
              >
                <CustomInput
                  label={"Descripcion:"}
                  type={"paragraph"}
                  value={description}
                />
                {validImage && (
                  <ImagePickerComponent image={image} label={"Recibo:"} />
                )}
              </View>
              <View style={modalExpense.container_buttons}>
                <CustomButton
                  onPress={() => handleDelete(id)}
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

export default ModalExpense;
