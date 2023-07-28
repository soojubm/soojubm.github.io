const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// speedMeasurePlugin miniCssExtractPlugin 충돌
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// const CopyPlugin = require('copy-webpack-plugin')
// const StylelintPlugin = require('stylelint-webpack-plugin')
// [name].css => main.css / chunkFilename: '[id].css'

const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
var WebpackObfuscator = require('webpack-obfuscator')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const postcssPresetEnv = require('postcss-preset-env')

const path = require('path')

// const header = fs.readFileSync(__dirname + '/header.html')

// entry key랑 맞아야 함. key는 무엇
const HTML_TEMPLATE = './index.html'

const patterns = [
  'dialog',
  'result',
  'searching',
  'presentation',
  'filtering',
  'chat',
  'setting',
  'post',
  'accordion',
  'profile',
  'feed',
  'notification',
  'auth',
]
const components = [
  'breadcrumb',
  'signifier',

  'avatar',

  'entity',

  'button',
  'chip',
  'tag',
  'checkbox',
  'radio',
  'textfield',
  'tile',
  'menuitem',
  'switch',
  'tooltip',
  'callout',
  'text',
  'bar',
]

// let t = {}
// const temp = components.forEach(item => {
//   t = [item] = [`./pages/components/${item}/${item}.ts`, './public/javascripts/common/navbar.ts', './index.ts']
// })

const setPages = data =>
  data.map(item => {
    return new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      filename: `${item}.html`,
      chunks: [`${item}`],
    })
  })

let test = {}
components.forEach(item => {
  test = {
    ...test,
    [item]: [`./pages/components/${item}/${item}.ts`, './public/javascripts/common/navbar.ts', './index.ts'],
  }
})

let test2 = {}
patterns.forEach(item => {
  test2 = {
    ...test2,
    [item]: [`./pages/patterns/${item}/${item}.ts`, './public/javascripts/common/navbar.ts', './index.ts'],
  }
})

module.exports = {
  mode: 'development', // development, production, none
  watch: true,
  target: ['web', 'es5'],
  devtool: 'inline-source-map',
  entry: {
    index: ['./pages/home/home.ts', './public/javascripts/common/navbar.ts', './index.ts'],
    tokens: ['./pages/tokens/tokens.ts', './public/javascripts/common/navbar.ts', './index.ts'],
    components: ['./pages/components/components.ts', './public/javascripts/common/navbar.ts', './index.ts'],

    ...test,
    ...test2,
    // button: ['./pages/components/button/button.ts', './public/javascripts/common/navbar.ts', './index.ts'],
    // avatar: ['./pages/components/avatar/avatar.ts', './public/javascripts/common/navbar.ts', './index.ts'],
    // textfield: ['./pages/components/textfield/textfield.ts', './public/javascripts/common/navbar.ts', './index.ts'],
    // chip: ['./pages/components/chip/chip.ts', './public/javascripts/common/navbar.ts', './index.ts'],
    // checkbox: ['./pages/components/checkbox/checkbox.ts', './public/javascripts/common/navbar.ts', './index.ts'],
    // radio: ['./pages/components/radio/radio.ts', './public/javascripts/common/navbar.ts', './index.ts'],
    // menuitem: ['./pages/components/menuitem/menuitem.ts', './public/javascripts/common/navbar.ts', './index.ts'],
  },
  output: {
    path: path.resolve(__dirname, './build'), // 기본값은 dist
    filename: '[name].bundle.js',
    // xhtml: 'pages/tokens.html',
    chunkFilename: '[name].js',
    // publicPath: './',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new CleanWebpackPlugin(), // output path 정의되어야 한다.

    new MiniCssExtractPlugin({
      linkType: false,
      filename: '[name].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      filename: 'tokens.html',
      chunks: ['tokens'],
    }),
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      filename: 'components.html',
      chunks: ['components'],
      // main: './pages/tokens.html',
      // inject: true,
      // minify: {
      //   collapseWhitespace: true,
      //   removeComments: true,
      // },
    }),

    ...setPages(patterns),
    ...setPages(components),

    new WebpackObfuscator({ rotateStringArray: true }, ['excluded_bundle_name.js']),
    new BundleAnalyzerPlugin(),
    // new CompressionPlugin({}),
    // new FriendlyErrorsWebpackPlugin(),
  ],

  module: {
    rules: [
      // { test: /\.handlebars$/, loader: "handlebars-loader" },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: false,
        },
      },
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   dependency: { not: ['url'] },
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //       },
      //     },
      //   ],
      // },
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        // test: /\.(sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'], // 뒤부터.
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|webp)$/i,
      //   use: ['file-loader'],
      // },
    ],
  },

  // optimization: {

  //   splitChunks: {
  //     chunks: 'all',
  //   },
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       // minify: TerserPlugin.uglifyJsMinify,
  //       terserOptions: {
  //         compress: { drop_console: false },
  //       },
  //     }),
  //     new CssMinimizerPlugin(),
  //   ],
  //   concatenateModules: true,
  // },

  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    },
    compress: true,
    host: 'localhost',
    port: 9000,
  },
}

// cache: {
//   type: 'filesystem',
//   compression: 'gzip',
// },
