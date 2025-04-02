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

const ModalIncome = ({
  name,
  date,
  quantity = 0,
  incomeId,
  setIsActiveModalIncome,
  onEdit,
}) => {
  const userId = 2; //temporal userId
  const formatName = name ? name : "Nombre no encontrado"; //Validates if there is data in the title, if not, sets a default title
  const formatDate = date
    ? format(date, "dd 'de' MMMM yyyy", { locale: es })
    : "fecha no encontrada"; //takes the date and formats it
  const formatQuantity = quantity
    ? ` $ ${quantity.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "$ 0.00"; //Validates if there is data in the quantity, if not, sets a default quantity
  const icon = { iconName: "attach-money", iconSet: "MaterialIcons" };
  const color = colorsTheme.lightGreen;

  const handleDelete = (userId, incomeId) => {
    //agregar la logica para eliminar el gasto
    Alert.alert(
      `Eliminar Ingreso con id: ${incomeId}`,
      "¿Estas seguro que deseas eliminar el ingreso?",
      [
        {
          text: "Eliminar",
          onPress: () => {
            Alert.alert("Ingreso Eliminado"), setIsActiveModalIncome(false);
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

  const handleEdit = (incomeId) => {
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
                  onPress={() => handleDelete(userId, incomeId)}
                  title={"Eliminar"}
                  background={"white"}
                  type={"modal"}
                  testID="button-Eliminar"
                />
                <CustomButton
                  onPress={() => handleEdit(incomeId)}
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
