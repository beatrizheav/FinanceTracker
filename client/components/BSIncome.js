import { TouchableWithoutFeedback, View, Keyboard, Alert } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { handleInputChange } from "../hooks/handleInputChange";
import CustomInput from "./CustomInput";
import DatePicker from "./DatePicker";
import CustomButton from "./CustomButton";
import { sheets } from "../styles/components/bottom-sheets";
import CustomCheckbox from "./CustomCheckbox";
import CustomText from "./CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFormValidation from "../hooks/useFormValidation";
import apiClient from "../api/apiClient";

export default function BSExpense({
  edit,
  visible,
  setVisible,
  income,
  onSave,
}) {
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
    userId: "",
    name: "",
    amount: "",
    date: new Date(),
    fixed: false,
  });
  useEffect(() => {
    const loadUserId = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");
        const user = JSON.parse(userJson);
        if (user?.id) {
          setIncomeData((prev) => ({
            ...prev,
            userId: user.id,
          }));
        }
      } catch (err) {
        console.error("Error loading user ID:", err);
      }
    };

    loadUserId();
  }, []);

  useEffect(() => {
    if (edit) {
      setIncomeData({
        ...income,
       date: new Date(income.date),
       fixed: income.fixed === 1 ? true : false}
        
      );
    } else {
      setIncomeData({
        userId: "",
        name: "",
        amount: "",
        date: new Date(),
        fixed: false,
      });
    }
  }, [income, edit]);

  const ableToDrag = !dateModalVisible;

  const titleButton = edit ? "Guardar cambios" : "Agregar ingreso";

  const handleSubmit = async () => {
    const validateForm = useFormValidation(incomeData, "BSIncome");
    if (!validateForm()) return;

    const newIncome = {
      user_id: incomeData.userId,
      name: incomeData.name,
      amount: incomeData.amount,
      date: incomeData.date.toISOString().slice(0, 19).replace("T", " "),
      fixed: incomeData.fixed,
      ...(edit && {id: incomeData.id})
    };


      if(edit){
        try {
         await apiClient.put("/incomes/edit", newIncome);
          Alert.alert("Ingreso editado", "Tu ingreso fue editado correctamente",
            [
              {
                text: "Ok",
                onPress: () => {
                  onSave?.();
                },
                style: "default",
              }
            ]);
          handleClose();
        } catch (error) {
          alert("Error al editar el ingreso, por favor intentalo de nuevo");
          console.error("Error al editar el ingreso", error)
        }
      }else{
        try {
          await apiClient.post("/incomes/add", newIncome);
          Alert.alert("Ingreso agregado", "Tu ingreso fue agregado correctamente",
            [
              {
                text: "Ok",
                onPress: () => {
                  onSave?.();
                },
                style: "default",
              }
            ]);
          handleClose();
        } catch (error) {
          alert("Error al agregar el ingreso");
          console.error("Error al agregar el ingreso", error)
        }
      }
      handleClose();
  };

  return (
    <RBSheet
      closeOnPressMask={true}
      closeOnPressBack={true}
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
          <CustomText text={"Ingreso"} type={"TitleMedium"} />
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
              value={incomeData.amount}
              onChange={(text) =>
                handleInputChange(setIncomeData, "amount", text)
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
              onChange={(value) =>
                handleInputChange(setIncomeData, "fixed", value)
              }
            />
            <CustomButton
              title={titleButton}
              background={"green"}
              onPress={handleSubmit}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </RBSheet>
  );
}
