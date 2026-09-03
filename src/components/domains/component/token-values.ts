import variablesCss from '@/stylesheets/shared/variables.css?raw'

/**
 * 문서가 보여주는 토큰 값은 variables.css의 :root 선언을 단일 출처로 읽는다.
 * 값을 문서에 손으로 옮겨 적으면 원본이 바뀔 때 조용히 어긋나기 때문이다.
 * 테마 블록은 같은 키를 다시 선언하므로 :root 블록만 잘라 쓴다.
 */
const rootBlock = () => {
  const start = variablesCss.indexOf(':root')
  if (start < 0) return ''

  const end = variablesCss.indexOf('\n}', start)
  return variablesCss.slice(start, end < 0 ? undefined : end)
}

const tokenValues = new Map(
  [...rootBlock().matchAll(/--([\w-]+):\s*([^;]+);/g)].map(match => [match[1], match[2].trim()]),
)

/** :root에 없는 키는 빈 값으로 두어 문서에서 바로 눈에 띄게 한다. */
export const tokenValue = (key: string) => tokenValues.get(key) ?? ''
