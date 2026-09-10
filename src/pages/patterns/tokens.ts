import { html, nothing } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'

import { rootTokenNames } from '@/components/domains/component/token-values'
import { renderPage } from '@/components/layouts/base-layouts'
import './tokens.css'

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://design-tokens.github.io/community-group/format',
    label: 'W3C - Design Tokens Format Module',
    external: true,
  },
  {
    href: 'https://docs.specifyapp.com/concepts/token-types',
    label: 'Specify - Token Types',
    external: true,
  },
  {
    href: 'https://www.delldesignsystem.com/foundations/elevation/',
    label: 'Dell Design System - Elevation',
    external: true,
  },
  {
    href: 'https://www.delldesignsystem.com/foundations/typography/',
    label: 'Dell Design System - Typography',
    external: true,
  },
  {
    href: 'https://atlassian.design/components/tokens/all-tokens',
    label: 'Atlassian Design - Tokens',
    external: true,
  },
  {
    href: 'https://medium.com/eightshapes-llc/size-in-design-systems-64f234aec519',
    label: 'EightShapes - Size in Design Systems',
    external: true,
  },
]

/**
 * 섹션이 소개할 토큰을 이름 규칙으로 고른다. variables.css의 :root 선언 순서가 곧 나열 순서다.
 * 위에서부터 먼저 걸리는 규칙이 토큰을 가져가므로 더 좁은 규칙을 앞에 둔다.
 */
const sectionPatterns = {
  typography: /^font-/,
  size: /^size-/,
  space: /^space-/,
  layout: /^(navbar-height$|layout-)/,
  border: /^border/,
  radius: /^radius/,
  shadow: /(^shadow-|-shadow$)/,
  material: /-(blur|opacity)$/,
  surface: /^surface-/,
  zIndex: /^material-zindex-/,
  transition: /^(transition-|animation-delay-)/,
  palette: /^(gray|green|red|yellow|orange|blue)\d+$/,
  background: /^background-/,
}

/**
 * 이 페이지가 다루지 않는 토큰. 소개되는 자리가 따로 있거나 한 컴포넌트가 소유하는 값이다.
 * 여기에도 없고 어느 섹션에도 걸리지 않는 토큰은 "그 외"로 드러나, 토큰이 늘어도 문서가 조용히 뒤처지지 않는다.
 */
const documentedElsewhere = [
  /^interaction-/, // Interaction 페이지가 상태별로 소개한다
  /^tag-category-/, // mm-tag가 소유하는 카테고리 팔레트
  /^(primary|accent|success|warning|danger|foreground)-/, // Color 섹션에 태그·대비쌍으로 나온다
  /^control-/, // control pill의 모양값
  /^newneek-/, // 포트폴리오 사례 전용 브랜드 색
]

const groupedTokens = () => {
  const patterns = Object.entries(sectionPatterns)
  const grouped: Record<string, string[]> = {}

  for (const name of rootTokenNames) {
    if (documentedElsewhere.some(pattern => pattern.test(name))) continue

    const [key] = patterns.find(([, pattern]) => pattern.test(name)) ?? ['other']
    grouped[key] = [...(grouped[key] ?? []), name]
  }

  return grouped
}

const tokensBySection = groupedTokens()

const sectionTokens = (key: keyof typeof sectionPatterns | 'other') => tokensBySection[key] ?? []

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

/**
 * 스테이지 한 줄. 스와치는 공통 박스를 쓰고, 토큰마다 달라지는 선언만 인라인으로 얹는다.
 * 번호는 스와치를 가리키는 순번이며, 스테이지는 아래 토큰 목록과 같은 순서로 늘어놓는다.
 */
const renderStage = (swatches: string[]) =>
  swatches.map(
    (swatch, index) => html`
      <mm-flex direction="column" align-items="center" gap="2">
        <div class="token-swatch" style=${swatch}></div>
        <mm-list-marker variant="number" value=${index + 1}></mm-list-marker>
      </mm-flex>
    `,
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
 * 한 표면에 여러 조합을 보여줘야 하면 카드를 나눠 배열로 쌓는다.
 */
const backgroundPairs: Record<string, string[][]> = {
  'background-color': [
    ['foreground-color', 'foreground-subtle-color'],
    ['foreground-success-color'],
    ['foreground-warning-color'],
    ['foreground-danger-color'],
  ],
  'background-subtle-color': [['foreground-color']],
  'background-strong-color': [['foreground-on-strong-color']],
  'background-primary-color': [['foreground-on-primary-color']],
  'background-warning-color': [['foreground-on-warning-color']],
}

const renderBackgroundTokens = (names: string[]) =>
  names.flatMap(name =>
    (backgroundPairs[name] ?? [[]]).map(
      pairs => html`
        <mm-color-token name=${name} .pairs=${pairs}></mm-color-token>
      `,
    ),
  )

/** 음수 토큰은 폭으로 그릴 수 없어 스테이지에서 뺀다. 목록 끝에 있으므로 번호는 그대로 맞는다. */
const spaceStageTokens = sectionTokens('space').filter(name => !name.endsWith('-minus'))

// 티어가 둘뿐이라 토큰 이름을 조립하지 않고 그대로 적는다. 이름이 소스에 남아야 쓰임이 보인다.
const blurSwatches = [
  `background: rgb(255 255 255 / var(--surface-chrome-opacity));
   backdrop-filter: blur(var(--surface-chrome-blur));
   -webkit-backdrop-filter: blur(var(--surface-chrome-blur))`,
  `background: rgb(255 255 255 / var(--surface-overlay-opacity));
   backdrop-filter: blur(var(--surface-overlay-blur));
   -webkit-backdrop-filter: blur(var(--surface-overlay-blur))`,
]

/**
 * 경계의 역할별 변형. border-color·border-width는 조립 재료라 혼자서는 그릴 수 없어
 * 이들을 합친 border부터 목록 순서대로 늘어놓고, 상태 경계는 뒤에 붙인다.
 * 선택 상태 토큰은 색만 담으므로 두께·스타일과 함께 조립한다.
 */
const borderSwatches = [
  'border: var(--border)',
  'border: var(--border-transparent); background: var(--background-subtle-color)',
  'border: var(--border-danger)',
  'border: var(--border-width) solid var(--interaction-selected-border-color)',
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

/**
 * 어느 섹션에도 걸리지 않고 다른 페이지가 맡지도 않은 토큰. 평소에는 비어 있고,
 * variables.css에 토큰이 늘었는데 문서가 따라오지 못했을 때만 나타난다.
 */
const renderUncategorizedSection = () => {
  const names = sectionTokens('other')
  if (!names.length) return nothing

  return html`
    <mm-token-section
      heading="그 외"
      description="variables.css에 선언되어 있지만 아직 어느 섹션에도 들어가지 않은 토큰입니다. 알맞은 섹션의 이름 규칙에 넣거나, 다른 페이지가 소개한다면 그 사실을 규칙에 남깁니다."
    >
      <mm-token-group>${renderTokenItems(names)}</mm-token-group>
    </mm-token-section>
  `
}

const main = html`
  <mm-page>
    <mm-flex direction="column" gap="16">
      <mm-page-header
        heading="Tokens"
        description="제품의 시각 언어를 구성하는 원자 값입니다. 색상, 글꼴, 간격, 크기, 형태, 레이어, 모션을 토큰으로 관리해 컴포넌트와 패턴이 같은 기준을 공유하게 합니다."
      ></mm-page-header>

      <mm-content-section-list>
        <mm-content-section heading-level="3" heading="계층">
          <mm-paragraph>
            토큰은 계층을 이루며, 소비처에 가까운 단계일수록 구체적입니다. 각 단계는 원칙적으로 바로
            앞 단계의 토큰을 참조해 값을 물려받고, 소비처는 자신에게 가장 가까운 단계를 참조합니다.
          </mm-paragraph>
          <mm-text-list
            variant="number"
            .texts=${[
              'Primitive — 색·크기·간격의 원시 값. 색은 gray800·green100처럼 색상과 단계로, 크기·간격은 size-, space-처럼 값의 종류로 이름 짓는다.',
              'System — primitive를 인터페이스의 역할에 매핑한다. background-color, border-color, body-font-size처럼 역할과 용도로 이름 짓는다.',
              'Component — system을 특정 컴포넌트의 속성에 매핑한다. avatar-border-color, sheet-height처럼 컴포넌트명과 소비하는 속성으로 이름 짓는다.',
            ]}
          ></mm-text-list>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="이름 규칙">
          <mm-text-list
            .texts=${[
              'System 토큰 이름은 name-Base-State-(on-priority) 꼴을 따른다.',
              '값의 종류는 이름 끝에 둔다. 색 토큰은 primary-color처럼 -color로 끝나며, color-를 앞에 붙이지 않는다.',
              'Base는 정적인 값으로 크기·간격의 Dimension과 재질·표면의 Surface로 나뉘고, State는 hover·selected처럼 인터랙션에 따라 바뀌는 값이다.',
              '세기 차이는 subtle·strong로 나타내고, 대비 표면 위에 올라가는 색은 on- 접두사를 붙인다.',
            ]}
          ></mm-text-list>
        </mm-content-section>
      </mm-content-section-list>

      <mm-token-section
        heading="Color"
        description="원시 팔레트에 그 색을 참조하는 시맨틱 토큰을 태그로 붙입니다. background 역할 토큰은 대비쌍을 얹어 명도 대비를 함께 확인합니다."
      >
        <mm-grid columns="6">${renderColorTokens(sectionTokens('palette'))}</mm-grid>

        <mm-separator variant="section"></mm-separator>
        <mm-grid columns="4" aria-label="background color tokens">
          ${renderBackgroundTokens(sectionTokens('background'))}
        </mm-grid>
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
        description="요소의 크기를 결정합니다. 주로 height에 사용하고 정사각형 요소에 한정하여 width에 사용합니다."
      >
        <mm-token-stage>
          <mm-flex align-items="flex-end" gap="8">
            ${renderStage(sizeSwatches(sectionTokens('size')))}
          </mm-flex>
        </mm-token-stage>
        <mm-token-group>${renderTokenItems(sectionTokens('size'))}</mm-token-group>
      </mm-token-section>

      <mm-token-section heading="Space" description="space는 요소 사이의 거리입니다.">
        <mm-token-stage>
          <mm-flex align-items="center" gap="8">${renderSpaceStage(spaceStageTokens)}</mm-flex>
        </mm-token-stage>
        <mm-token-group>${renderTokenItems(sectionTokens('space'))}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Layout"
        description="레이아웃 토큰은 페이지, 팝오버, 폼 컨테이너처럼 반복되는 구조의 최대 너비와 여백을 정의합니다."
      >
        <mm-token-group>${renderTokenItems(sectionTokens('layout'))}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Border"
        description="테두리는 표면의 경계와 클릭 가능성을 표현합니다."
      >
        <mm-token-stage>
          <mm-flex align-items="flex-end" gap="4">${renderStage(borderSwatches)}</mm-flex>
        </mm-token-stage>
        <mm-token-group>${renderTokenItems(sectionTokens('border'))}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Radius"
        description="모서리 곡률은 요소의 성격과 위계를 시각적으로 구분합니다."
      >
        <mm-token-stage>
          <mm-flex align-items="flex-end" gap="4">${renderStage(radiusSwatches)}</mm-flex>
        </mm-token-stage>
        <mm-token-group>${renderTokenItems(sectionTokens('radius'))}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Shadow"
        description="그림자는 레이어의 고도와 부유감을 표현합니다."
      >
        <mm-token-stage>
          <mm-flex align-items="flex-end" gap="4">
            ${renderStage(shadowSwatches(sectionTokens('shadow')))}
          </mm-flex>
        </mm-token-stage>
        <mm-token-group aria-label="shadow primitive tokens">
          ${renderTokenItems(sectionTokens('shadow'))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Blur &amp; Opacity"
        description="material은 뒤 배경을 얼마나 흐리고 덮을지 정하는 blur·opacity 쌍입니다. 단계가 오를수록 더 흐리고 더 불투명해집니다."
      >
        <mm-token-stage>
          <div class="blur-stage">
            <mm-flex gap="4">${renderStage(blurSwatches)}</mm-flex>
          </div>
        </mm-token-stage>
        <mm-token-group aria-label="material primitive tokens">
          ${renderTokenItems(sectionTokens('material'))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Surface"
        description="surface 재질 티어는 z-index 역할 구분과 맞춰 나뉩니다. 한 티어의 표면 속성은 함께 선언되어 테마별로 교체됩니다."
      >
        <mm-token-group aria-label="surface tier tokens">
          ${renderTokenItems(sectionTokens('surface'))}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Z-index"
        description="z-index는 레이어의 우선순위를 정의합니다. 같은 레이어군 안에서만 비교되도록 의미 이름을 사용합니다."
      >
        <mm-token-group>${renderTokenItems(sectionTokens('zIndex'))}</mm-token-group>

        <mm-text-list
          .texts=${[
            'base — mm-separator의 구분선, 배경 위에 놓는 텍스트처럼 형제 요소 위에 그리기 위한 로컬 컨텍스트',
            'raised — 목록·그룹 안에서 형제보다 살짝 뜨는 요소. 예: mm-scroll-hint, mm-portfolio-item의 오버레이',
            'chrome — 화면에 고정된 내비게이션·툴바. 예: mm-top-bar(sticky 상태), mm-fixed-bottom(mm-bottom-bar가 이 안에 놓여 함께 뜬다)',
            'chrome-top — 그중 화면 전체를 덮는 전역 내비게이션. 페이지 고정 바 위에 남아야 한다. 예: mm-navbar, 사이드 메뉴',
            'overlay — 드롭다운·팝오버·툴팁류. 예: mm-tooltip, mm-popover(mm-select 등 드롭다운의 기반)',
            'modal — 화면을 덮는 대화형 표면. 예: mm-backdrop, mm-sheet, mm-dialog, 긴급 배너',
            'toast — 알림, 스낵바처럼 항상 다른 모든 레이어 위에 있어야 하는 요소. 예: mm-toast, 건너뛰기(skip) 링크',
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

      ${renderUncategorizedSection()}

      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-flex>
  </mm-page>
`

renderPage(main)
