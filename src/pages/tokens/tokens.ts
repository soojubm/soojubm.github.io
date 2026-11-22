import { html } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component'

import { referencesOtherTokens, rootTokenNames } from '@/components/domains/component/token-values'
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

/** System Token은 같은 모양의 두 자리표시자 사이에 놓인 간격으로 보여, 구조의 층위 차이를 거리로 비교하게 한다. */
const renderSpaceSemanticStage = (tokens: string[]) =>
  tokens.map(
    (token, index) => html`
      <mm-flex class="space-cell" direction="column" align-items="center" gap="2">
        <div class="space-demo" style="--space-demo-gap: var(--${token})">
          <mm-ui-placeholder></mm-ui-placeholder>
          <div class="space-gap"></div>
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

interface TokenTier {
  heading: string
  description: string
  examples: string[]
}

/** 계층마다 무엇을 정하고, 이름에 쓰임이 얼마나 드러나며, 누가 참조하는지를 같은 순서로 쓴다. */
const tokenTiers: TokenTier[] = [
  {
    heading: 'Primitive',
    description:
      '디자인 언어가 쓸 수 있는 값의 목록이다. 값만 담고 어디에 쓰는지는 말하지 않으므로, 대개 System Token을 거쳐 간접적으로 쓴다. 색은 색상과 단계로, 크기·간격은 값의 종류와 단계로 이름 짓는다.',
    examples: ['gray800', 'green800', 'size-32', 'space-4'],
  },
  {
    heading: 'System',
    description:
      'Primitive에 인터페이스에서의 역할을 붙인 값이다. 이름이 쓰임을 말하므로 컴포넌트와 페이지가 직접 참조하고, 테마는 이 계층이 가리키는 Primitive를 바꿔 전체 인상을 바꾼다. 대상, 세기나 상태, 값의 종류 순으로 이름 짓는다.',
    examples: ['background-color', 'foreground-subtle-color', 'interaction-hover-background-color'],
  },
  {
    heading: 'Component',
    description:
      'System을 한 컴포넌트의 속성에 연결한 값이다. 토큰만 바꿔 컴포넌트를 테마에 맞출 수 있게 한다. 컴포넌트명 뒤에 값을 적용하는 CSS 속성을 붙여 이름 짓는다.',
    examples: ['avatar-background-color', 'notice-text-color', 'table-width'],
  },
]

const renderTokenTier = ({ heading, description, examples }: TokenTier) => html`
  <mm-surface variant="outlined">
    <mm-text-block level="4" heading=${heading} description=${description}>
      <mm-flex wrap="wrap" gap="2">
        ${examples.map(
          example => html`
            <mm-code>${example}</mm-code>
          `,
        )}
      </mm-flex>
    </mm-text-block>
  </mm-surface>
`

/** 토큰 이름 조각이 맡는 자리. 같은 자리는 같은 색으로 칠해, 줄이 달라도 대상과 값의 종류가 같은 위치에 있음을 보인다. */
type NamePart = 'target' | 'modifier' | 'kind'

interface NameSegment {
  text: string
  part: NamePart
  label: string
}

/** 기본값·세기·상태·on- 규칙을 하나씩 보여 주는 실제 System Token. 값의 종류를 이름 끝에 둔다는 규칙은 목록 대신 이 그래픽이 보여 준다. */
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
              <span class="name-hyphen" aria-hidden="true">-</span>
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
        description="제품의 시각 언어를 구성하는 원자 값입니다. 색상, 글꼴, 간격, 크기, 형태, 레이어, 모션을 토큰으로 관리해 컴포넌트와 패턴이 같은 기준을 공유하게 합니다."
      ></mm-page-header>

      <mm-content-section-list>
        <mm-content-section heading-level="3" heading="계층">
          <mm-paragraph>
            토큰은 디자인 결정을 추상화 수준에 따라 세 계층으로 나눕니다. 아래 계층은 쓸 수 있는
            값을, 위 계층은 그 값을 어디에 쓰는지를 정합니다. 각 계층은 바로 아래 계층을 참조해 값을
            물려받고, 토큰을 쓰는 쪽은 자신에게 가장 가까운 계층을 참조합니다.
          </mm-paragraph>
          <mm-grid columns="3" gap="4">${tokenTiers.map(renderTokenTier)}</mm-grid>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="이름 규칙">
          <mm-token-stage>
            <mm-flex direction="column" gap="6">${nameAnatomies.map(renderNameAnatomy)}</mm-flex>
          </mm-token-stage>
          <mm-text-list
            .texts=${[
              '기본값에는 base·default를 붙이지 않는다. base가 대상 이름인 material-base는 예외로 그대로 쓴다.',
              '세기 차이는 subtle·strong으로 나타낸다.',
              '상태는 인터랙션에 따라 바뀌는 값에만 넣는다.',
              '대비 표면 위에 올라가는 색은 on- 접두사를 붙인다.',
            ]}
          ></mm-text-list>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Component Token은 언제 정의하나요?">
          <mm-component-notice heading="Component Token을 정의하는 기준을 정한다">
            토큰만 바꿔 컴포넌트를 테마에 맞출 수 있게 한다는 목표만 있다. 어떤 시각적 규칙에
            Component Token을 두는지는 정하지 않았다
          </mm-component-notice>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Primitive Token은 언제 만드나요?">
          <mm-paragraph>
            같은 값이 두 곳 이상에서 쓰일 때 만듭니다. 한 곳에서만 쓰는 값은 예외 케이스로
            기록해둡니다.
          </mm-paragraph>
        </mm-content-section>
      </mm-content-section-list>

      <mm-token-section
        heading="Color"
        description="Primitive 팔레트에는 그 색으로 상태를 표현하는 역할 토큰을 태그로 붙입니다. background 역할 토큰은 대비쌍을 얹어 명도 대비를 함께 확인합니다."
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
        description="타이포그래피 토큰은 크기와 고정 행간을 함께 사용합니다. 행간은 컴포넌트의 역할에 맞춰 조합합니다."
      >
        <mm-notice
          heading="크기와 행간의 비율"
          description="mm-text의 size는 글자 크기와 행간을 한 쌍으로 묶습니다. 12/16(1.33), 14/24(1.71), 18/28(1.56), 24/32(1.33), 32/40(1.25)로, 비율을 하나로 고정하지 않고 행간을 4px 배수에 맞춥니다. 크기는 제목용(24·32, 1.25~1.33)과 본문용(14·18, 1.56~1.71)으로 나뉘고 12는 보조 텍스트에 쓰지만, 14와 18은 제목에도 쓰여 본문 기준의 넓은 행간이 제목에도 그대로 적용됩니다. 본문용인 두 크기도 비율이 서로 다릅니다. 같은 비율로 맞추면 4px 배수로는 28/36(2.0)이 가장 작아 지나치게 넓고, 2px 단위를 허용한 22/28(약 1.57)이 가장 가까운 대안입니다."
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
        description="요소의 크기를 정하는 값입니다. 높이에 쓰고, 정사각형 요소에만 너비에도 씁니다. 같은 단계를 쓰는 요소는 크기가 같아 나란히 놓였을 때 어긋나 보이지 않습니다."
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
        description="요소 사이의 거리를 정하는 값입니다. Primitive Token은 단계별로 고르고, 섹션 사이·하위 섹션 사이처럼 구조의 층위가 정해진 곳에는 System Token을 씁니다. 같은 관계의 요소 사이는 어느 화면에서나 같은 간격이라 묶임과 구분이 한눈에 읽힙니다."
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
        <mm-token-group aria-label="space System Token">
          ${renderTokenItems(sectionTokens('spaceSemantic'))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Layout"
        description="레이아웃 토큰은 페이지, 팝오버, 폼 컨테이너처럼 반복되는 구조의 최대 너비와 여백을 정의합니다."
      >
        <mm-token-group aria-label="layout Primitive Token">
          ${renderTokenItems(sectionTokens('layout').filter(name => !referencesOtherTokens(name)))}
        </mm-token-group>

        <mm-separator></mm-separator>
        <mm-token-group aria-label="layout Component·System Token">
          ${renderTokenItems(sectionTokens('layout').filter(referencesOtherTokens))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Border"
        description="테두리는 표면의 경계를 긋고, 모서리 곡률은 그 경계의 성격과 위계를 구분합니다."
      >
        <mm-token-stage>
          <mm-token-swatches
            .swatches=${borderSwatches(sectionTokens('border'))}
          ></mm-token-swatches>
        </mm-token-stage>
        <mm-token-group aria-label="테두리 토큰">
          ${renderTokenItems(sectionTokens('border'))}
        </mm-token-group>

        <mm-token-stage>
          <mm-token-swatches
            .swatches=${radiusSwatches(sectionTokens('radius'))}
          ></mm-token-swatches>
        </mm-token-stage>
        <mm-token-group aria-label="모서리 곡률 토큰">
          ${renderTokenItems(sectionTokens('radius'))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Material"
        description="재질은 표면이 뒤 배경에서 떠 보이는 정도입니다. Primitive Token은 값의 종류와 크기로 이름 짓고, 사용하는 쪽은 Primitive Token을 색 토큰과 조합한 티어를 씁니다. 티어가 선언하지 않은 속성은 base를 따릅니다."
      >
        <mm-token-stage backdrop>
          <div class="material-stage">
            <mm-token-swatches
              .swatches=${shadowSwatches(sectionTokens('shadow'))}
            ></mm-token-swatches>
          </div>
        </mm-token-stage>
        <mm-token-group aria-label="그림자 Primitive Token">
          ${renderTokenItems(sectionTokens('shadow'))}
        </mm-token-group>

        <mm-token-stage backdrop>
          <div class="material-stage">
            <mm-token-swatches
              .swatches=${[
                ...blurSwatches(sectionTokens('blur')),
                ...opacitySwatches(sectionTokens('opacity')),
              ]}
            ></mm-token-swatches>
          </div>
        </mm-token-stage>
        <mm-token-group aria-label="blur·opacity Primitive Token">
          ${renderTokenItems([...sectionTokens('blur'), ...sectionTokens('opacity')])}
        </mm-token-group>

        <mm-token-stage backdrop>
          <div class="material-stage">${renderMaterialStage(sectionTokens('material'))}</div>
        </mm-token-stage>
        <mm-token-group aria-label="재질 티어 토큰">
          ${renderTokenItems(sectionTokens('material'))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Z-index"
        description="z-index는 레이어의 우선순위를 정의합니다. 같은 레이어군 안에서만 비교되도록 의미 이름을 사용합니다."
      >
        <mm-token-group>${renderTokenItems(sectionTokens('zIndex'))}</mm-token-group>

        <mm-text-list
          .texts=${[
            'base — 형제 요소 위에 그리기 위한 로컬 레이어. 구분선, 배경 위에 놓는 텍스트가 쓴다.',
            'elevated — 목록·그룹 안에서 형제보다 살짝 뜨는 요소.',
            'chrome — 화면에 고정된 내비게이션·툴바.',
            'chrome-top — chrome 중 화면 전체를 덮는 전역 내비게이션. 페이지에 고정된 바 위에 남아야 한다.',
            'backdrop — modal 표면 뒤를 덮는 dim·blur 레이어.',
            'sheet — viewport를 기준으로 화면을 덮는 표면.',
            'popover — 트리거에 앵커되어 뜨는 표면. 트리거가 sheet 안에 있어도 그 위에 보여야 한다.',
            'tooltip — 포인터나 포커스를 따라 잠깐 뜨는 설명. 가리키는 대상이 어느 표면에 있든 그 위에 보여야 한다.',
            'toast — 알림처럼 항상 다른 모든 레이어 위에 있어야 하는 요소.',
          ]}
        ></mm-text-list>
      </mm-token-section>

      <mm-token-section
        heading="Transition"
        description="기본 모션은 duration과 easing을 하나씩 공유하고, 등장 강조 모션만 더 긴 duration과 오버슈트 easing을 씁니다. 순차 등장은 delay로 시차를 둡니다. 스테이지에 마우스를 올리면 두 easing의 차이를 볼 수 있습니다."
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
