import variablesCss from '@/stylesheets/shared/variables.css?raw'

/**
 * 문서가 소개하는 토큰 목록은 variables.css의 :root 선언을 단일 출처로 읽는다.
 * 목록을 문서에 손으로 옮겨 적으면 토큰이 늘거나 줄 때 조용히 어긋나기 때문이다.
 * 값은 여기서 읽지 않는다. 테마가 같은 이름을 다시 선언하므로, 화면에 실제로 먹은 값은
 * 문서 요소가 자기 자리에서 계산된 스타일로 읽는다.
 */
const rootBlock = () => {
  const start = variablesCss.indexOf(':root')
  if (start < 0) return ''

  const end = variablesCss.indexOf('\n}', start)
  return variablesCss.slice(start, end < 0 ? undefined : end)
}

// 주석 처리한 선언은 아직 살아 있는 토큰이 아니므로 목록에서 뺀다.
const rootDeclarations = rootBlock().replace(/\/\*[\s\S]*?\*\//g, '')

/** :root 선언 순서 그대로의 토큰 이름. 문서 섹션이 나열하는 순서가 된다. */
export const rootTokenNames = [...rootDeclarations.matchAll(/--([\w-]+):/g)].map(match => match[1])

// `--x: var(--y)` 꼴 선언에서 한 단계 참조만 뽑는다. 값이 그 토큰 하나로만 이루어져야 하므로
// `--border: var(--border-width) solid var(--border-color);`처럼 여러 값을 합성하는 선언은 걸리지 않는다.
const directReferences = new Map(
  [...rootDeclarations.matchAll(/--([\w-]+):\s*var\(--([\w-]+)\)\s*;/g)].map(([, name, source]) => [
    name,
    source,
  ]),
)

// 한 단계 참조를 뒤집어, 어떤 토큰을 그대로 물려받는 이름을 모아 둔다.
const aliasNames = [...directReferences].reduce(
  (aliases, [alias, source]) => aliases.set(source, [...(aliases.get(source) ?? []), alias]),
  new Map<string, string[]>(),
)

/** 이 토큰을 그대로 참조하는 상위 단계 토큰 이름. 원시 색이 어떤 역할로 쓰이는지 드러낸다. */
export const tokenAliases = (name: string) => aliasNames.get(name) ?? []

/**
 * 이 토큰이 (여러 단계를 거쳐서라도) 그대로 물려받는 원시 토큰 이름.
 * 이미 원시 토큰이거나 값을 합성해 만드는 토큰이면 undefined를 반환한다.
 */
export function primitiveTokenName(name: string) {
  let current = name

  for (let hop = 0; hop < directReferences.size; hop += 1) {
    const next = directReferences.get(current)
    if (!next) return current === name ? undefined : current

    current = next
  }

  return undefined
}

const rootValues = new Map(
  [...rootDeclarations.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value]),
)

// 테마 블록(`:root [data-theme='x']`)이 다시 선언한 값. 테마가 값을 덮은 토큰도 참조 이름으로 보여주려고 읽는다.
const themeValues = new Map(
  [...variablesCss.matchAll(/\[data-theme='([\w-]+)'\]\s*\{([^}]*)\}/g)].map(([, theme, body]) => [
    theme,
    new Map(
      [...body.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/--([\w-]+):\s*([^;]+);/g)].map(
        ([, name, value]) => [name, value],
      ),
    ),
  ]),
)

/**
 * 현재 테마에서 이 토큰이 선언된 모양. 다른 토큰을 참조하면 `var(--x)`의 var를 벗겨 참조 이름으로 쓰고,
 * 참조가 없는 값이면 계산된 값을 그대로 쓴다.
 */
export function displayTokenValue(name: string, element: Element) {
  const theme = element.closest('[data-theme]')?.getAttribute('data-theme') ?? ''
  const declared = themeValues.get(theme)?.get(name) ?? rootValues.get(name) ?? ''
  if (!/var\(--/.test(declared)) return computedTokenValue(name, element)

  return declared
    .replace(/\s+/g, ' ')
    .replace(/\( /g, '(')
    .replace(/ \)/g, ')')
    .replace(/var\(--([\w-]+)\)/g, '$1')
    .trim()
}

/** 값이 다른 토큰을 참조해 만들어지는지. 원시값이 아니라 컴포넌트·시맨틱 단계의 토큰이다. */
export const referencesOtherTokens = (name: string) => /var\(--/.test(rootValues.get(name) ?? '')

/** 해당 요소 자리에서 실제로 먹은 토큰 값. 조상의 data-theme이 반영된다. */
export const computedTokenValue = (name: string, element: Element) =>
  getComputedStyle(element).getPropertyValue(`--${name}`).trim()

/** 값의 종류를 나타내는 접미사를 뗀 역할 이름. `primary-color` → `primary` */
export const tokenDisplayName = (name: string) => name.replace(/-color$/, '')
