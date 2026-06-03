import { unsafeCSS, type CSSResult } from 'lit'

/**
 * button 변형(variant / size) 정의 — 프레임워크에 독립적인 "순수 데이터".
 *
 * 이 객체들은 lit에 의존하지 않는다(아래 어댑터만 unsafeCSS를 쓴다).
 * 따라서 React + CVA / Stitches / vanilla-extract / inline-style 등으로
 * 그대로 옮길 수 있다. 각 변형은 `--button-*` 토큰 또는 일반 속성을 덮어쓴다.
 */
export const buttonVariants = {
  primary: {
    '--button-border-color': '1px solid transparent',
    'background-color': 'var(--color-primary)',
    '--button-text-color': '#fff',
  },
  secondary: {
    '--button-border-color': '1px solid transparent',
    '--button-color': 'var(--green100)',
    '--button-text-color': 'var(--color-primary)',
  },
  tertiary: {
    '--button-text-color': 'var(--color-foreground)',
  },
  text: {
    '--button-border-color': '1px solid transparent',
    '--button-color': 'var(--color-background)',
    '--button-text-color': 'var(--color-primary)',
  },
  destructive: {
    '--button-color': 'var(--red800)',
    '--button-text-color': 'var(--gray0)',
  },
} as const

export const buttonSizes = {
  huge: {
    '--button-size': '64px',
    '--button-text-size': 'var(--font-size-18)',
    'padding-bottom': '5px',
  },
  large: {
    '--button-size': 'var(--size-large)',
    'min-width': 'var(--button-min-width)',
  },
} as const

export const defaultVariants = { variant: 'tertiary', size: 'medium' } as const

type DeclMap = Record<string, string>

/**
 * 적용 어댑터(Lit 전용): variants 데이터를
 * `:host([<attr>='<key>']) button { ... }` 규칙 묶음으로 변환한다.
 *
 * 표면은 inner button이 전담하므로 변형도 button에 적용한다.
 * host 속성(reflect된 variant/size)을 셀렉터로 쓰므로 render()에서 data-* 를 찍지 않아도 된다.
 * 마이그레이션 시 버리는 부분은 이 함수뿐이고, 위의 데이터는 그대로 재사용한다.
 */
const toRules = (attr: string, map: Record<string, DeclMap>): CSSResult =>
  unsafeCSS(
    Object.entries(map)
      .map(([key, decls]) => {
        const body = Object.entries(decls)
          .map(([prop, value]) => `${prop}: ${value};`)
          .join(' ')
        return `:host([${attr}='${key}']) button { ${body} }`
      })
      .join('\n  '),
  )

export const buttonVariantRules: CSSResult = toRules('variant', buttonVariants)
export const buttonSizeRules: CSSResult = toRules('size', buttonSizes)
