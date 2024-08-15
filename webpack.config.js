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

const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin')

const postcssPresetEnv = require('postcss-preset-env')

const path = require('path')

// const header = fs.readFileSync(__dirname + '/header.html')

// entry key랑 맞아야 함. key는 무엇
const HTML_TEMPLATE = './index.html'

const patterns = [
  'layout',
  'dashboard',
  'dialog',
  'result',
  'searching',
  'presentation',
  'filtering',
  'chat',
  'carousel',

  'setting',
  'post',
  'accordion',
  'profile',
  'feed',
  'timeline',
  'notification',
  'auth',
  'product',
  'contact',
  'checkout',
  'cake',
  'class',

  'table',

  'signifier',
  'tokens',

  'utilites',
]
const components = [
  'breadcrumb',

  'avatar',

  'button',
  'chip',
  'tag',
  'checkbox',
  'radio',
  'textfield',

  'tab',
  'bar',

  'tile',
  'panel',
  'menuitem',
  'switch',
  'tooltip',
  'callout',
  'text',
  'separator',

  'step',

  'films',
  'books',

  'components',
]

let test = {}
components.forEach(item => {
  test = {
    ...test,
    [item]: [`./pages/components/${item}/${item}.ts`, './index.ts'],
  }
})

let test2 = {}
patterns.forEach(item => {
  test2 = {
    ...test2,
    [item]: [`./pages/patterns/${item}/${item}.ts`, './index.ts'],
  }
})

const setPages = data =>
  data.map(item => {
    return new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      filename: `${item}.html`,
      chunks: [`${item}`],
    })
  })

module.exports = {
  mode: 'development', // development, production, none
  watch: true,
  target: ['web', 'es5'],
  devtool: 'inline-source-map',
  entry: {
    index: ['./pages/home/home.ts', './public/javascripts/common/navbar.ts', './index.ts'],
    ...test,
    ...test2,
  },
  output: {
    path: path.resolve(__dirname, './build'), // 기본값은 dist
    filename: '[name].bundle.js',
    chunkFilename: '[name].js',
    // publicPath: './',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  // 용량. 속도 기하급수적 증가; + navbar 뺀까 번들 용량 오히려 커짐.
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  stats: {
    // required
    assets: true,
    chunks: true,
    modules: true,
    // optional
    builtAt: true,
    hash: true,
  },

  plugins: [
    new CleanWebpackPlugin(), // output path 정의되어야 한다.
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      filename: 'index.html',
      chunks: ['index'],
      //   inject: true,
      //   main: './pages/tokens.html',

      //   minify: {
      //     collapseWhitespace: true,
      //     removeComments: true,
      //   },
    }),
    new MiniCssExtractPlugin({
      linkType: false,
      filename: '[name].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: true,
    }),

    ...setPages(patterns),
    ...setPages(components),

    new WebpackObfuscator({ rotateStringArray: true }, ['excluded_bundle_name.js']),
    new BundleAnalyzerPlugin(),
    new BundleStatsWebpackPlugin(),
    // new CompressionPlugin({}),
    // new FriendlyErrorsWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: false,
        },
      },
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
      // { test: /\.handlebars$/, loader: "handlebars-loader" },
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
      // {
      //   test: /\.(png|jpe?g|gif|svg|webp)$/i,
      //   use: ['file-loader'],
      // },
    ],
  },

  // optimization: {
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
