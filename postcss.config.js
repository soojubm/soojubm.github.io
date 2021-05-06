module.exports = {
	plugins: [
		// require('postcss-nested'),
		// require('postcss-mixins'),
		require('autoprefixer'),
		require('postcss-flexbugs-fixes'),
		require('postcss-custom-media'),
		require('cssnano')({
			preset: 'default',
		}),
		// require('postcss-custom-properties'),
	]
};