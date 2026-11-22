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

/** 의미 토큰은 같은 모양의 두 자리표시자 사이에 놓인 간격으로 보여, 구조의 층위 차이를 거리로 비교하게 한다. */
const renderSpaceSemanticStage = (tokens: string[]) =>
  tokens.map(
    (token, index) => html`
      <mm-flex direction="column" align-items="center" gap="2">
        <div class="space-demo" style="--space-demo-gap: var(--${token})">
          <mm-ui-placeholder></mm-ui-placeholder>
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
 * 경계의 역할별 변형. border-color·border-width는 조립 재료라 혼자서는 그릴 수 없어
 * 이들을 합친 border부터 목록 순서대로 늘어놓고, 상태 경계는 뒤에 붙인다.
 */
const borderSwatches = [
  'border: var(--border)',
  'border: var(--border-transparent); background: var(--background-subtle-color)',
  'border: var(--border-danger)',
  'border: var(--border-selected)',
]

const radiusSwatches = [
  'border: var(--border)',
  'border: var(--border); border-radius: var(--radius-large)',
  'border: var(--border); border-radius: var(--radius-full)',
]

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
            토큰은 계층을 이루며, 실제로 쓰이는 자리에 가까운 단계일수록 구체적입니다. 각 단계는
            원칙적으로 바로 앞 단계의 토큰을 참조해 값을 물려받고, 토큰을 쓰는 쪽은 자신에게 가장
            가까운 단계를 참조합니다.
          </mm-paragraph>
          <mm-text-list
            variant="number"
            .texts=${[
              'Primitive — 색·크기·간격의 원시 값. 색은 gray800·green100처럼 색상과 단계로, 크기·간격은 size-, space-처럼 값의 종류로 이름 짓는다.',
              'System — primitive를 인터페이스의 역할에 매핑한다. background-color, border-color, foreground-subtle-color처럼 역할과 용도로 이름 짓는다.',
              'Component — system을 특정 컴포넌트의 속성에 매핑한다. avatar-background-color, notice-text-color처럼 컴포넌트명과 값을 적용하는 CSS 속성으로 이름 짓는다.',
            ]}
          ></mm-text-list>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="이름 규칙">
          <mm-text-list
            .texts=${[
              'System 토큰 이름은 대상, 세기나 상태, 값의 종류 순으로 짓는다. 예: foreground-subtle-color는 foreground(대상)·subtle(세기)·color(값의 종류)다.',
              '값의 종류는 이름 끝에 둔다. 색 토큰은 primary-color처럼 -color로 끝난다.',
              '대상이 정적인 값이면 이름에 상태를 넣지 않고, hover·selected처럼 인터랙션에 따라 바뀌는 값에만 상태를 넣는다.',
              '기본값은 base·default 같은 단어 없이 대상과 값의 종류만으로 짓는다. 예: background-base-color가 아니라 background-color. 이름이 짧아져 토큰이 가벼워진다. material-base처럼 base가 기반 머티리얼이라는 대상의 이름일 때만 그대로 쓴다.',
              '세기 차이는 subtle·strong로 나타낸다.',
              '대비 표면 위에 올라가는 색은 on- 접두사를 붙인다.',
            ]}
          ></mm-text-list>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Component Token은 언제 정의하나요?">
          <mm-paragraph>
            Component 토큰은 값이 바뀌는 경로가 있을 때 둡니다. 값이 한 가지로 고정되면 System
            토큰을 직접 참조합니다.
          </mm-paragraph>
          <mm-text-list
            .texts=${[
              '상태에 따라 재할당된다 — variant·size·hover 같은 상태 selector가 이 토큰 하나에 값을 다시 넣는다.',
              '쓰는 자리마다 다를 수 있어 사용하는 쪽에 연다 — table-width처럼 놓이는 자리에 맞춰 조정하는 값이다. 겹침 순서처럼 컴포넌트가 소유하는 규칙은 System 토큰을 직접 참조한다.',
            ]}
          ></mm-text-list>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Primitive 토큰은 언제 만드나요?">
          <mm-paragraph>
            Primitive 토큰은 같은 값이 두 곳 이상에서 쓰일 때 만듭니다. 한 곳에서만 쓰는 값은 예외로
            보고, 그 값을 쓰는 System 토큰에 직접 적습니다. 나중에 두 번째 자리가 생기면 그때
            Primitive 토큰으로 올립니다.
          </mm-paragraph>
        </mm-content-section>
      </mm-content-section-list>

      <mm-token-section
        heading="Color"
        description="원시 팔레트에는 그 색으로 상태를 표현하는 역할 토큰을 태그로 붙입니다. background 역할 토큰은 대비쌍을 얹어 명도 대비를 함께 확인합니다."
      >
        <mm-grid columns="6">${renderColorTokens(sectionTokens('palette'))}</mm-grid>

        <mm-separator></mm-separator>
        <mm-grid columns="4" aria-label="background color tokens">
          ${renderBackgroundTokens(sectionTokens('background'))}
        </mm-grid>

        <mm-separator></mm-separator>
        <mm-grid columns="4" aria-label="border color tokens">
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
        description="요소 사이의 거리를 정하는 값입니다. 원시값은 단계별로 고르고, 섹션 사이·하위 섹션 사이처럼 구조의 층위가 정해진 곳에는 의미 토큰을 씁니다. 같은 관계의 요소 사이는 어느 화면에서나 같은 간격이라 묶임과 구분이 한눈에 읽힙니다."
      >
        <mm-token-stage>
          <mm-flex align-items="center" gap="8">${renderSpaceStage(spaceStageTokens)}</mm-flex>
        </mm-token-stage>
        <mm-token-group aria-label="space primitive tokens">
          ${renderTokenItems(sectionTokens('space'))}
        </mm-token-group>

        <mm-separator></mm-separator>
        <mm-token-stage>
          <mm-flex gap="8">${renderSpaceSemanticStage(sectionTokens('spaceSemantic'))}</mm-flex>
        </mm-token-stage>
        <mm-token-group aria-label="space semantic tokens">
          ${renderTokenItems(sectionTokens('spaceSemantic'))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Layout"
        description="레이아웃 토큰은 페이지, 팝오버, 폼 컨테이너처럼 반복되는 구조의 최대 너비와 여백을 정의합니다."
      >
        <mm-token-group aria-label="layout primitive tokens">
          ${renderTokenItems(sectionTokens('layout').filter(name => !referencesOtherTokens(name)))}
        </mm-token-group>

        <mm-separator></mm-separator>
        <mm-token-group aria-label="layout component and semantic tokens">
          ${renderTokenItems(sectionTokens('layout').filter(referencesOtherTokens))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Border"
        description="테두리는 표면의 경계를 긋고, 모서리 곡률은 그 경계의 성격과 위계를 구분합니다."
      >
        <mm-token-stage>
          <mm-token-swatches .swatches=${borderSwatches}></mm-token-swatches>
        </mm-token-stage>
        <mm-token-group aria-label="border tokens">
          ${renderTokenItems(sectionTokens('border'))}
        </mm-token-group>

        <mm-token-stage>
          <mm-token-swatches .swatches=${radiusSwatches}></mm-token-swatches>
        </mm-token-stage>
        <mm-token-group aria-label="radius tokens">
          ${renderTokenItems(sectionTokens('radius'))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Material"
        description="재질은 표면이 뒤 배경에서 떠 보이는 정도입니다. 원시값은 값의 종류와 크기로 이름 짓고, 사용하는 쪽은 원시값을 색 토큰과 조합한 티어를 씁니다. 티어가 선언하지 않은 속성은 base를 따릅니다."
      >
        <mm-token-stage backdrop>
          <div class="material-stage">
            <mm-token-swatches
              .swatches=${shadowSwatches(sectionTokens('shadow'))}
            ></mm-token-swatches>
          </div>
        </mm-token-stage>
        <mm-token-group aria-label="shadow primitive tokens">
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
        <mm-token-group aria-label="blur and opacity primitive tokens">
          ${renderTokenItems([...sectionTokens('blur'), ...sectionTokens('opacity')])}
        </mm-token-group>

        <mm-token-stage backdrop>
          <div class="material-stage">${renderMaterialStage(sectionTokens('material'))}</div>
        </mm-token-stage>
        <mm-token-group aria-label="material tier tokens">
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
