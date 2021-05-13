const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');


const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



const CopyPlugin = require('copy-webpack-plugin');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');


const CompressionPlugin = require('compression-webpack-plugin');

const StylelintPlugin = require('stylelint-webpack-plugin');


const path = require('path');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
	mode: 'none', // development, production, none
	devtool: 'inline-source-map',
	entry: './public/index.ts',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './build'),
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	watch: true,
	module: {
		rules: [
			{ test: /\.ts$/, use: 'ts-loader' },
			{
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			},
			{ test: /\.png$/, use: ['file-loader'] },
			{ test: /\.m?js$/, exclude: /node_modules/, use: ['babel-loader', 'eslint-loader']}
		],
	},

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({ template: './index.html' }),
		new MiniCssExtractPlugin({ filename: 'style.css' }), // [name].css

		new CopyPlugin([ { from: 'public', to: 'public' } ]),
		new BundleAnalyzerPlugin(),
		new FriendlyErrorsWebpackPlugin(),
		new StylelintPlugin(),
	],

	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true
					}
				}
			}),
			new CssMinimizerPlugin(),
		],
		// splitChunks: {
		// 	chunks: 'all',
		// },
		concatenateModules: true,
	},
	devServer: {
		contentBase: path.join(__dirname, './build'),
		compress: true,
		host: "localhost",
		port: 9000,
		// proxy: {
    //   '/api': {
    //     target: 'domain.com',
    //     changeOrigin: true
    //   }
    // }
	}
});