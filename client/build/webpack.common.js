const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    './src/index.tsx',
  ],
  output: {
    path: path.resolve('./dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.(tsx|ts)$/,
        loaders: ['react-hot', 'awesome-typescript'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.svg/,
        loaders: ['raw'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html'),
    }),
    new CleanWebpackPlugin(['dist']),
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js'],
  },
};
