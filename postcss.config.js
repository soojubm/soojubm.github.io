// const isProduction = process.env.NODE_ENV === 'production';

const config = {
  plugins: [
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
