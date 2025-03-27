import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { handleInputChange } from "../hooks/handleInputChange";
import CustomTitle from "./CustomTitle";
import CustomInput from "./CustomInput";
import ColorPicker from "./ColorPicker";
import IconPicker from "./IconPicker";
import CustomButton from "./CustomButton";
import { sheets } from "../styles/components/bottom-sheets";
import { bsCategory } from "../styles/components/bs-category";

export default function BSCategory({ edit, visible, setVisible, category }) {
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [iconModalVisible, setIconModalVisible] = useState(false);
  const refRBSheet = useRef();

  useEffect(() => {
    if (visible && refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
  };

  const [categoryData, setCategoryData] = useState({
    name: "",
    budget: "",
    color: null,
    icon: null,
  });

  useEffect(() => {
    if (edit) {
      setCategoryData(category);
    }
  }, [edit]);

  const ableToDrag = !colorModalVisible && !iconModalVisible;

  const titleButton = edit ? "Guardar cambios" : "Agregar categoría";

  return (
    <RBSheet
      closeOnPressMask={true}
      closeOnPressBack={true} //Android only
      draggable={ableToDrag}
      dragOnContent={ableToDrag}
      onClose={handleClose}
      ref={refRBSheet}
      customStyles={{
        wrapper: {
          ...sheets.background,
        },
        container: {
          ...sheets.container,
          ...bsCategory.sheetCategory,
        },
      }}
      customModalProps={{
        animationType: "none",
        statusBarTranslucent: false,
      }}
      height={500}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={sheets.header}>
            <CustomTitle title={"Categoría"} type={"TitleMedium"} />
          </View>
          <View>
            <CustomInput
              type={"text"}
              label={"Nombre"}
              placeholder={"Ingresa el nombre de la categoría"}
              value={categoryData.name}
              onChange={(text) =>
                handleInputChange(setCategoryData, "name", text)
              }
            />
            <CustomInput
              type={"number"}
              label={"Presupuesto"}
              placeholder={"Ingresa el presupuesto de la categoría"}
              value={categoryData.budget}
              onChange={(text) =>
                handleInputChange(setCategoryData, "budget", text)
              }
            />
            <View style={bsCategory.pickersContainers}>
              <View style={bsCategory.picker}>
                <ColorPicker
                  color={categoryData.color}
                  setColor={(color) =>
                    handleInputChange(setCategoryData, "color", color)
                  }
                  show={colorModalVisible}
                  setShow={setColorModalVisible}
                />
              </View>
              <View style={bsCategory.picker}>
                <IconPicker
                  icon={categoryData.icon}
                  setIcon={(icon) =>
                    handleInputChange(setCategoryData, "icon", icon)
                  }
                  show={iconModalVisible}
                  setShow={setIconModalVisible}
                />
              </View>
            </View>
          </View>
          <CustomButton title={titleButton} background={"green"} />
        </View>
      </TouchableWithoutFeedback>
    </RBSheet>
  );
}
