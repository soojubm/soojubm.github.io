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
    eqeqeq: ["error", "always"],
    curly: ["warn", "multi"],
    // 'keyword-spacing': ["error", { "after": false }],
    // indent: ['warn', 'tab'],  // tab or 2
    'no-empty': 'warn', // { "allowEmptyCatch": true }
    
    'linebreak-style': ['warn', 'unix'],
    'no-useless-return': 'error',
    'no-unused-vars': ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    'no-use-before-define': [{ "variables": false }, { "functions": false }, { "classes": false }],
    'vars-on-top': 'error',
    'no-self-assign': "error",
    'no-inner-declarations': 0,
    'no-new-object': 0,
    'no-new-func': "error",
    'prefer-spread': 'warn',
    'prefer-arrow-callback': [ "error", { "allowUnboundThis": false } ],
    'prefer-destructuring': ["error", {VariableDeclarator: {object: true}}, {AssignmentExpression: {array: true}}],
    'prefer-template': "error",

    // 'arrow-parens': [2, "as-needed", { "requireForBlockBody": true }],
    'implicit-arrow-linebreak': ["error", "beside"],

    'array-bracket-newline': ["error", { "multiline": false, "minItems": 0 }],
    'array-element-newline': ["error", "consistent"],
    'object-property-newline': ["error", { "allowAllPropertiesOnSameLine": true }],
    'object-shorthand': ["error", "always", { "avoidExplicitReturnArrows": true }],
    
    'lines-between-class-members': ["error", "always", { exceptAfterSingleLine: true }],

    'no-var': 'error',
    // 'preper-const': 'error',

    'padding-line-between-statements': [{ blankLine: "always", prev: "directive", next: "*" }, { blankLine: "any", prev: "directive", next: "directive" }],
    // [{ blankLine: "always", prev: ["const", "let", "var"], next: "*"}, { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]}]
  },
};

// formatOnSave: true // prettier
// autoFixOnSave: true // eslint