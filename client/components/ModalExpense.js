import {
  View,
  Text,
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
import ImagePickerComponent from "./ImagePicker";
import { modalExpense } from "../styles/components/modal-expense";
import { colorsTheme } from "../styles/colorsTheme";
import { fontsTheme } from "../styles/fontsTheme";
import CategoryIcon from "./CategoryIcon";

const ModalExpense = ({
  category,
  name,
  date,
  quantity = 0,
  description,
  image,
  userId,
  expenseId,
  setIsActiveModalExpense,
}) => {
  const formatNameCategory = category.name
    ? category.name
    : "Categoria no encontrada"; //Validates if there is data in the title, if not, sets a default title
  const formatNameExpense = name ? name : "Titulo no encontrado";
  const formatDate = date
    ? format(date, "dd 'de' MMMM yyyy", { locale: es })
    : "fecha no encontrada"; //takes the date and formats it
  const validQuantity = Number(quantity) || 0;
  const quantityText = quantity
    ? `- $ ${validQuantity.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "$ 0.00"; //Validates if there is data in the quantity, if not, sets a default quantity
  const validImage = image ? image : false;
  const heightModal = image
    ? Platform.OS === "android"
      ? { height: "85%" }
      : { height: "77%" }
    : Platform.OS === "android"
    ? { height: "67%" }
    : { height: "60%" };
  const heightInputs = image ? { height: "37%" } : { height: "20%" };

  const handleDelete = (userId, expenseId) => {
    //agregar la logica para eliminar el gasto
    Alert.alert(
      `Eliminar Gasto con id ${expenseId}`,
      "¿Estas seguro que deseas eliminar el gasto?",
      [
        {
          text: "Eliminar",
          onPress: () => {
            Alert.alert("Gasto Eliminado"), setIsActiveModalExpense(false);
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

  const handleEdit = (expenseId) => {
    //agregar logica para editar el gasto
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
                  <Text
                    style={[fontsTheme.TitleSmall, { color: category.color }]}
                  >
                    {formatNameCategory}
                  </Text>
                </View>
              </View>
              <View style={modalExpense.container_details}>
                <ModalDetail title={"Gasto:"} text={formatNameExpense} />
                <ModalDetail
                  title={"Cantidad:"}
                  text={quantityText}
                  color={modalExpense.red}
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
                  onPress={() => handleDelete(userId, expenseId)}
                  title={"Eliminar"}
                  background={"white"}
                  type={"modal"}
                  testID="button-Eliminar"
                />
                <CustomButton
                  onPress={() => handleEdit(expenseId)}
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
