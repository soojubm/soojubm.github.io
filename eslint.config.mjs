import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
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
    ignores: ['build/**', 'node_modules/**'],
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
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      lit: litPlugin,
      'lit-a11y': litA11yPlugin,
      wc: wcPlugin,
    },
    settings: {
      'import/internal-regex': '^@/',
    },
    rules: {
      // Lit 템플릿 문법, 바인딩 위치, 중복 바인딩처럼 Lit 사용 중 실수하기 쉬운 패턴을 검사한다.
      ...warnRules(litRecommended.rules),

      // Custom Element 이름, 생성자 attribute 처리, host class 변경처럼 Web Component 관례를 검사한다.
      ...warnRules(wcRecommended.rules),

      // Lit 템플릿 안의 ARIA, 키보드 이벤트, 접근 가능한 이름 등 접근성 규칙을 검사한다.
      ...warnRules(litA11yRecommended.rules),

      // 템플릿이 의도대로 파싱되지 않는 패턴은 렌더 결과가 조용히 달라지므로 error로 막는다.
      // 중복 attribute는 뒤엣것이 버려지고, 주석 안 바인딩은 평가만 되고 버려지며,
      // 자기닫힘 커스텀 엘리먼트는 뒤 형제를 자식으로 삼킨다.
      'lit/binding-positions': 'error',
      'lit/no-invalid-html': 'error',
      'lit/no-duplicate-template-bindings': 'error',
      'lit/no-legacy-template-syntax': 'error',
      'lit/attribute-value-entities': 'error',

      // 죽은 import·지역 변수를 잡는다. 베이스 no-unused-vars는 declare global의 선언 병합과
      // 타입 참조를 이해하지 못해 오탐이 나므로 TypeScript용 규칙을 쓴다.
      // 클래스 필드는 검사 대상이 아니라, host에 스스로 등록하는 컨트롤러 필드는 그대로 남는다.
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],

      curly: ['error', 'multi-or-nest', 'consistent'],
      'nonblock-statement-body-position': ['error', 'beside'],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'type', 'internal', ['parent', 'sibling', 'index']],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
]
