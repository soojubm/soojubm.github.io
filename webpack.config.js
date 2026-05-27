const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackObfuscator = require('webpack-obfuscator')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin')

// 1. 페이지 및 컴포넌트 구성 데이터
const PAGES_CONFIG = {
  patterns: [
    'dashboard',
    'dialog',
    'result',
    'presentation',
    'filtering',
    'carousel',
    'setting',
    'post',
    'accordion',
    'profile',
    'feed',
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
  ],
  components: [
    'breadcrumb',
    'avatar',
    'button',
    'icon-button',
    'toggle-button-group',
    'link',
    'tag',
    'checkbox',
    'radio',
    'textfield',
    'searchfield',
    'textarea',
    'tab',
    'surface',
    'menuitem',
    'switch',
    'tooltip',
    'callout',
    'text',
    'separator',
    'thumbnail',
    'step',
    'films',
    'books',
  ],
}

const HTML_TEMPLATE = './index.html'

/**
 * 엔트리 포인트 생성 로직
 * - navbar는 index.ts 내부에서 import 하는 방식으로 변경하여 엔트리에서 제거
 */
const getEntries = () => {
  const entries = {
    // 홈 페이지 진입점
    index: ['./pages/home/home.ts', './index.ts'],
  }

  const addEntries = (list, subDir) => {
    list.forEach(item => {
      // 모든 엔트리에 index.ts를 포함시켜 공통 로직(navbar 등) 공유
      entries[item] = [`./pages/${subDir}/${item}/${item}.ts`, './index.ts']
    })
  }

  addEntries(PAGES_CONFIG.patterns, 'patterns')
  addEntries(PAGES_CONFIG.components, 'components')

  return entries
}

/**
 * HtmlWebpackPlugin 인스턴스 생성
 */
const getHtmlPlugins = () => {
  const allPages = [...PAGES_CONFIG.patterns, ...PAGES_CONFIG.components]
  return allPages.map(
    item =>
      new HtmlWebpackPlugin({
        template: HTML_TEMPLATE,
        filename: `${item}.html`,
        chunks: [item],
        minify: false,
      }),
  )
}

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'

  return {
    mode: isProd ? 'production' : 'development',
    watch: !isProd,
    target: ['web', 'es5'],
    devtool: isProd ? 'source-map' : 'inline-source-map',

    entry: getEntries(),

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isProd ? 'js/[name].[contenthash:8].js' : '[name].bundle.js',
      chunkFilename: isProd ? 'js/[name].[contenthash:8].chunk.js' : '[name].js',
      clean: true, // CleanWebpackPlugin 기능을 대체하는 내장 옵션
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true, // 타입 체크 생략으로 빌드 속도 향상
              },
            },
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: { sources: false },
        },
      ],
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // 공통 라이브러리 분리
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
          },
          // CSS 순서 충돌 및 파편화 방지
          styles: {
            name: 'styles',
            type: 'css/auto',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
      minimize: isProd,
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: HTML_TEMPLATE,
        filename: 'index.html',
        chunks: ['index'],
      }),
      ...getHtmlPlugins(),

      new MiniCssExtractPlugin({
        filename: isProd ? 'css/[name].[contenthash:8].css' : '[name].css',
        ignoreOrder: true, // CSS 순서 경고 무시
      }),

      // 프로덕션 환경 전용 도구
      ...(isProd
        ? [
            new WebpackObfuscator({ rotateStringArray: true }, ['excluded_bundle_name.js']),
            new BundleAnalyzerPlugin({ openAnalyzer: false }),
            new BundleStatsWebpackPlugin(),
          ]
        : []),
    ],

    devServer: {
      static: {
        directory: path.resolve(__dirname, './'),
      },
      compress: true,
      port: 9000,
      hot: true,
      client: {
        overlay: {
          warnings: false, // 브라우저 화면에 경고 오버레이 숨김
          errors: true,
        },
      },
    },

    // 빌드 로그 최적화
    stats: 'minimal',

    // 콘솔에서 CSS 순서 충돌 경고 숨김
    ignoreWarnings: [
      {
        module: /mini-css-extract-plugin/,
        message: /Conflicting order/,
      },
    ],
  }
}
