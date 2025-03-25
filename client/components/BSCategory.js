import { View, Text } from "react-native";
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
import { general } from "../styles/general";

export default function BSCategory({ action, visible, setVisible, category }) {
  const refRBSheet = useRef();

  useEffect(() => {
    if (visible) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [visible]);

  const [categoryData, setCategoryData] = useState({
    name: "",
    budget: "",
    color: null,
    icon: null,
  });

  console.log(categoryData);

  return (
    <View style={sheets.container}>
      <RBSheet
        closeOnPressMask={true}
        onClose={() => setVisible(false)}
        ref={refRBSheet}
        customStyles={{
          container: {
            ...general.safeArea,
            ...sheets.sheetStyles,
            ...bsCategory.sheetCategory,
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: false,
        }}
      >
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
              />
            </View>
            <View style={bsCategory.picker}>
              <IconPicker
                icon={categoryData.icon}
                setIcon={(icon) =>
                  handleInputChange(setCategoryData, "icon", icon)
                }
              />
            </View>
          </View>
        </View>
        <CustomButton title={"Agregar categoría"} background={"green"} />
      </RBSheet>
    </View>
  );
}
