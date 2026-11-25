// Babel compila los archivos TypeScript y TSX para Expo.
module.exports = function (api) {
  api.cache(true);
  return { presets: ['babel-preset-expo'] };
};
