const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const CopyPlugin = require('copy-webpack-plugin')

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const CompressionPlugin = require('compression-webpack-plugin')

const StylelintPlugin = require('stylelint-webpack-plugin')

const path = require('path')

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
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './index.html', filename: 'index.html' }),
    new MiniCssExtractPlugin({ filename: 'style.css', chunkFilename: '[id].css' }), // [name].css => main.css
    // new CompressionPlugin({
    //   compressionOptions: {
    //     numiterations: 15,
    //   },
    //   algorithm(input, compressionOptions, callback) {
    //     return zopfli.gzip(input, compressionOptions, callback)
    //   },
    // }),
    // new CopyPlugin([{ from: 'public', to: 'public' }]),

    // new StylelintPlugin(),

    new BundleAnalyzerPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
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
