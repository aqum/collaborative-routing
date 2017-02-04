const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.tsx',
  ],
  output: {
    path: path.resolve('./dist'),
    filename: '[name].[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.(tsx|ts)$/,
        loaders: ['react-hot', 'ts'],
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
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js'],
  },
};
