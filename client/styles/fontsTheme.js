import { colorsTheme } from "./colorsTheme";

const createFontStyle = (fontWeight) => ({
  fontFamily: `Inter_${fontWeight}`,
  color: colorsTheme.black,
});

const Inter_400Regular = createFontStyle("400Regular");
const Inter_500Medium = createFontStyle("500Medium");
const Inter_700Bold = createFontStyle("700Bold");

export const fontsTheme = {
  TitleBig: {
    ...Inter_700Bold,
    fontSize: 24,
  },
  TitleMedium: {
    ...Inter_700Bold,
    fontSize: 18,
  },
  TitleSmall: {
    ...Inter_700Bold,
    fontSize: 14,
  },
  ButtonBig: {
    ...Inter_500Medium,
    fontSize: 16,
  },
  ButtonSmall: {
    ...Inter_500Medium,
    fontSize: 14,
  },
  TextBig: {
    ...Inter_400Regular,
    fontSize: 14,
  },
  TextSmall: {
    ...Inter_400Regular,
    fontSize: 12,
  },
};
