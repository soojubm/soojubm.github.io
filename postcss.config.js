// const isProduction = process.env.NODE_ENV === 'production';
const postcss = require('postcss')
const postcssPresetEnv = require('postcss-preset-env')
const postcssCustomMedia = require('postcss-custom-media')
const postcssGlobalData = require('@csstools/postcss-global-data')

postcss([
  postcssGlobalData({
    files: ['/public/stylesheets/shared/variables.css'],
  }),
  postcssCustomMedia({ preserve: true }),
]).process()

const config = {
  plugins: [
    // require('postcss-import'),
    // postcssCustomProperties({
    //   preserve: false,
    // }),
    // require('postcss-simple-vars'), // mixin dependency $ 안됨
    // require('postcss-nested'), // mixin dependency / preset-env
    // require('postcss-mixins'),
    // require('postcss-comment'), // outdated
    // require('postcss-custom-properties'),
    // require('postcss-flexbugs-fixes'),
    // require('autoprefixer'),
    // require('cssnano')({
    //   preset: 'default',
    // }),
    // require('postcss-custom-media'),
    // postcssPresetEnv({
    //   /* pluginOptions */
    //   features: {},
    // }),
  ],
}

module.exports = config

// // autoprefixer preset-env에 포함

// import 위에 와야 함.
// extends 중단. mixins
// nested x. nesting o ?

// stylelint
//   "extends": "stylelint-config-standard",
//     "plugins": [
//       "stylelint-use-nesting"
//     ],
//     "rules": {
//     "at-rule-no-unknown": [true,{
//       "ignoreAtRules": ["extend"]
//     }],
//     "csstools/use-nesting": "ignore"
//   }
