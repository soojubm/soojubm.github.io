// 토큰 이름의 단어를 의미 그룹으로 묶어, 서로 다른 그룹의 경계에서만 구분자를 '.'으로 바꿔 구조를 드러낸다.
// 위에서부터 먼저 매칭되는 그룹을 사용하므로 더 구체적인 그룹을 앞에 둔다.
// state는 dimension·surface에 적용되는 변형이므로 겹치는 단어가 없어 순서와 무관하고,
// surface는 border-width처럼 dimension 단어(width)를 포함하는 합성어를 갖고 있어 dimension보다 앞에 둔다.
const WORD_CATEGORIES = [
  {
    name: 'state',
    words: ['hover', 'active', 'focus', 'disabled', 'selected', 'pressed', 'checked'],
  },
  {
    name: 'surface',
    words: [
      'border',
      'border-radius',
      'border-color',
      'border-width',
      'background-color',
      'text-color',
      'backdrop-filter',
      'shadow',
      'blur',
      'accent',
      'line-color',
      'line-width',
    ],
  },
  {
    name: 'dimension',
    words: [
      'width',
      'min-width',
      'height',
      'max-height',
      'margin',
      'padding',
      'padding-inline',
      'gap',
      'size',
      'space',
      'spacing',
      'offset',
      'text-size',
      'text-weight',
    ],
  },
] as const

// state는 dimension·surface에 딸린 변형이라 단독 카테고리가 아니라 base 뒤에 이어 붙인다.
const CATEGORY_DISPLAY_ORDER = ['dimension', 'surface', 'state'] as const

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

/** 토큰 이름이 속한 카테고리를 중복 없이 표시 순서(dimension/surface → state)로 반환한다. */
export function tokenCategories(name: string) {
  const parts = name.split('-')
  const found = new Set(parts.map((_, index) => categoryNameAt(index, parts)))

  return CATEGORY_DISPLAY_ORDER.filter(category => found.has(category))
}

function capitalize(word: string) {
  return `${word[0].toUpperCase()}${word.slice(1)}`
}

/** 카테고리 태그에 표시할 레이블. "Surface", "Dimension-State"처럼 합성 카테고리는 '-'로 잇는다. */
export function tokenCategoryLabel(name: string) {
  return tokenCategories(name).map(capitalize).join('-')
}

// 같은 카테고리 토큰을 표시 순서(dimension → surface → state)로 묶어 정렬할 때 쓰는 키.
// 카테고리가 없는 토큰은 맨 뒤로 보낸다.
export function tokenCategorySortIndex(name: string) {
  const [primary] = tokenCategories(name)
  const index = CATEGORY_DISPLAY_ORDER.indexOf(primary as typeof CATEGORY_DISPLAY_ORDER[number])

  return index === -1 ? CATEGORY_DISPLAY_ORDER.length : index
}
