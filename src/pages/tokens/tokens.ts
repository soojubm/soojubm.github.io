import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { DotTone } from '@/components/common/dot/dot.styles'
import type { TagTone } from '@/components/common/tag/tag.styles'
import type { ComponentReferenceItemData } from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
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
  radius: /^border-radius/,
  border: /^border/,
  shadow: /^shadow-/,
  blur: /^blur-/,
  opacity: /^opacity-/,
  zIndex: /^material-zindex-/,
  material: /^material-/,
  transition: /^transition-/,
  category: /^category-/,
  palette: /^(gray|green|red|yellow|orange|blue|black|white)\d+$/,
  background: /^background-/,
}

/**
 * 이 페이지가 다루지 않는 토큰. 소개되는 자리가 따로 있거나 한 컴포넌트가 소유하는 값이다.
 */
const documentedElsewhere = [
  /^interaction-/, // 색 토큰은 Color 섹션이, 나머지는 Interaction 페이지가 상태별로 소개한다
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

/** 선택 상태의 색 토큰. Interaction 페이지의 pressed·checked·selected·current가 함께 쓴다. */
const interactionSelectedColors = [
  'interaction-selected-background-color',
  'interaction-selected-foreground-color',
  'interaction-selected-border-color',
]

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
              border-radius: var(--border-radius);
            "
          ></div>
          <div style="width: var(--${token}); height: 4px; background: var(--primary-color)"></div>
          <div
            style="
              width: 2px;
              height: var(--size-32);
              background: var(--background-strong-color);
              border-radius: var(--border-radius);
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
  'background-strong-color': ['foreground-on-strong-color', 'foreground-subtle-color'],
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
  { easing: 'var(--transition-easing-open)', label: 'transition-easing-open' },
]

/** 토큰이 놓이는 계층. 계층마다 한 색으로 칠해, 사슬이 달라도 같은 계층이 같은 자리에 있음을 보인다. */
type TokenTier = 'component' | 'semantic' | 'primitive'

/** 범례 점의 tone은 이름 조각을 칠한 category 색과 같은 번호를 고른다. */
const tierLegends: Record<TokenTier, LegendItem> = {
  primitive: { label: 'Primitive Token', tone: 'yellow' },
  semantic: { label: 'Semantic Token', tone: 'cyan' },
  component: { label: 'Component Token', tone: 'pink' },
}

interface LegendItem {
  label: string
  tone: DotTone
}

/** 이름 조각을 계층마다 범례 점과 같은 색 계열로 칠한다. */
const tierTones: Record<TokenTier, TagTone> = {
  component: 'pink',
  semantic: 'cyan',
  primitive: 'yellow',
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

/** Primitive 값이 Semantic Token을 거쳐 Component Token에 이르는 실제 사슬. */
const tierChains: [TokenTier, string][][] = [
  [
    ['primitive', 'gray100'],
    ['semantic', 'background-subtle-color'],
    ['component', 'avatar.background-color'],
  ],
]

const renderTierChain = (chain: [TokenTier, string][]) => {
  const names = chain.map(([, name]) => name)

  return html`
    <div class="name-anatomy tier-chain" aria-label=${names.join(' → ')} role="group">
      ${chain.map(
        ([tier, name], index) => html`
          ${index > 0
            ? html`
                <span class="name-joiner" aria-hidden="true">→</span>
              `
            : ''}
          <mm-flex direction="column" align-items="flex-start" gap="1">
            <mm-code-tag size="large" tone=${tierTones[tier]}>${name}</mm-code-tag>
            <mm-caption>${tierLegends[tier].label}</mm-caption>
          </mm-flex>
        `,
      )}
    </div>
  `
}

/** Semantic Token 대상의 분류. Component Token의 State와 같은 이름·색을 쓴다. */
type SemanticGroup = 'state'

interface TokenKind {
  target: string
  description: string
  group?: SemanticGroup
  /** 이 종류가 나뉘거나 쓰이는 하위 이름. 종류 이름 옆에 다른 색으로 붙는다. */
  subtokens?: string[]
}

/** Primitive Token의 종류. 도형은 같은 종류 안에서 단계가 커지는 리듬을 그리고, 옆에 하위 이름을 붙인다. */
const primitiveKinds: TokenKind[] = [
  {
    target: 'color',
    description: '색상 이름과 단계로 나눈 팔레트',
    subtokens: ['background', 'foreground', 'border', 'interaction'],
  },
  { target: 'size', description: '요소 자체의 고정 치수', subtokens: ['width', 'height'] },
  {
    target: 'space',
    description: '요소 사이의 거리',
    subtokens: ['margin', 'padding', 'gap', 'offset'],
  },
  {
    target: 'border',
    description: '선의 두께와 모서리의 둥근 정도',
    subtokens: ['width', 'radius'],
  },
  { target: 'typography', description: '글자의 크기·굵기·행간' },
  {
    target: 'material',
    description: '표면이 떠 있는 정도와 겹침 순서',
    subtokens: ['shadow', 'blur', 'opacity', 'z-index'],
  },
]

// 분류가 있는 대상은 분류 색, 나머지는 이름 규칙의 대상 자리 색으로 칠한다.
const kindTone = (group?: SemanticGroup): TagTone => {
  if (group === 'state') return 'purple'

  return 'blue'
}

/** 종류마다 도형과 이름을 그린다. 분류가 있으면 이름을 분류 색으로, 하위 이름은 Semantic Token 색으로 칠한다. */
const renderTokenKind =
  (tier: TokenTier) =>
  ({ target, description, group, subtokens = [] }: TokenKind) =>
    html`
      <mm-flex direction="column" gap="3">
        <span class="kind-figure" data-tier=${tier} data-kind=${target} aria-hidden="true"></span>
        <mm-flex direction="column" align-items="flex-start" gap="2">
          <mm-tag-group>
            <mm-code-tag tone=${kindTone(group)}>${target}</mm-code-tag>
            ${subtokens.map(
              subtoken => html`
                <mm-code-tag tone=${tierTones.semantic}>${subtoken}</mm-code-tag>
              `,
            )}
          </mm-tag-group>
          <mm-caption>${description}</mm-caption>
        </mm-flex>
      </mm-flex>
    `

type CategoryName = (typeof WORD_CATEGORIES)[number]['name']

const categoryWords = (category: CategoryName): readonly string[] =>
  WORD_CATEGORIES.find(({ name }) => name === category)?.words ?? []

// Component Token 이름에 쓰는 상태 단어와 속성 단어. token.utils에서 읽어 컴포넌트 문서의 토큰 분류와 어긋나지 않게 한다.
const componentStateWords = categoryWords('state')
const componentKindWords = WORD_CATEGORIES.filter(({ name }) => name !== 'state').flatMap(
  ({ words }) => words,
)

/** 토큰 이름 조각이 맡는 자리. 같은 자리는 같은 색으로 칠해, 줄이 달라도 대상과 값의 종류가 같은 위치에 있음을 보인다. */
type NamePart = 'name' | 'target' | 'modifier' | 'kind'

interface NameSegment {
  texts: string[]
  part: NamePart
  label: string
}

const namePartTones: Record<NamePart, TagTone> = {
  name: 'default',
  target: 'blue',
  modifier: 'orange',
  kind: 'green',
}

/** 세기·대비 표면과 상태 규칙마다 Semantic Token 이름의 각 자리에 실제로 쓰는 단어를 모두 늘어놓는다. */
const semanticNameAnatomies: NameSegment[][] = [
  [
    { texts: ['background', 'foreground', 'border'], part: 'target', label: '대상' },
    {
      texts: ['subtle', 'strong', 'on-strong', 'on-primary', 'on-danger'],
      part: 'modifier',
      label: '세기·대비 표면',
    },
    { texts: ['color'], part: 'kind', label: '값의 종류' },
  ],
  [
    { texts: ['interaction'], part: 'target', label: '대상' },
    { texts: ['hover', 'active', 'focus', 'selected'], part: 'modifier', label: '상태' },
    {
      texts: ['background-color', 'foreground-color', 'border-color', 'outline', 'shadow', 'lift'],
      part: 'kind',
      label: '값의 종류',
    },
  ],
]

/** Component Token은 대상 자리에 컴포넌트명을 두고, 상태와 값의 종류에 쓰는 단어를 모두 늘어놓는다. */
const componentNameAnatomy: NameSegment[] = [
  { texts: ['button'], part: 'name', label: '컴포넌트' },
  { texts: [...componentStateWords], part: 'modifier', label: '상태' },
  { texts: [...componentKindWords], part: 'kind', label: '값의 종류' },
]

// 단어가 셋을 넘는 자리는 두 열로 접는다. 열 수를 정해 두어야 자리 폭이 단어 폭에 딱 맞고, 뒤의 '-'가 바로 붙는다.
const slotColumns = (texts: string[]) => {
  if (texts.length <= 3) return texts.length

  return 2
}

const renderNameSegment = ({ texts, part, label }: NameSegment) => html`
  <mm-flex class="name-slot" direction="column" align-items="flex-start" gap="1">
    <div class="slot-words" style=${styleMap({ '--slot-columns': String(slotColumns(texts)) })}>
      ${texts.map(
        text => html`
          <mm-code-tag tone=${namePartTones[part]}>${text}</mm-code-tag>
        `,
      )}
    </div>
    <mm-caption>${label}</mm-caption>
  </mm-flex>
`

const renderNameAnatomy = (segments: NameSegment[]) => {
  const ariaLabel = segments.map(({ label, texts }) => `${label}: ${texts.join(', ')}`).join(' - ')
  return html`
    <div class="name-anatomy" aria-label=${ariaLabel} role="group">
      ${segments.map(
        (segment, index) => html`
          ${index > 0
            ? html`
                <span class="name-joiner" aria-hidden="true">-</span>
              `
            : ''}
          ${renderNameSegment(segment)}
        `,
      )}
    </div>
  `
}

interface LayerTier {
  token: string
  tone: TagTone
  role: string
}

/** 앞에 놓이는 층부터 뒤로 나열한다. 한 칸 뒤로 갈수록 오른쪽으로 물러난다. */
const layerTiers: LayerTier[] = [
  { token: 'toast', tone: 'pink', role: '알림. 항상 최상단' },
  { token: 'tooltip', tone: 'cyan', role: '가리키는 대상이 어느 표면에 있든 그 위에 보이는 설명' },
  {
    token: 'popover',
    tone: 'orange',
    role: '트리거에 앵커된 표면. sheet 안에서 열려도 그 위에 보임',
  },
  { token: 'sheet', tone: 'purple', role: 'viewport를 덮는 표면. backdrop·dialog 포함' },
  { token: 'chrome', tone: 'blue', role: '화면에 고정된 내비게이션·툴바' },
  { token: 'base · elevated', tone: 'default', role: '콘텐츠 안에서 형제보다 살짝 뜨는 로컬 정도' },
]

const renderLayerTier = ({ token, tone, role }: LayerTier, index: number) => html`
  <mm-flex
    class="layer-tier"
    style=${`--layer-depth: ${index}`}
    direction="column"
    align-items="flex-start"
    gap="1"
  >
    <mm-code-tag size="large" tone=${tone}>${token}</mm-code-tag>
    <mm-caption>${role}</mm-caption>
  </mm-flex>
`

type PlaneShape = 'content' | 'topbar' | 'sidebar' | 'bottombar' | 'overlay'

interface AppShellLayer {
  token: string
  tone: TagTone
  members: string
  shapes: PlaneShape[]
}

/** 앱 셸 예제를 층별로 떼어 낸 그림. 앞에 놓이는 층부터 나열한다. */
const appShellLayers: AppShellLayer[] = [
  { token: 'toast', tone: 'pink', members: 'Overlay', shapes: ['overlay'] },
  { token: 'chrome-top', tone: 'blue', members: 'Sidebar', shapes: ['sidebar'] },
  {
    token: 'chrome',
    tone: 'blue',
    members: 'Top Bar · Bottom Bar',
    shapes: ['topbar', 'bottombar'],
  },
  { token: 'base', tone: 'default', members: 'Content', shapes: ['content'] },
]

/** 뒤 층부터 그려야 앞 층이 위에 겹친다. */
const renderAppShellLayerDiagram = () => html`
  <div
    class="layer-diagram"
    role="img"
    aria-label="앱 셸의 층: ${appShellLayers
      .map(({ token, members }) => `${members} ${token}`)
      .join(', ')}"
  >
    ${[...appShellLayers].reverse().map(
      ({ token, tone, members, shapes }) => html`
        <div
          class="layer-diagram-row"
          style=${`--layer-index: ${appShellLayers.findIndex(layer => layer.token === token)}`}
        >
          <div class="layer-diagram-plane">
            ${shapes.map(
              shape => html`
                <span class="layer-diagram-shape" data-shape=${shape}></span>
              `,
            )}
          </div>
          <span class="layer-diagram-leader" aria-hidden="true"></span>
          <mm-flex direction="column" align-items="flex-start" gap="1">
            <mm-code-tag size="large" tone=${tone}>${token}</mm-code-tag>
            <mm-caption>${members}</mm-caption>
          </mm-flex>
        </div>
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
        <mm-grid columns="3" gap="6">${primitiveKinds.map(renderTokenKind('primitive'))}</mm-grid>
      </mm-page-header>

      <mm-content-section-list>
        <mm-content-section heading-level="3" heading="계층">
          <mm-paragraph>
            Primitive는 값을, Semantic은 그 값이 화면에서 맡는 역할을, Component Token은
            컴포넌트마다 조정할 자리를 맡습니다. 맡은 일이 나뉘어 있어 한 계층을 바꿔도 다른 계층은
            그대로 둘 수 있습니다.
          </mm-paragraph>
          <mm-token-stage>
            <mm-flex class="stage-content" direction="column" gap="6">
              ${renderLegend(Object.values(tierLegends))}
              <mm-flex direction="column" gap="6">${tierChains.map(renderTierChain)}</mm-flex>
              <mm-text-list
                .texts=${[
                  'Primitive Token은 변하지 않는 기본 값이다.',
                  'Semantic Token은 Primitive에 인터페이스에서의 역할을 붙인 값이다.',
                  'Component Token은 Semantic Token을 한 컴포넌트의 속성에 연결한 값이다.',
                ]}
              ></mm-text-list>
            </mm-flex>
          </mm-token-stage>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="이름 규칙">
          <mm-text-list
            .texts=${[
              '기본값에는 base·default를 붙이지 않는다. base가 대상 이름인 material-base는 예외로 그대로 쓴다.',
              '같은 값을 쓰더라도 역할이 다르면 이름을 나눈다. foreground-color와 background-strong-color는 라이트 테마에서 같은 gray800이지만, 다크 테마에서는 서로 다른 값으로 바뀐다.',
              '강한 표면 위 글자색은 on- 뒤에 표면 이름을 붙인다. 테마가 표면 색을 바꿀 때 그 위 글자색도 같은 이름으로 함께 바꿀 수 있어, 테마마다 대비가 깨지지 않는다.',
            ]}
          ></mm-text-list>
          <mm-token-stage>
            <mm-flex class="stage-content" direction="column">
              <mm-flex direction="column" gap="6">
                ${semanticNameAnatomies.map(renderNameAnatomy)}
              </mm-flex>
              <mm-separator></mm-separator>
              ${renderNameAnatomy(componentNameAnatomy)}
            </mm-flex>
          </mm-token-stage>
        </mm-content-section>
      </mm-content-section-list>

      <mm-token-section
        icon=${ICON_NAMES.PALETTE}
        heading="Color"
        description="색은 면과 글자의 역할과 상태를 구분합니다."
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
        <mm-grid columns="4" role="group" aria-label="선택 상태 색 토큰">
          ${renderColorTokens(interactionSelectedColors)}
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
        description="표면이 뒤 배경에서 떠 보이는 정도와 겹칠 때의 순서를 정합니다. 사용하는 쪽은 그림자·blur·투명도를 색과 조합한 티어를 쓰고, 원시 값은 티어를 정의할 때만 씁니다. 티어가 정하지 않은 속성은 base를 따릅니다."
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

        <mm-separator></mm-separator>
        <mm-token-stage>
          <mm-flex
            class="layer-stack"
            direction="column"
            gap="4"
            role="group"
            aria-label="겹침 순서: 앞에서 뒤로"
          >
            <mm-caption>앞</mm-caption>
            ${layerTiers.map(renderLayerTier)}
            <mm-caption>뒤</mm-caption>
          </mm-flex>
        </mm-token-stage>
        <mm-token-stage>${renderAppShellLayerDiagram()}</mm-token-stage>
        <mm-token-group aria-label="겹침 순서 토큰">
          ${renderTokenItems(sectionTokens('zIndex'))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Transition"
        description="모든 모션은 기본 duration과 easing을 함께 씁니다. 열리는 모션은 더 길게 열고, 패널이 나타나는 transform만 살짝 튀는 open easing을 씁니다. 순차 등장은 delay로 시차를 둡니다. 스테이지에 포인터를 올리면 두 easing을 비교할 수 있습니다."
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
