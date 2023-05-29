const path = require('path');
const buildDir = path.resolve(__dirname, '../');

const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'none',
  entry: path.resolve(buildDir, './app/index.jsx'),
  plugins: [
    new ESLintWebpackPlugin({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    new HTMLWebpackPlugin({
      template: path.resolve(buildDir, './public/index.html'),
      favicon: path.resolve(buildDir, './public/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(txt)$/,
        exclude: /node_modules/,
        use: ['raw-loader'],
      },
      {
        test: /\.(pdf)$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      common: path.resolve(buildDir, './app/common'),
    },
  },
  output: {
    path: path.resolve(buildDir, './dist'),
    filename: '[name].bundle.js',
  },
};
