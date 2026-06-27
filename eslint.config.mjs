import tsParser from '@typescript-eslint/parser'
import litPlugin from 'eslint-plugin-lit'
import litA11yPlugin from 'eslint-plugin-lit-a11y'
import wcPlugin from 'eslint-plugin-wc'

const litRecommended = litPlugin.configs['flat/recommended']
const wcRecommended = wcPlugin.configs['flat/recommended']
const litA11yRecommended = litA11yPlugin.configs.recommended

// 기존 코드베이스에 한 번에 많은 error가 생기지 않도록 새 플러그인 규칙은 경고로 시작한다.
const warnRules = rules =>
  Object.fromEntries(
    Object.entries(rules).map(([name, value]) => [
      name,
      Array.isArray(value) ? ['warn', ...value.slice(1)] : 'warn',
    ]),
  )

export default [
  {
    ignores: ['build/**', 'node_modules/**', '_legacy/**'],
  },
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          legacyDecorators: true,
        },
      },
    },
    plugins: {
      lit: litPlugin,
      'lit-a11y': litA11yPlugin,
      wc: wcPlugin,
    },
    rules: {
      // Lit 템플릿 문법, 바인딩 위치, 중복 바인딩처럼 Lit 사용 중 실수하기 쉬운 패턴을 검사한다.
      ...warnRules(litRecommended.rules),

      // Custom Element 이름, 생성자 attribute 처리, host class 변경처럼 Web Component 관례를 검사한다.
      ...warnRules(wcRecommended.rules),

      // Lit 템플릿 안의 ARIA, 키보드 이벤트, 접근 가능한 이름 등 접근성 규칙을 검사한다.
      ...warnRules(litA11yRecommended.rules),
    },
  },
]
