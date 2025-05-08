import {
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { handleInputChange } from "../hooks/handleInputChange";
import useFormValidation from "../hooks/useFormValidation";
import apiClient from "../api/apiClient";
import CustomInput from "./CustomInput";
import DatePicker from "./DatePicker";
import DropdownCategory from "./DropdownCategory";
import CustomButton from "./CustomButton";
import CustomCheckbox from "./CustomCheckbox";
import CustomText from "./CustomText";
import ImagePickerComponent from "./ImagePicker";
import { sheets } from "../styles/components/bottom-sheets";
import { bsExpense } from "../styles/components/bs-expense";
import { colorsTheme } from "../styles/colorsTheme";

export default function BSExpense({
  edit,
  visible,
  setVisible,
  expense,
  onSaved,
}) {
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [dropdownModalVisible, setDropdownModalVisible] = useState(false);
  const refRBSheet = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Open the bottom sheet when visible is true
    if (visible && refRBSheet.current) {
      refRBSheet.current.open();
    }

    // Set the initial state of the form when edit is true
    if (edit) {
      setExpenseData({
        ...expense,
        amount: expense.amount.toString(),
        date: new Date(expense.date),
        category: expense.category.id,
        fixed: Boolean(expense.fixed),
      });
    }
  }, [visible, edit]);

  const handleClose = () => {
    setVisible(false);
  };

  const [expenseData, setExpenseData] = useState({
    name: "",
    description: "",
    amount: "",
    date: new Date(),
    category: "",
    image: "",
    fixed: false,
  });

  const ableToDrag = !dateModalVisible && !dropdownModalVisible;

  const titleButton = edit ? "Guardar cambios" : "Agregar gasto";

  const validateForm = useFormValidation(expenseData, "bsExpense");

  const createFileFromUri = (uri, name = "image.jpg", type = "image/jpeg") => {
    return {
      blob: {
        uri,
        name,
        type,
      },
      name,
    };
  };

  const buildFormData = () => {
    const formData = new FormData();

    const append = (key, value) => formData.append(key, value);

    // if image is added and converted to file
    if (expenseData.image) {
      const { blob, name } = createFileFromUri(expenseData.image);
      append("image", blob, name);
    }

    const fields = {
      category: String(expenseData.category),
      name: expenseData.name,
      description: expenseData.description,
      quantity: String(expenseData.amount),
      date: expenseData.date.toISOString().slice(0, 19).replace("T", " "),
      fixed: expenseData.fixed ? "1" : "0",
    };

    Object.entries(fields).forEach(([key, value]) => append(key, value));

    return formData;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const formData = buildFormData();

    if (edit) {
      formData.append("id", String(expense.id));
    }

    try {
      const endpoint = edit ? "/expenses/edit" : "/expenses/add";
      const data = await apiClient.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(
        edit
          ? "Gasto actualizado correctamente"
          : `Gasto '${data.expense.name}' creado`
      );

      if (onSaved) onSaved();
      handleClose();
    } catch (error) {
      alert("Error al guardar el gasto: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RBSheet
      closeOnPressMask={true}
      closeOnPressBack={true} //Android only
      draggable={ableToDrag}
      onClose={handleClose}
      ref={refRBSheet}
      customStyles={{
        wrapper: {
          ...sheets.background,
        },
        container: {
          ...sheets.container,
        },
      }}
      customModalProps={{
        animationType: "none",
        statusBarTranslucent: false,
      }}
      height={720}
    >
      <View testID="BS-Expense">
        <View style={sheets.header}>
          <CustomText text={"Gasto"} type={"TitleMedium"} />
        </View>
        <KeyboardAvoidingView>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={bsExpense.scrollview}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <CustomInput
                  type={"text"}
                  label={"Nombre"}
                  placeholder={"Ingresa el nombre del gasto"}
                  value={expenseData.name}
                  onChange={(text) =>
                    handleInputChange(setExpenseData, "name", text)
                  }
                />
                <CustomInput
                  type={"paragraph"}
                  label={"Descripción (Opcional)"}
                  placeholder={"Ingresa una descripción"}
                  value={expenseData.description}
                  onChange={(text) =>
                    handleInputChange(setExpenseData, "description", text)
                  }
                />
                <CustomInput
                  type={"number"}
                  label={"Monto"}
                  placeholder={"Ingresa el monto del gasto"}
                  value={expenseData.amount}
                  onChange={(text) =>
                    handleInputChange(setExpenseData, "amount", text)
                  }
                />
                <DatePicker
                  show={dateModalVisible}
                  setShow={setDateModalVisible}
                  date={expenseData.date}
                  setDate={(date) =>
                    handleInputChange(setExpenseData, "date", date)
                  }
                />
                <DropdownCategory
                  show={dropdownModalVisible}
                  setShow={setDropdownModalVisible}
                  value={expenseData.category}
                  setValue={(category) =>
                    handleInputChange(setExpenseData, "category", category)
                  }
                />
                <ImagePickerComponent
                  image={expenseData.image}
                  setImage={(image) =>
                    handleInputChange(setExpenseData, "image", image)
                  }
                />
                <CustomCheckbox
                  text={"Gasto fijo mensual"}
                  fixed={expenseData.fixed}
                  onChange={(value) =>
                    handleInputChange(setExpenseData, "fixed", value)
                  }
                />
                {isLoading ? (
                  <View style={bsExpense.loading}>
                    <CustomText
                      text={"Cargando..."}
                      type={"TitleMedium"}
                      color={colorsTheme.darkGreen}
                    />
                  </View>
                ) : (
                  <CustomButton
                    title={titleButton}
                    background={"green"}
                    onPress={handleSubmit}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </RBSheet>
  );
}
