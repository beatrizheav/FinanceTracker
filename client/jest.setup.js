jest.mock('expo-font');

jest.mock('@expo/vector-icons', () => {
    return {
      Ionicons: ({ name, ...props }) => {
        const React = require('react');
        const { Text } = require('react-native');
        return <Text {...props}>{name}</Text>;
      },
    };
  });

  jest.mock('./components/CustomTitle.js', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return {
      __esModule: true,
      default: ({ title }) => <Text>{title}</Text>,
    };
  });