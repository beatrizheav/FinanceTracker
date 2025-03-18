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
  TitleMediumWhite: {
    ...Inter_700Bold,
    fontSize: 18,
    color: colorsTheme.white
  },
  TitleSmall: {
    ...Inter_700Bold,
    fontSize: 14,
  },
  TitleSmallWhite: {
    ...Inter_700Bold,
    fontSize: 14,
    color: colorsTheme.white
  },
  ButtonBig: {
    ...Inter_500Medium,
    fontSize: 16,
    color: colorsTheme.white
  },
  ButtonSmall: {
    ...Inter_500Medium,
    fontSize: 14,
    color: colorsTheme.white
  },
  ButtonSmallGreen: {
    ...Inter_500Medium,
    fontSize: 14,
    color: colorsTheme.darkGreen
  },
  TextBig: {
    ...Inter_400Regular,
    fontSize: 14,
  },
  TextBigGreen: {
    ...Inter_400Regular,
    fontSize: 14,
    color: colorsTheme.lightGreen
  },
  TextBigRed: {
    ...Inter_400Regular,
    fontSize: 14,
    color: colorsTheme.red
  },
  TextBigTeal: {
    ...Inter_400Regular,
    fontSize: 14,
    color: colorsTheme.teal
  },
  TextSmall: {
    ...Inter_400Regular,
    fontSize: 12,
  },
  TextSmallGray: {
    ...Inter_400Regular,
    fontSize: 12,
    color: colorsTheme.darkGray,
  },
  whiteColor: {
    color: colorsTheme.white,
  }
};
