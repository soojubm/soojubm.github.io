// const isProduction = process.env.NODE_ENV === 'production';

const config = {
  plugins: [
    // require('postcss-import'),
    // postcssCustomProperties({
    //   preserve: false,
    // }),
    // require('postcss-import'),
    // require('postcss-simple-vars'), // mixin dependency $ 안됨
    // require('postcss-nested'), // mixin dependency / preset-env
    // require('postcss-mixins'),

    // require('postcss-comment'), // outdated
    // require('postcss-custom-media'),
    // require('postcss-custom-properties'),
    // require('postcss-flexbugs-fixes'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
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
