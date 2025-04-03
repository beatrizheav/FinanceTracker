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
import CustomTitle from "./CustomTitle";
import CustomInput from "./CustomInput";
import DatePicker from "./DatePicker";
import DropdownCategory from "./DropdownCategory";
import CustomButton from "./CustomButton";
import ImagePickerComponent from "./ImagePicker";
import { sheets } from "../styles/components/bottom-sheets";
import { bsExpense } from "../styles/components/bs-expense";
import CustomCheckbox from "./CustomCheckbox";

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
          <CustomTitle title={"Gasto"} type={"TitleMedium"} />
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
                />
                <CustomButton title={titleButton} background={"green"} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </RBSheet>
  );
}
