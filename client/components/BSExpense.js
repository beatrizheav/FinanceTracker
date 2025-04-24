import {
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
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

export default function BSExpense({ edit, visible, setVisible, expense }) {
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [dropdownModalVisible, setDropdownModalVisible] = useState(false);
  const refRBSheet = useRef();

  useEffect(() => {
    if (visible && refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
  };

  const [expenseData, setExpenseData] = useState({
    name: "",
    description: "",
    quantity: "",
    date: new Date(),
    category: "",
    image: "",
    fixed: false,
  });

  useEffect(() => {
    if (edit) {
      setExpenseData(expense);
    }
  }, [edit]);

  const ableToDrag = !dateModalVisible && !dropdownModalVisible;

  const titleButton = edit ? "Guardar cambios" : "Agregar categoría";

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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();

    // Solo procesamos imagen si existe
    if (expenseData.image) {
      const getFileInfo = (uri) => {
        const parts = uri.split("/");
        const name = parts[parts.length - 1];
        const ext = name.split(".").pop();
        const type = `image/${ext === "jpg" ? "jpeg" : ext}`;
        return { name, type };
      };

      const { name, type } = getFileInfo(expenseData.image);
      const imageFile = createFileFromUri(expenseData.image, name, type);

      formData.append("image", imageFile.blob, imageFile.name);
    }

    formData.append("category", expenseData.category);
    formData.append("name", expenseData.name);
    formData.append("description", expenseData.description);
    formData.append("quantity", expenseData.quantity);
    formData.append(
      "date",
      expenseData.date.toISOString().slice(0, 19).replace("T", " ")
    );
    formData.append("fixed", expenseData.fixed ? 1 : 0); // 👈 importante también

    try {
      const data = await apiClient.post("/expenses/add", formData);
      alert("Gasto '" + data.expense.name + "' creado");
      handleClose();
    } catch (error) {
      alert("Error al crear el gasto: " + error.message);
    }
  };

  console.log(expenseData);

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
                  value={expenseData.quantity}
                  onChange={(text) =>
                    handleInputChange(setExpenseData, "quantity", text)
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
                <CustomButton
                  title={titleButton}
                  background={"green"}
                  onPress={handleSubmit}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </RBSheet>
  );
}
