import { html, nothing } from 'lit'

import type { DotTone } from '@/components/common/dot/dot.styles'
import type { ComponentReferenceItemData } from '@/components/domains/component'

import { referencesOtherTokens, rootTokenNames } from '@/components/domains/component/token-values'
import { WORD_CATEGORIES } from '@/components/domains/component/token.utils'
import { renderPage } from '@/components/layouts/base-layouts'
import './tokens.css'

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://design-tokens.github.io/community-group/format',
    label: 'W3C - Design Tokens Format Module',
  },
  {
    href: 'https://docs.specifyapp.com/concepts/token-types',
    label: 'Specify - Token Types',
  },
  {
    href: 'https://www.delldesignsystem.com/foundations/elevation/',
    label: 'Dell Design System - Elevation',
  },
  {
    href: 'https://www.delldesignsystem.com/foundations/typography/',
    label: 'Dell Design System - Typography',
  },
  {
    href: 'https://atlassian.design/components/tokens/all-tokens',
    label: 'Atlassian Design - Tokens',
  },
  {
    href: 'https://medium.com/eightshapes-llc/size-in-design-systems-64f234aec519',
    label: 'EightShapes - Size in Design Systems',
  },
]

/**
 * 섹션이 소개할 토큰을 이름 규칙으로 고른다. variables.css의 :root 선언 순서가 곧 나열 순서다.
 * 위에서부터 먼저 걸리는 규칙이 토큰을 가져가므로 더 좁은 규칙을 앞에 둔다.
 */
const sectionPatterns = {
  typography: /^font-/,
  size: /^size-/,
  spaceSemantic: /^space-(section|subsection)$/,
  space: /^space-/,
  layout: /^(navbar-height$|layout-)/,
  borderColor: /^border-(.+-)?color$/,
  border: /^border/,
  radius: /^radius/,
  shadow: /^shadow-/,
  blur: /^blur-/,
  opacity: /^opacity-/,
  zIndex: /^material-zindex-/,
  material: /^material-/,
  transition: /^(transition-|animation-delay-)/,
  category: /^category-/,
  palette: /^(gray|green|red|yellow|orange|blue|black|white)\d+$/,
  background: /^background-/,
}

/**
 * 이 페이지가 다루지 않는 토큰. 소개되는 자리가 따로 있거나 한 컴포넌트가 소유하는 값이다.
 */
const documentedElsewhere = [
  /^interaction-/, // Interaction 페이지가 상태별로 소개한다
  /^(primary|accent|warning|danger|foreground)-/, // Color 섹션에 태그·대비쌍으로 나온다
  /^control-/, // control pill의 모양값
  /^newneek-/, // 포트폴리오 사례 전용 브랜드 색
]

const groupedTokens = () => {
  const patterns = Object.entries(sectionPatterns)
  const grouped: Record<string, string[]> = {}

  for (const name of rootTokenNames) {
    if (documentedElsewhere.some(pattern => pattern.test(name))) continue

    const section = patterns.find(([, pattern]) => pattern.test(name))
    if (!section) continue

    const [key] = section
    grouped[key] = [...(grouped[key] ?? []), name]
  }

  return grouped
}

const tokensBySection = groupedTokens()

const sectionTokens = (key: keyof typeof sectionPatterns) => tokensBySection[key] ?? []

/** 타이포그래피 스펙시멘으로 소개할 mm-text의 size 단계. 값과 행간은 스펙시멘이 직접 잰다. */
const TEXT_SIZES = ['12', '14', '18', '24', '32']

/** 다른 토큰을 참조해 만들어지는 레이아웃 토큰. chrome-inset은 :root에서 0px이지만 테마가 space 토큰으로 바꾸는 여백이라 여기 묶는다. */
const isLayoutComposite = (name: string) =>
  referencesOtherTokens(name) || name === 'layout-chrome-inset'

const renderTokenItems = (keys: string[]) =>
  keys.map(
    key => html`
      <mm-token-item key=${key}></mm-token-item>
    `,
  )

const renderColorTokens = (names: string[]) =>
  names.map(
    name => html`
      <mm-color-token name=${name}></mm-color-token>
    `,
  )

/** 카테고리컬 컬러는 배경 위에 기본 foreground 텍스트를 올려 쓰므로 번호마다 한 스와치에 함께 칠한다. */
const categoryNumbers = [...new Set(sectionTokens('category').map(name => name.split('-')[1]))]

const categorySwatches = (numbers: string[]) =>
  numbers.map(
    number =>
      `background: var(--category-${number}-background-color); color: var(--foreground-color)`,
  )

const sizeSwatches = (tokens: string[]) =>
  tokens.map(
    token =>
      `width: var(--${token}); height: var(--${token}); background: var(--background-strong-color)`,
  )

const shadowSwatches = (tokens: string[]) => tokens.map(token => `box-shadow: var(--${token})`)

const renderSpaceStage = (tokens: string[]) =>
  tokens.map(
    (token, index) => html`
      <mm-flex direction="column" align-items="center" gap="2">
        <mm-flex align-items="center" gap="0">
          <div
            style="
              width: 2px;
              height: var(--size-32);
              background: var(--background-strong-color);
              border-radius: var(--radius);
            "
          ></div>
          <div style="width: var(--${token}); height: 4px; background: var(--primary-color)"></div>
          <div
            style="
              width: 2px;
              height: var(--size-32);
              background: var(--background-strong-color);
              border-radius: var(--radius);
            "
          ></div>
        </mm-flex>
        <mm-list-marker variant="number" value=${index + 1}></mm-list-marker>
      </mm-flex>
    `,
  )

/**
 * 표면 토큰 위에 얹어 시연할 전경색 조합. 어떤 전경색이 그 표면 위에서 읽히는지는
 * 값에서 나오지 않는 설계 판단이라 여기서만 손으로 쓰고, 값과 명도 대비는 카드가 직접 잰다.
 */
const backgroundPairs: Record<string, string[]> = {
  'background-color': [
    'foreground-color',
    'foreground-subtle-color',
    'foreground-warning-color',
    'foreground-danger-color',
  ],
  'background-subtle-color': [
    'foreground-color',
    'foreground-warning-color',
    'foreground-danger-color',
  ],
  'background-strong-color': ['foreground-on-strong-color'],
}

const renderBackgroundTokens = (names: string[]) =>
  names.map(
    name => html`
      <mm-color-token name=${name} .pairs=${backgroundPairs[name] ?? []}></mm-color-token>
    `,
  )

/** Semantic Token은 같은 모양의 두 자리표시자 사이에 놓인 간격으로 보여, 구조의 층위 차이를 거리로 비교하게 한다. */
const renderSpaceSemanticStage = (tokens: string[]) =>
  tokens.map(
    (token, index) => html`
      <mm-flex class="space-cell" direction="column" align-items="center" gap="2">
        <div class="space-demo">
          <mm-ui-placeholder></mm-ui-placeholder>
          <mm-ui-placeholder space=${token.replace('space-', '')}></mm-ui-placeholder>
          <mm-ui-placeholder></mm-ui-placeholder>
        </div>
        <mm-list-marker variant="number" value=${index + 1}></mm-list-marker>
      </mm-flex>
    `,
  )

/** 음수 토큰은 폭으로 그릴 수 없어 스테이지에서 뺀다. 목록 끝에 있으므로 번호는 그대로 맞는다. */
const spaceStageTokens = sectionTokens('space').filter(name => !name.endsWith('-minus'))

const blurSwatches = (tokens: string[]) =>
  tokens.map(
    token =>
      `background: transparent; backdrop-filter: blur(var(--${token})); -webkit-backdrop-filter: blur(var(--${token}))`,
  )

const opacitySwatches = (tokens: string[]) =>
  tokens.map(
    token => `background: color-mix(in srgb, var(--background-color) var(--${token}), transparent)`,
  )

/**
 * 티어 스와치가 그리는 속성과 그 값을 담은 티어 토큰의 접미사.
 * 티어가 선언하지 않은 속성은 base 값을 따르므로, 그림자만 가진 elevated도 온전한 면으로 그려진다.
 */
const MATERIAL_PROPERTIES = [
  ['background', 'background-color'],
  ['border', 'border'],
  ['backdrop-filter', 'backdrop-filter'],
  ['-webkit-backdrop-filter', 'backdrop-filter'],
  ['box-shadow', 'shadow'],
]

const materialSwatch = (tier: string, tokens: string[]) =>
  MATERIAL_PROPERTIES.map(([property, suffix]) => {
    const token = `material-${tier}-${suffix}`
    return `${property}: var(--${tokens.includes(token) ? token : `material-base-${suffix}`})`
  }).join('; ')

/** 티어 이름은 토큰 이름에서 뽑아 선언 순서대로 늘어놓는다. 티어가 늘면 스테이지도 따라 는다. */
const renderMaterialStage = (tokens: string[]) =>
  [...new Set(tokens.map(token => token.split('-')[1]))].map(
    tier => html`
      <div class="material-swatch" style=${materialSwatch(tier, tokens)}>
        <mm-caption>${tier}</mm-caption>
      </div>
    `,
  )

/**
 * 경계 토큰은 목록 순서 그대로 한 칸씩 그린다. border-width는 선 굵기 하나라
 * 색을 붙인 선으로 그리고, 나머지는 이미 선·색·굵기를 합친 값이라 그대로 쓴다.
 * 투명 경계도 보이도록 모든 칸에 같은 배경을 깐다.
 */
const borderSwatches = (tokens: string[]) =>
  tokens.map(token => {
    const border =
      token === 'border-width'
        ? `var(--border-width) solid var(--foreground-color)`
        : `var(--${token})`
    return `border: ${border}; background: var(--background-subtle-color)`
  })

/** border-width는 선 굵기 하나만 정하는 primitive라, 선·색을 합친 나머지 토큰과 나눠 보여 준다. */
const borderWidthTokens = sectionTokens('border').filter(name => name === 'border-width')
const borderStyleTokens = sectionTokens('border').filter(name => name !== 'border-width')

const radiusSwatches = (tokens: string[]) =>
  tokens.map(token => `border: var(--border); border-radius: var(--${token})`)

interface EasingTrack {
  easing: string
  label: string
}

const renderMotionStage = (tracks: EasingTrack[]) =>
  tracks.map(
    ({ easing, label }) => html`
      <mm-flex direction="column" gap="2">
        <div class="motion-track">
          <div class="motion-dot" style="transition-timing-function: ${easing}"></div>
        </div>
        <mm-caption>${label}</mm-caption>
      </mm-flex>
    `,
  )

const motionTracks: EasingTrack[] = [
  { easing: 'var(--transition-easing)', label: 'transition-easing' },
  { easing: 'var(--transition-easing-emphasis)', label: 'transition-easing-emphasis' },
]

/** 토큰이 놓이는 계층. 계층마다 한 색으로 칠해, 사슬이 달라도 같은 계층이 같은 자리에 있음을 보인다. */
type TokenTier = 'component' | 'semantic' | 'primitive'

/** 범례 점의 tone은 이름 조각을 칠한 category 색과 같은 번호를 고른다. */
const tierLegends: Record<TokenTier, LegendItem> = {
  component: { label: 'Component Token', tone: 'pink' },
  semantic: { label: 'Semantic Token', tone: 'cyan' },
  primitive: { label: 'Primitive Token', tone: 'yellow' },
}

interface LegendItem {
  label: string
  tone: DotTone
}

const renderLegend = (items: LegendItem[]) => html`
  <mm-flex gap="4" wrap="wrap">
    ${items.map(
      ({ label, tone }) => html`
        <mm-flex align-items="center" gap="2">
          <mm-dot tone=${tone} size="12"></mm-dot>
          <mm-caption>${label}</mm-caption>
        </mm-flex>
      `,
    )}
  </mm-flex>
`

/** 실제 토큰이 아래 계층을 참조하는 사슬. 페이지처럼 Component Token이 없는 소비자는 Semantic부터 시작한다. */
const tierChains: [TokenTier, string][][] = [
  [
    ['component', 'avatar-background-color'],
    ['semantic', 'background-subtle-color'],
    ['primitive', 'gray100'],
  ],
  [
    ['component', 'notice-text-color'],
    ['semantic', 'foreground-color'],
    ['primitive', 'gray800'],
  ],
  [
    ['semantic', 'foreground-subtle-color'],
    ['primitive', 'gray400'],
  ],
]

const renderTierChain = (chain: [TokenTier, string][]) => {
  const names = chain.map(([, name]) => name)

  return html`
    <div class="name-anatomy" aria-label=${names.join(' → ')} role="group">
      ${chain.map(
        ([tier, name], index) => html`
          ${index > 0
            ? html`
                <span class="name-joiner" aria-hidden="true">→</span>
              `
            : ''}
          <span class="name-segment" data-tier=${tier}>${name}</span>
        `,
      )}
    </div>
  `
}

/** Semantic Token 대상의 분류. Component Token과 같은 개념은 같은 이름·색을 쓰고, 색 대상만 Color로 따로 묶는다. */
type SemanticGroup = 'color' | 'state' | 'dimension' | 'surface'

const semanticGroups: Record<SemanticGroup, LegendItem> = {
  color: { label: 'Color', tone: 'pink' },
  state: { label: 'State', tone: 'purple' },
  dimension: { label: 'Dimension', tone: 'blue' },
  surface: { label: 'Surface', tone: 'green' },
}

interface TokenKind {
  target: string
  description: string
  group?: SemanticGroup
}

/** Primitive Token의 종류. 도형은 같은 종류 안에서 단계가 커지는 리듬을 그린다. */
const primitiveKinds: TokenKind[] = [
  { target: 'color', description: '색상 이름과 단계로 나눈 팔레트' },
  { target: 'size', description: '요소 자체의 고정 치수' },
  { target: 'space', description: '요소 사이의 거리' },
  { target: 'radius', description: '모서리의 둥근 정도' },
  { target: 'font-size', description: '글자의 크기' },
  { target: 'shadow', description: '표면이 떠 있는 정도' },
]

/** Semantic Token을 묶는 대상 이름. 도형은 그 대상이 화면에서 맡는 역할을 그린다. */
const semanticKinds: TokenKind[] = [
  { target: 'background', description: '면을 채우는 색', group: 'color' },
  { target: 'foreground', description: '글자와 아이콘의 색', group: 'color' },
  { target: 'border', description: '구획을 나누는 선', group: 'color' },
  { target: 'interaction', description: 'hover·selected 같은 상태의 값', group: 'state' },
  { target: 'space', description: '구조의 층위 사이 간격', group: 'dimension' },
  { target: 'material', description: '그림자·blur·겹침 순서', group: 'surface' },
]

/** 계층마다 같은 이름의 종류(space)가 있어 도형은 계층과 종류를 함께 보고 고른다. 분류가 있으면 이름 조각을 분류 색으로 칠한다. */
const renderTokenKind =
  (tier: TokenTier) =>
  ({ target, description, group }: TokenKind) =>
    html`
      <mm-flex direction="column" gap="3">
        <span class="kind-figure" data-tier=${tier} data-kind=${target} aria-hidden="true"></span>
        <mm-flex direction="column" align-items="flex-start" gap="1">
          <span
            class="name-segment"
            data-part=${group ? nothing : 'target'}
            data-category=${group ?? nothing}
          >
            ${target}
          </span>
          <mm-caption>${description}</mm-caption>
        </mm-flex>
      </mm-flex>
    `

type CategoryName = (typeof WORD_CATEGORIES)[number]['name']

/**
 * Component Token 이름의 CSS 속성이 속하는 분류. 컴포넌트 문서의 토큰 목록이 같은 순서로 묶인다.
 * 분류에 드는 속성 단어는 token.utils에서 그대로 읽어, 목록 묶음과 설명이 어긋나지 않게 한다.
 */
const categoryHeadings: Record<CategoryName, string> = {
  dimension: 'Dimension',
  typography: 'Typography',
  surface: 'Surface',
  state: 'State',
}

/** 분류마다 범례 점과 이름 조각에 칠할 tone. 이름 조각은 같은 번호의 category 색을 쓴다. */
const categoryTones: Record<CategoryName, DotTone> = {
  dimension: 'blue',
  typography: 'orange',
  surface: 'green',
  state: 'purple',
}

const categoryNames = Object.keys(categoryHeadings) as CategoryName[]

const categoryWords = (category: CategoryName): readonly string[] =>
  WORD_CATEGORIES.find(({ name }) => name === category)?.words ?? []

/** 분류 하나의 속성 단어를 컴포넌트명 뒤에 나란히 놓아, 어느 단어가 그 분류에 드는지 색으로 보인다. */
const renderCategoryWords = (category: CategoryName) => html`
  <div
    class="name-anatomy"
    aria-label=${`${categoryHeadings[category]}: ${categoryWords(category).join(', ')}`}
    role="group"
  >
    <span class="name-segment" data-part="name">button</span>
    <span class="name-joiner" aria-hidden="true">-</span>
    <div class="category-words">
      ${categoryWords(category).map(
        word => html`
          <span class="name-segment" data-category=${category}>${word}</span>
        `,
      )}
    </div>
  </div>
`

/** 토큰 이름 조각이 맡는 자리. 같은 자리는 같은 색으로 칠해, 줄이 달라도 대상과 값의 종류가 같은 위치에 있음을 보인다. */
type NamePart = 'target' | 'modifier' | 'kind'

interface NameSegment {
  text: string
  part: NamePart
  label: string
}

/** 기본값·세기·상태·on- 규칙을 하나씩 보여 주는 실제 Semantic Token. 값의 종류를 이름 끝에 둔다는 규칙은 목록 대신 이 그래픽이 보여 준다. */
const nameAnatomies: NameSegment[][] = [
  [
    { text: 'background', part: 'target', label: '대상' },
    { text: 'color', part: 'kind', label: '값의 종류' },
  ],
  [
    { text: 'foreground', part: 'target', label: '대상' },
    { text: 'subtle', part: 'modifier', label: '세기' },
    { text: 'color', part: 'kind', label: '값의 종류' },
  ],
  [
    { text: 'interaction', part: 'target', label: '대상' },
    { text: 'hover', part: 'modifier', label: '상태' },
    { text: 'background-color', part: 'kind', label: '값의 종류' },
  ],
  [
    { text: 'foreground', part: 'target', label: '대상' },
    { text: 'on-strong', part: 'modifier', label: '대비 표면' },
    { text: 'color', part: 'kind', label: '값의 종류' },
  ],
]

const renderNameAnatomy = (segments: NameSegment[]) => html`
  <div class="name-anatomy" aria-label=${segments.map(({ text }) => text).join('-')} role="group">
    ${segments.map(
      ({ text, part, label }, index) => html`
        ${index > 0
          ? html`
              <span class="name-joiner" aria-hidden="true">-</span>
            `
          : ''}
        <mm-flex direction="column" gap="1">
          <span class="name-segment" data-part=${part}>${text}</span>
          <mm-caption>${label}</mm-caption>
        </mm-flex>
      `,
    )}
  </div>
`

const main = html`
  <mm-main>
    <mm-flex direction="column" gap="16">
      <mm-page-header
        heading="Tokens"
        description="제품의 시각 결정에 이름을 붙인 값입니다. 컴포넌트와 페이지는 값을 직접 쓰지 않고 토큰을 참조합니다. 토큰 하나만 바꿔 그 값을 쓰는 모든 화면을 함께 바꿀 수 있습니다."
      >
        <div class="tokens-banner"></div>
      </mm-page-header>

      <mm-content-section-list>
        <mm-content-section heading-level="3" heading="계층">
          <mm-paragraph>
            토큰은 세 계층으로 나뉘고, 각 계층은 바로 아래 계층을 참조합니다. 컴포넌트는 자기
            Component Token을 쓰고, 없으면 Semantic Token을 씁니다.
          </mm-paragraph>
          <mm-token-stage>
            <mm-flex direction="column" gap="6">
              ${renderLegend(Object.values(tierLegends))}
              <mm-flex direction="column" gap="3">${tierChains.map(renderTierChain)}</mm-flex>
            </mm-flex>
          </mm-token-stage>
          <mm-text-list
            .texts=${[
              'Primitive Token은 서비스가 쓰는 모든 디자인 값을 모은 목록이다. 화면의 색·크기·간격은 모두 이 목록에서 고른다.',
              'Primitive Token은 값만 있고 쓰임은 말하지 않으므로 Semantic Token을 거쳐 쓴다.',
              'Semantic Token은 Primitive에 인터페이스에서의 역할을 붙인 값이다. 컴포넌트와 페이지가 직접 참조한다.',
              '테마는 Semantic Token이 가리키는 Primitive를 바꾼다.',
              'Component Token은 Semantic Token을 한 컴포넌트의 속성에 연결한 값이다. 토큰만 바꿔 컴포넌트를 테마에 맞출 수 있게 한다.',
            ]}
          ></mm-text-list>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Primitive Token">
          <mm-paragraph>
            Primitive Token은 서비스가 쓰는 모든 디자인 값을 모은 목록입니다. 종류마다 단계로
            나뉘고, 화면의 색·크기·간격은 모두 이 목록에서 고릅니다.
          </mm-paragraph>
          <mm-token-stage>
            <mm-grid columns="3" gap="6">
              ${primitiveKinds.map(renderTokenKind('primitive'))}
            </mm-grid>
          </mm-token-stage>
          <mm-text-list
            .texts=${[
              '값만 있고 쓰임은 말하지 않으므로, 컴포넌트와 페이지는 Semantic Token을 거쳐 쓴다.',
            ]}
          ></mm-text-list>
          <mm-text-block
            level="4"
            heading="Primitive Token은 언제 정의하나요?"
            description="같은 값이 두 곳 이상에서 쓰일 때 정의합니다. 한 곳에서만 쓰는 값은 예외 케이스로 기록해둡니다."
          ></mm-text-block>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Semantic Token">
          <mm-paragraph>
            Semantic Token은 Primitive에 인터페이스에서의 역할을 붙인 값입니다. 테마를 바꾸면 같은
            이름이 테마에 맞는 다른 값을 냅니다.
          </mm-paragraph>
          <mm-token-stage>
            <mm-flex class="stage-content" direction="column" gap="6">
              ${renderLegend(Object.values(semanticGroups))}
              <mm-grid columns="3" gap="6">
                ${semanticKinds.map(renderTokenKind('semantic'))}
              </mm-grid>
            </mm-flex>
          </mm-token-stage>
          <mm-text-list
            .texts=${[
              '역할을 나타내는 대상 이름으로 묶고, 대상은 Color·State·Dimension·Surface로 나눈다.',
              '컴포넌트와 페이지는 Primitive 대신 Semantic Token을 참조한다.',
              '배경색은 위에 올라갈 글자색과 한 쌍으로 정한다. 강한 배경 위의 글자는 on- 토큰을 쓴다.',
              '상호작용 상태는 interaction 대상 아래에 상태 이름을 넣어 표현한다.',
            ]}
          ></mm-text-list>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Component Token">
          <mm-paragraph>
            Component Token은 이름에 든 속성·상태 단어에 따라 네 분류로 나뉩니다. 컴포넌트 문서의
            토큰 목록도 이 분류로 묶여, 크기를 바꾸는 값과 색을 바꾸는 값을 따로 찾을 수 있습니다.
          </mm-paragraph>
          <mm-token-stage>
            <mm-flex class="stage-content" direction="column" gap="6">
              ${renderLegend(
                categoryNames.map(name => ({
                  label: categoryHeadings[name],
                  tone: categoryTones[name],
                })),
              )}
              <mm-flex direction="column" gap="4">
                ${categoryNames.map(renderCategoryWords)}
              </mm-flex>
            </mm-flex>
          </mm-token-stage>
          <mm-text-list
            .texts=${[
              'Dimension은 요소의 크기와 안팎의 거리를 정한다.',
              'Typography는 글자의 크기·굵기·색을 정한다.',
              'Surface는 배경·경계·그림자처럼 표면의 모양을 정한다.',
              'State는 상호작용 상태에 따라 다른 분류의 값을 바꾼다.',
            ]}
          ></mm-text-list>
          <mm-text-block level="4" heading="Component Token은 언제 정의하나요?">
            <mm-component-notice heading="Component Token을 정의하는 기준을 정한다">
              토큰만 바꿔 컴포넌트를 테마에 맞출 수 있게 한다는 목표만 있다. 어떤 시각적 규칙에
              Component Token을 두는지는 정하지 않았다
            </mm-component-notice>
          </mm-text-block>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="이름 규칙">
          <mm-token-stage>
            <mm-flex direction="column" gap="6">${nameAnatomies.map(renderNameAnatomy)}</mm-flex>
          </mm-token-stage>
          <mm-text-list
            .texts=${[
              '기본값에는 base·default를 붙이지 않는다. base가 대상 이름인 material-base는 예외로 그대로 쓴다.',
              'Primitive Token은 색은 색상과 단계로, 크기·간격은 값의 종류와 단계로 이름 짓는다.',
              '세기 차이는 subtle·strong으로 나타낸다.',
              '상태는 인터랙션에 따라 바뀌는 값에만 넣는다.',
              '대비 표면 위에 올라가는 색은 on- 접두사를 붙인다.',
              'Component Token은 컴포넌트명 뒤에 값을 적용하는 CSS 속성을 붙여 이름 짓는다.',
            ]}
          ></mm-text-list>
        </mm-content-section>
      </mm-content-section-list>

      <mm-token-section
        heading="Color"
        description="팔레트 색은 Semantic Token을 거쳐 역할과 상태를 표현합니다. 배경색은 위에 올라가는 글자색과 한 쌍으로 정해, 어느 배경에서도 글자가 읽히게 합니다."
      >
        <mm-notice
          heading="권장 명도 대비"
          description="WCAG 2.1 AA 기준으로 일반 텍스트는 4.5:1 이상, 큰 텍스트(18px 굵게 또는 24px 이상)와 아이콘·테두리 같은 UI 요소는 3:1 이상이어야 합니다. 기준에 못 미치면 저시력 사용자가 글자와 경계를 구분하기 어렵습니다."
        ></mm-notice>

        <mm-grid columns="6" role="group" aria-label="팔레트 색상 토큰">
          ${renderColorTokens(sectionTokens('palette'))}
        </mm-grid>

        <mm-separator></mm-separator>
        <mm-grid columns="4" role="group" aria-label="배경색 토큰">
          ${renderBackgroundTokens(sectionTokens('background'))}
        </mm-grid>

        <mm-separator></mm-separator>
        <mm-grid columns="4" role="group" aria-label="테두리색 토큰">
          ${renderColorTokens(sectionTokens('borderColor'))}
        </mm-grid>

        <mm-separator></mm-separator>
        <mm-token-stage>
          <mm-token-swatches
            .swatches=${categorySwatches(categoryNumbers)}
            .contents=${categoryNumbers.map(() => 'Aa')}
          ></mm-token-swatches>
        </mm-token-stage>
        <mm-token-group>${renderTokenItems(sectionTokens('category'))}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Typography"
        description="글자 크기와 행간을 한 쌍으로 씁니다. 같은 크기의 글은 어디서나 줄 간격이 같아 읽는 리듬이 흔들리지 않습니다."
      >
        <mm-notice
          heading="크기와 행간의 비율"
          description="행간은 비율이 아니라 4px 배수로 정합니다. 제목용 24·32는 1.25~1.33, 본문용 14·18은 1.56~1.71이고, 14와 18은 제목에도 쓰여 넓은 행간이 제목에 그대로 적용됩니다. 두 본문 크기를 같은 비율로 맞추면 4px 배수로는 28/36(2.0)이 가장 작아, 2px 단위를 허용한 22/28(약 1.57)이 가장 가까운 안입니다."
        ></mm-notice>
        <mm-flex direction="column" gap="4">
          ${TEXT_SIZES.map(
            size => html`
              <mm-type-specimen size=${size}></mm-type-specimen>
            `,
          )}
        </mm-flex>

        <mm-token-group>${renderTokenItems(sectionTokens('typography'))}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Size"
        description="요소의 높이를 정합니다. 정사각형 요소는 예외로 너비에도 씁니다. 같은 단계를 쓴 요소끼리는 나란히 놓여도 높이가 어긋나지 않습니다."
      >
        <mm-token-stage>
          <mm-token-swatches
            gap="8"
            .swatches=${sizeSwatches(sectionTokens('size'))}
          ></mm-token-swatches>
        </mm-token-stage>
        <mm-token-group>${renderTokenItems(sectionTokens('size'))}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Space"
        description="요소 사이의 거리를 정합니다. 구조의 층위가 정해진 간격은 Semantic Token을, 나머지는 Primitive 단계를 씁니다. 같은 관계의 요소는 어느 화면에서나 간격이 같아 묶임과 나뉨이 자연스럽게 전해집니다."
      >
        <mm-token-stage>
          <mm-flex align-items="center" gap="8">${renderSpaceStage(spaceStageTokens)}</mm-flex>
        </mm-token-stage>
        <mm-token-group aria-label="space Primitive Token">
          ${renderTokenItems(sectionTokens('space'))}
        </mm-token-group>

        <mm-separator></mm-separator>
        <mm-token-stage>
          <mm-flex gap="4">${renderSpaceSemanticStage(sectionTokens('spaceSemantic'))}</mm-flex>
        </mm-token-stage>
        <mm-token-group aria-label="space Semantic Token">
          ${renderTokenItems(sectionTokens('spaceSemantic'))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Layout"
        description="반복되는 구조의 최대 너비와 여백을 정합니다. 같은 구조는 어느 페이지에서나 같은 폭으로 놓여 화면을 옮겨도 읽는 자리가 흔들리지 않습니다."
      >
        <mm-token-group aria-label="layout Primitive Token">
          ${renderTokenItems(sectionTokens('layout').filter(name => !isLayoutComposite(name)))}
        </mm-token-group>

        <mm-separator></mm-separator>
        <mm-token-group aria-label="layout Component·Semantic Token">
          ${renderTokenItems(sectionTokens('layout').filter(isLayoutComposite))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Border"
        description="테두리는 표면의 경계를 긋고, 모서리 곡률은 표면의 위계를 구분합니다."
      >
        <mm-token-stage>
          <mm-token-swatches
            .swatches=${[
              ...borderSwatches(borderWidthTokens),
              ...radiusSwatches(sectionTokens('radius')),
            ]}
          ></mm-token-swatches>
        </mm-token-stage>
        <mm-token-group aria-label="border Primitive Token">
          ${renderTokenItems([...borderWidthTokens, ...sectionTokens('radius')])}
        </mm-token-group>

        <mm-separator></mm-separator>
        <mm-token-stage>
          <mm-token-swatches .swatches=${borderSwatches(borderStyleTokens)}></mm-token-swatches>
        </mm-token-stage>
        <mm-token-group aria-label="border Component·Semantic Token">
          ${renderTokenItems(borderStyleTokens)}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Material"
        description="표면이 뒤 배경에서 떠 보이는 정도를 정합니다. 사용하는 쪽은 그림자·blur·투명도를 색과 조합한 티어를 쓰고, 원시 값은 티어를 정의할 때만 씁니다. 티어가 정하지 않은 속성은 base를 따릅니다."
      >
        <mm-token-stage backdrop>
          <div class="material-stage">
            <mm-token-swatches
              .swatches=${[
                ...shadowSwatches(sectionTokens('shadow')),
                ...blurSwatches(sectionTokens('blur')),
                ...opacitySwatches(sectionTokens('opacity')),
              ]}
            ></mm-token-swatches>
          </div>
        </mm-token-stage>
        <mm-token-group aria-label="재질 Primitive Token">
          ${renderTokenItems([
            ...sectionTokens('shadow'),
            ...sectionTokens('blur'),
            ...sectionTokens('opacity'),
          ])}
        </mm-token-group>

        <mm-token-stage>
          <div class="material-stage">${renderMaterialStage(sectionTokens('material'))}</div>
        </mm-token-stage>
        <mm-token-group aria-label="재질 티어 토큰">
          ${renderTokenItems(sectionTokens('material'))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Z-index"
        description="표면이 겹칠 때 무엇이 위에 오는지 정합니다. 숫자 대신 역할에 맞는 그룹을 고르고, 서로 다른 그룹의 값은 비교하지 않습니다."
      >
        <mm-token-group>${renderTokenItems(sectionTokens('zIndex'))}</mm-token-group>

        <mm-text-list
          .texts=${[
            'base — 형제 요소 위에 그리는 로컬 레이어.',
            'elevated — 목록·그룹 안에서 형제보다 살짝 뜨는 요소.',
            'chrome — 화면에 고정된 내비게이션·툴바.',
            'chrome-top — 고정된 바 위에 남아야 하는 전역 내비게이션.',
            'backdrop — modal 표면 뒤를 덮는 레이어.',
            'sheet — viewport를 기준으로 화면을 덮는 표면.',
            'popover — 트리거에 앵커되는 표면. sheet 안에서 열려도 sheet 위에 보인다.',
            'tooltip — 가리키는 대상이 어느 표면에 있든 그 위에 보이는 설명.',
            'toast — 항상 최상단에 보이는 알림.',
          ]}
        ></mm-text-list>
      </mm-token-section>

      <mm-token-section
        heading="Transition"
        description="모든 모션은 기본 duration과 easing을 함께 씁니다. 등장을 강조하는 모션만 예외로 더 길고 튀는 emphasis 값을 씁니다. 순차 등장은 delay로 시차를 둡니다. 스테이지에 포인터를 올리면 두 easing을 비교할 수 있습니다."
      >
        <mm-token-stage>
          <mm-flex direction="column" gap="4">${renderMotionStage(motionTracks)}</mm-flex>
        </mm-token-stage>
        <mm-token-group>${renderTokenItems(sectionTokens('transition'))}</mm-token-group>
      </mm-token-section>

      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-flex>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
