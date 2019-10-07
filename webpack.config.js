const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const path = require('path');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
	mode: 'none',
	devtool: 'inline-source-map',
	entry: './public/index.js',
	output: { path: path.resolve(__dirname, 'build'), publicPath: '/', filename: 'bundle.js'},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	watch: true,
	module: {
		rules: [
			{ test: /\.(sa|sc|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
			{ test: /\.png$/, use: ['file-loader'] },
			{ test: /\.ts$/, use: 'ts-loader' },
			{ test: /\.m?js$/, exclude: /node_modules/, use: ['babel-loader', 'eslint-loader']}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({ template: './index.html' }),
		new CopyPlugin([ { from: 'public', to: 'public' } ]),
		new BundleAnalyzerPlugin(),
		new FriendlyErrorsWebpackPlugin(),
		new MiniCssExtractPlugin({ filename: '[name].css' })
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin(),
			new OptimizeCssAssetsPlugin({
				cssProcessor: require('cssnano'),
				cssProcessorPluginOptions: {
					preset: ['default', { discardComments: { removeAll: true } }],
				},
				canPrint: true
			})
		],
		splitChunks: {},
		concatenateModules: true,
	},
	devServer: {
		contentBase: path.join(__dirname, './build/'),
		port: 9000,
		host: '0.0.0.0'
	}
});