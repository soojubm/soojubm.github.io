// stylelint-config-standard를 extends하지 않고 필요한 rule만 명시적으로 사용.
// config-standard는 Prettier와 겹치는 포매팅 rule을 다수 포함해 노이즈가 많음.
module.exports = {
  rules: {
    'declaration-block-no-duplicate-properties': true,
    'property-no-unknown': true,
    'declaration-no-important': true,
    'color-no-hex': true,
    'selector-class-pattern': null,
    'selector-max-specificity': null,
    'max-nesting-depth': null,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['custom-media'] }],
  },
  ignoreFiles: ['src/stylesheets/vendors/**', 'src/webfonts/**', 'build/**', 'node_modules/**'],
  overrides: [
    {
      files: ['**/*.ts'],
      customSyntax: 'postcss-lit',
    },
  ],
}
