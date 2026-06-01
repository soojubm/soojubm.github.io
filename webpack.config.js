require('ts-node').register({ transpileOnly: true })

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const { SITEMAP } = require('./src/sitemap.ts')

const HTML_TEMPLATE = './index.html'

const ALL_PAGES = []
SITEMAP.forEach(node => {
  if (node.type === 'standalone') {
    if (node.id !== 'index') {
      ALL_PAGES.push({ id: node.id, subDir: 'patterns' })
    }
  } else if (node.type === 'category') {
    const subDir = node.id === 'patterns' ? 'patterns' : 'components'
    node.items.forEach(item => {
      ALL_PAGES.push({ id: item.id, subDir: item.subDir || subDir })
    })
  }
})

const MY_PAGES = [
  { id: 'films', name: '영화감상 목록' },
  { id: 'books', name: '독서 목록' },
]

const getEntries = () => {
  const entries = {
    index: ['./pages/home/home.ts', './index.ts'],
  }

  ALL_PAGES.forEach(page => {
    entries[page.id] = [`./pages/${page.subDir}/${page.id}/${page.id}.ts`, './index.ts']
  })

  MY_PAGES.forEach(page => {
    entries[`my-${page.id}`] = [`./pages/my/${page.id}/${page.id}.ts`, './index.ts']
  })

  return entries
}

const getHtmlPlugins = isProd => {
  return ALL_PAGES.map(
    page =>
      new HtmlWebpackPlugin({
        template: HTML_TEMPLATE,
        filename: `${page.id}.html`,
        chunks: [page.id],
        minify: isProd,
        templateParameters: {
          sitemap: SITEMAP,
          currentPage: page.id,
        },
      }),
  )
}

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'
  const shouldAnalyze = process.env.ANALYZE === 'true'

  return {
    mode: isProd ? 'production' : 'development',
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
      ...MY_PAGES.map(
        page =>
          new HtmlWebpackPlugin({
            template: HTML_TEMPLATE,
            filename: `my/${page.id}/index.html`,
            chunks: [`my-${page.id}`],
            minify: isProd,
            templateParameters: {
              sitemap: SITEMAP,
              currentPage: page.id,
            },
          }),
      ),

      new MiniCssExtractPlugin({
        filename: isProd ? 'css/[name].[contenthash:8].css' : '[name].css',
        ignoreOrder: true,
      }),

      ...(isProd
        ? [...(shouldAnalyze ? [new BundleAnalyzerPlugin({ openAnalyzer: false })] : [])]
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
