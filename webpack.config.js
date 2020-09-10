/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.resolve(__dirname, 'demo');
const outPath = path.resolve(__dirname, 'docs');

const NODE_ENV = process.env.NODE_ENV || 'development';

const isDevelopment = NODE_ENV === 'development';

module.exports = {
  mode: NODE_ENV,
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  entry: srcPath,
  output: {
    path: outPath,
    filename: '[hash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: isDevelopment ? 'inline-source-map' : '',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(srcPath, 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devServer: {
    contentBase: outPath,
  },
};
