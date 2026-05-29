// 💡 최상단 추가: 웹팩(JS)에서 sitemap.ts(TS) 파일을 직접 require할 수 있게 합니다.
require('ts-node').register({ transpileOnly: true })

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackObfuscator = require('webpack-obfuscator')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin')

// 💡 sitemap.ts 데이터 로드 (프로젝트 구조에 맞게 경로를 조정하세요)
const { SITEMAP } = require('./src/sitemap.ts')

const HTML_TEMPLATE = './index.html'

/**
 * 💡 사이트맵 객체를 평탄화(Flat)하면서 폴더 경로(patterns / components)를 동적으로 분류합니다.
 */
const ALL_PAGES = []
SITEMAP.forEach(node => {
  if (node.type === 'standalone') {
    if (node.id !== 'index') {
      // tokens, signifier 등은 기존에 patterns 폴더에 속해 있었음
      ALL_PAGES.push({ id: node.id, subDir: 'patterns' })
    }
  } else if (node.type === 'category') {
    const subDir = node.id === 'patterns' ? 'patterns' : 'components'
    node.items.forEach(item => {
      ALL_PAGES.push({ id: item.id, subDir: subDir })
    })
  }
})

/**
 * 엔트리 포인트 생성 로직
 */
const getEntries = () => {
  const entries = {
    // 홈 페이지 진입점
    index: ['./pages/home/home.ts', './index.ts'],
  }

  // 사이트맵에서 추출한 데이터를 기반으로 엔트리 자동 생성
  ALL_PAGES.forEach(page => {
    entries[page.id] = [`./pages/${page.subDir}/${page.id}/${page.id}.ts`, './index.ts']
  })

  return entries
}

/**
 * HtmlWebpackPlugin 인스턴스 생성
 */
const getHtmlPlugins = isProd => {
  return ALL_PAGES.map(
    page =>
      new HtmlWebpackPlugin({
        template: HTML_TEMPLATE,
        filename: `${page.id}.html`,
        chunks: [page.id],
        minify: isProd, // 프로덕션에서는 HTML 압축 활성화
        // 💡 HTML 템플릿(EJS) 내부에서 사이드바를 동적으로 그릴 수 있도록 데이터 주입
        templateParameters: {
          sitemap: SITEMAP,
          currentPage: page.id,
        },
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
      clean: true,
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
                transpileOnly: true,
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
          resourceQuery: /raw/,
          type: 'asset/source',
        },
        {
          test: /\.css$/,
          resourceQuery: { not: [/raw/] },
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
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
          },
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
      // 메인 홈 페이지 플러그인 설정에도 사이트맵 데이터 주입
      new HtmlWebpackPlugin({
        template: HTML_TEMPLATE,
        filename: 'index.html',
        chunks: ['index'],
        templateParameters: {
          sitemap: SITEMAP,
          currentPage: 'index',
        },
      }),
      ...getHtmlPlugins(isProd),

      new MiniCssExtractPlugin({
        filename: isProd ? 'css/[name].[contenthash:8].css' : '[name].css',
        ignoreOrder: true,
      }),

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
          warnings: false,
          errors: true,
        },
      },
    },

    stats: 'minimal',

    ignoreWarnings: [
      {
        module: /mini-css-extract-plugin/,
        message: /Conflicting order/,
      },
    ],
  }
}
