module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
       'react-native-reanimated/plugin',
    ],
  };
};
