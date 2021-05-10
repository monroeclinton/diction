module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: false,
    }],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
  ],
};
