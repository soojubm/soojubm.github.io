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

// `--x: var(--y)` 꼴 선언을 뒤집어, 어떤 토큰을 그대로 물려받는 이름을 모아 둔다.
const aliasNames = [...rootDeclarations.matchAll(/--([\w-]+):\s*var\(--([\w-]+)\)\s*;/g)].reduce(
  (aliases, [, alias, source]) => aliases.set(source, [...(aliases.get(source) ?? []), alias]),
  new Map<string, string[]>(),
)

/** 이 토큰을 그대로 참조하는 상위 단계 토큰 이름. 원시 색이 어떤 역할로 쓰이는지 드러낸다. */
export const tokenAliases = (name: string) => aliasNames.get(name) ?? []

/** 해당 요소 자리에서 실제로 먹은 토큰 값. 조상의 data-theme이 반영된다. */
export const computedTokenValue = (name: string, element: Element) =>
  getComputedStyle(element).getPropertyValue(`--${name}`).trim()

/** :root 자리에서 계산된 토큰 값. 테마와 무관한 값을 문서가 그대로 인용할 때 쓴다. */
export const rootTokenValue = (name: string) => computedTokenValue(name, document.documentElement)

/** 값의 종류를 나타내는 접미사를 뗀 표시 이름. `background-subtle-color` → `background-subtle` */
export const tokenDisplayName = (name: string) => name.replace(/-color$/, '')
