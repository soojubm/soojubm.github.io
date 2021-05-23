const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    autoprefixer(),
    require('postcss-flexbugs-fixes'),
    require('postcss-custom-media'),
    require('postcss-mixins'),

    // require('cssnano')({
    // 	preset: 'default',
    // }),
    // require('postcss-custom-properties'),
  ],
}
