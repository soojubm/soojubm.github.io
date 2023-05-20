const path = require('path')

const postcssPresetEnv = require('postcss-preset-env')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
// const StylelintPlugin = require('stylelint-webpack-plugin')
// [name].css => main.css / chunkFilename: '[id].css'

var WebpackObfuscator = require('webpack-obfuscator')

// const isDevMode = process.env.NODE_ENV.includes('dev')
// const devMode = process.env.NODE_ENV !== "production";

// const header = fs.readFileSync(__dirname + '/header.html')
const HTML_TEMPLATE = './index.html'

// new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG'])

module.exports = new SpeedMeasurePlugin().wrap({
  // mode: 'production', // development, production, none
  devtool: 'inline-source-map',
  entry: {
    index: {
      import: './index.ts',
      // dependOn: 'shared',
    },
    // another: {
    //   import: './public/javascripts/another.ts',
    //   dependOn: 'shared',
    // },
    // shared: 'lodash',
    // index: './index.ts',
    // another: './public/javascripts/another-module.ts',
  },
  output: {
    // filename: '[name].bundle.js',
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
    // publicPath: './',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  watch: true,
  target: ['web', 'es5'],

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      filename: 'index.html',
      main: '<b>this is main</b>',
    }),
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      filename: 'subTest.html',
      chunks: ['another'],
      main: 'subTest.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      // minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      // chunkFilename: '[id].[contenthash].css',
    }),
    new WebpackObfuscator({ rotateStringArray: true }, ['excluded_bundle_name.js']),
    new BundleAnalyzerPlugin(),
    // new CompressionPlugin({}),
    // new FriendlyErrorsWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        // options: {
        //   presets: ['@babel/preset-env'],
        // },
      },
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.(sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], // 뒤부터. style-loader 대신 mini
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|webp)$/i,
      //   use: ['file-loader'],
      // },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {
          compress: { drop_console: false },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    concatenateModules: true,
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    },
    compress: true,
    host: 'localhost',
    port: 9000,
  },
})

// cache: {
//   type: 'filesystem',
//   compression: 'gzip',
// },
