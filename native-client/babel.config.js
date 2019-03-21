module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:react-native-dotenv', 'babel-preset-expo'],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
  };
};
