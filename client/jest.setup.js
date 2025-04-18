jest.mock("expo-font");

// Mock de todos los íconos que puedas usar (agrega los que uses)
jest.mock("@expo/vector-icons", () => ({
  Ionicons: ({ name, ...props }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return <Text {...props}>Ionicon: {name}</Text>;
  },
  FontAwesome: ({ name, ...props }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return <Text {...props}>Icon: {name}</Text>;
  },
}));
