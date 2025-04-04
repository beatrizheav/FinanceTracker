import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { handleInputChange } from "../hooks/handleInputChange";
import CustomTitle from "./CustomTitle";
import CustomInput from "./CustomInput";
import DatePicker from "./DatePicker";
import CustomButton from "./CustomButton";
import { sheets } from "../styles/components/bottom-sheets";
import CustomCheckbox from "./CustomCheckbox";

export default function BSExpense({ edit, visible, setVisible, income }) {
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const refRBSheet = useRef();

  useEffect(() => {
    if (visible && refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
  };

  const [incomeData, setIncomeData] = useState({
    name: "",
    quantity: "",
    date: new Date(),
    fixed: false,
  });

  useEffect(() => {
    if (edit) {
      setIncomeData(income);
    }else{
      setIncomeData({
        name: "",
        quantity: "",
        date: new Date(),
        fixed: false,
      });
    }
  }, [income, edit]);

  const ableToDrag = !dateModalVisible;

  const titleButton = edit ? "Guardar cambios" : "Agregar ingreso";

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
      height={500}
    >
      <View testID="BS-Income">
        <View style={sheets.header}>
          <CustomTitle title={"Ingreso"} type={"TitleMedium"} />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <CustomInput
              type={"text"}
              label={"Nombre"}
              placeholder={"Ingresa el nombre del ingreso"}
              value={incomeData.name}
              onChange={(text) =>
                handleInputChange(setIncomeData, "name", text)
              }
            />
            <CustomInput
              type={"number"}
              label={"Monto"}
              placeholder={"Ingresa el monto del ingreso"}
              value={incomeData.quantity}
              onChange={(text) =>
                handleInputChange(setIncomeData, "quantity", text)
              }
            />
            <DatePicker
              show={dateModalVisible}
              setShow={setDateModalVisible}
              date={incomeData.date}
              setDate={(date) => handleInputChange(setIncomeData, "date", date)}
            />
            <CustomCheckbox
              text={"Ingreso fijo mensual"}
              fixed={incomeData.fixed}
            />
            <CustomButton title={titleButton} background={"green"} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </RBSheet>
  );
}
