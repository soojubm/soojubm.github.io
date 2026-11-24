// 토큰 이름의 단어를 의미 그룹으로 묶어, 서로 다른 그룹의 경계에서만 구분자를 '.'으로 바꿔 구조를 드러낸다.
// 위에서부터 먼저 매칭되는 그룹을 사용하므로 더 구체적인 그룹을 앞에 둔다.
// state는 dimension·surface에 적용되는 변형이므로 겹치는 단어가 없어 순서와 무관하고,
// surface는 border-width처럼 dimension 단어(width)를 포함하는 합성어를 갖고 있어 dimension보다 앞에 둔다.
// typography는 text- 합성어만 가져 다른 그룹과 겹치지 않는다.
export const WORD_CATEGORIES = [
  {
    name: 'state',
    words: ['hover', 'active', 'focus', 'disabled', 'selected', 'pressed', 'checked'],
  },
  {
    name: 'typography',
    words: ['text-size', 'text-weight', 'text-color'],
  },
  {
    name: 'surface',
    words: [
      'border',
      'border-radius',
      'border-color',
      'border-width',
      'background-color',
      'backdrop-filter',
      'shadow',
      'blur',
    ],
  },
  {
    name: 'dimension',
    words: [
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'margin',
      'margin-inline-start',
      'padding',
      'padding-inline',
      'padding-block',
      'gap',
      'offset',
    ],
  },
] as const

// border-radius, background-color처럼 '-'로 이어진 카테고리 단어는 조각을 이어붙인 문자열이
// 아니라, 인접한 조각들이 각 자리에 정확히 대응하는지로 판단해 엉뚱한 이웃 조각까지
// 함께 묶이지 않게 한다.
function matchesWord(parts: string[], index: number, word: string) {
  const wordParts = word.split('-')
  const firstStart = Math.max(0, index - wordParts.length + 1)
  const starts = Array.from({ length: index - firstStart + 1 }, (_, offset) => firstStart + offset)

  return starts.some(start =>
    wordParts.every((wordPart, offset) => parts[start + offset]?.includes(wordPart)),
  )
}

/** 토큰 이름을 '-'로 쪼갠 조각 중 index 위치의 단어가 속한 카테고리 이름. 없으면 빈 문자열. */
export function categoryNameAt(index: number, parts: string[]) {
  const category = WORD_CATEGORIES.find(({ words }) =>
    words.some(word => matchesWord(parts, index, word)),
  )
  return category?.name ?? ''
}

// state/surface/dimension 그룹이 바뀌는 경계에서만 '-'를 '.'으로 바꿔, 같은 그룹의 합성어(border-radius 등)는
// 계속 '-'로 붙어 보이게 하면서 그룹 전환은 시각적으로 구분되게 한다.
export function formatTokenName(name: string) {
  const parts = name.split('-')
  const categories = parts.map((_, index) => categoryNameAt(index, parts))

  return parts.reduce((result, word, index) => {
    if (index === 0) return word

    const sameCategory = categories[index] === categories[index - 1]
    return `${result}${sameCategory ? '-' : '.'}${word}`
  }, '')
}
