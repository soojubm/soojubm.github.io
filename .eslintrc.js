module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    camelcase: { "properties": "always" },
    // indent: ['warn', 'tab'],  // tab or 2
    'no-empty': 'warn', // { "allowEmptyCatch": true }
    
    'linebreak-style': ['warn', 'unix'],
    'no-useless-return': 'error',
    'no-unused-vars': ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    'no-use-before-define': [{ "variables": false }, { "functions": false }, { "classes": false }],

    'no-var': 'error',
  },
};

// formatOnSave: true // prettier
// autoFixOnSave: true // eslint