const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// const CopyPlugin = require('copy-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
// const StylelintPlugin = require('stylelint-webpack-plugin')
// [name].css => main.css / chunkFilename: '[id].css' 


const path = require('path')

// const devMode = process.env.NODE_ENV !== "production";

module.exports = new SpeedMeasurePlugin().wrap({
  mode: 'none', // development, production, none
  devtool: 'inline-source-map',
  entry: './public/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
    // publicPath: '/test',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  watch: true,
  target: ['web', 'es5'],

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'style.css' }),

    new HtmlWebpackPlugin({ template: './index.html', filename: 'index.html' }),

    new BundleAnalyzerPlugin(),
    // new FriendlyErrorsWebpackPlugin(),
  ],

  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.(sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: false },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    concatenateModules: true,
  },
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    host: 'localhost',
    port: 9000,
  },
})
