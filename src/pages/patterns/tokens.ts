import { html } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'

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

interface ContrastPair {
  textColor: string
  label: string
  contrast?: string
}

interface ColorTokenEntry {
  color: string
  token: string
  pairs?: ContrastPair[]
  tags?: string
}

const renderTokenItems = (keys: string[]) =>
  keys.map(
    key => html`
      <mm-token-item key=${key}></mm-token-item>
    `,
  )

const renderColorTokens = (entries: ColorTokenEntry[]) =>
  entries.map(
    entry => html`
      <mm-color-token
        color=${entry.color}
        token=${entry.token}
        tags=${entry.tags ?? ''}
        .pairs=${entry.pairs ?? []}
      ></mm-color-token>
    `,
  )

const renderSizeStage = (tokens: string[]) =>
  tokens.map(
    (token, index) => html`
      <mm-flex direction="column" align-items="center" gap="2">
        <div
          style="
            width: var(--${token});
            height: var(--${token});
            background: var(--background-strong-color);
            border-radius: var(--radius);
            flex-shrink: 0;
          "
        ></div>
        <mm-list-marker variant="number" value=${index + 1}></mm-list-marker>
      </mm-flex>
    `,
  )

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

interface BorderSwatch {
  border: string
  radius: string
  background: string
  marker: number
}

const renderBorderStage = (swatches: BorderSwatch[]) =>
  swatches.map(
    ({ border, radius, background, marker }) => html`
      <mm-flex direction="column" align-items="center" gap="2">
        <div
          style="
            width: var(--size-48);
            height: var(--size-48);
            border: ${border};
            border-radius: ${radius};
            background: ${background};
            flex-shrink: 0;
          "
        ></div>
        <mm-list-marker variant="number" value=${marker}></mm-list-marker>
      </mm-flex>
    `,
  )

const renderShadowStage = (tokens: string[]) =>
  tokens.map(
    (token, index) => html`
      <mm-flex direction="column" align-items="center" gap="2">
        <div
          style="
            width: var(--size-48);
            height: var(--size-48);
            border-radius: var(--radius);
            background: var(--background-color);
            box-shadow: var(--${token});
            flex-shrink: 0;
          "
        ></div>
        <mm-list-marker variant="number" value=${index + 1}></mm-list-marker>
      </mm-flex>
    `,
  )

interface BlurSwatch {
  opacity: string
  blur: string
}

const renderBlurStage = (swatches: BlurSwatch[]) =>
  swatches.map(
    ({ opacity, blur }, index) => html`
      <mm-flex direction="column" align-items="center" gap="2">
        <div
          style="
            width: var(--size-48);
            height: var(--size-48);
            border-radius: var(--radius);
            background: rgb(255 255 255 / ${opacity});
            backdrop-filter: blur(${blur});
            -webkit-backdrop-filter: blur(${blur});
            flex-shrink: 0;
          "
        ></div>
        <mm-list-marker variant="number" value=${index + 1}></mm-list-marker>
      </mm-flex>
    `,
  )

const grayscaleColorTokens: ColorTokenEntry[] = [
  { color: 'var(--gray0)', token: 'gray0: #fff' },
  { color: 'var(--gray100)', token: 'gray100: #f5f6f5' },
  { color: 'var(--gray200)', token: 'gray200: #d2d7d5' },
  { color: 'var(--gray400)', token: 'gray400: #8a908d' },
  { color: 'var(--gray800)', token: 'gray800: #303b35' },
  { color: 'var(--green100)', token: 'green100: green tint', tags: 'primary-subtle' },
  { color: 'var(--green800)', token: 'green800: #1b995c', tags: 'accent' },
  { color: 'var(--red100)', token: 'red100: red tint' },
  { color: 'var(--red800)', token: 'red800: #f02849', tags: 'danger' },
  { color: 'var(--yellow800)', token: 'yellow800: gold', tags: 'accent' },
  { color: 'var(--orange800)', token: 'orange800: #fb7800', tags: 'warning' },
  { color: 'var(--blue800)', token: 'blue800: #1d4ed8', tags: 'success' },
]

const backgroundColorTokens: ColorTokenEntry[] = [
  {
    color: 'var(--gray0)',
    pairs: [
      { textColor: 'var(--foreground-color)', label: 'foreground', contrast: '11.7:1' },
      {
        textColor: 'var(--foreground-subtle-color)',
        label: 'foreground-subtle',
        contrast: '3.3:1',
      },
    ],
    token: 'background: #fff',
  },
  {
    color: 'var(--gray0)',
    pairs: [
      {
        textColor: 'var(--foreground-success-color)',
        label: 'foreground-success',
        contrast: '8.7:1',
      },
    ],
    token: 'background: #fff',
  },
  {
    color: 'var(--gray0)',
    pairs: [
      {
        textColor: 'var(--foreground-warning-color)',
        label: 'foreground-warning',
        contrast: '6.5:1',
      },
    ],
    token: 'background: #fff',
  },
  {
    color: 'var(--gray0)',
    pairs: [
      {
        textColor: 'var(--foreground-danger-color)',
        label: 'foreground-danger',
        contrast: '5.9:1',
      },
    ],
    token: 'background: #fff',
  },
  {
    color: 'var(--gray100)',
    pairs: [{ textColor: 'var(--foreground-color)', label: 'foreground', contrast: '10.8:1' }],
    token: 'background-subtle: #f5f6f5',
  },
  {
    color: 'var(--gray800)',
    pairs: [
      {
        textColor: 'var(--foreground-on-strong-color)',
        label: 'foreground-on-strong',
        contrast: '11.7:1',
      },
    ],
    token: 'background-strong: #303b35',
  },
  {
    color: 'var(--background-primary-color)',
    pairs: [
      {
        textColor: 'var(--foreground-on-primary-color)',
        label: 'foreground-on-primary',
        contrast: '3.6:1',
      },
    ],
    token: 'background-primary',
  },
  {
    color: 'var(--background-warning-color)',
    pairs: [
      {
        textColor: 'var(--foreground-on-warning-color)',
        label: 'foreground-on-warning',
        contrast: '1.5:1',
      },
    ],
    token: 'background-warning',
  },
]

const typographyTokenItems: string[] = [
  'font-family',
  'font-family-code',
  'font-weight-normal',
  'font-weight-bold',
  'font-size-32',
  'font-size-24',
  'font-size-18',
  'font-size-14',
  'font-size-12',
  'font-line-height-40',
  'font-line-height-32',
  'font-line-height-28',
  'font-line-height-24',
  'font-line-height-16',
]

const sizeTokenItems: string[] = ['size-16', 'size-24', 'size-32', 'size-40', 'size-48', 'size-80']

const spaceTokenItems: string[] = [
  'space-1',
  'space-2',
  'space-3',
  'space-4',
  'space-6',
  'space-8',
  'space-12',
  'space-16',
  'space-section',
  'space-1-minus',
]

/** 음수 토큰은 폭으로 그릴 수 없어 스테이지에서 뺀다. 목록 끝에 있으므로 번호는 그대로 맞는다. */
const spaceStageTokens = spaceTokenItems.filter(name => !name.endsWith('-minus'))

const layoutTokenItems: string[] = [
  'navbar-height',
  'layout-width-wide',
  'layout-width-small',
  'layout-width-narrow',
  'layout-width-sidebar',
  'layout-max-width',
  'layout-padding-inline',
  'layout-main-space-top',
  'layout-sidebar-space-top',
]

const borderTokenItems: string[] = [
  'border-width',
  'border-color',
  'border',
  'border-transparent',
  'border-danger',
  'radius',
  'radius-large',
  'radius-full',
]

const shadowTokenItems: string[] = [
  'shadow-high',
  'surface-base-shadow',
  'surface-chrome-shadow',
  'surface-overlay-shadow',
]

const materialTokenItems: string[] = [
  'surface-chrome-blur',
  'surface-chrome-opacity',
  'surface-overlay-blur',
  'surface-overlay-opacity',
]

const blurStageSwatches: BlurSwatch[] = [
  { opacity: 'var(--surface-chrome-opacity)', blur: 'var(--surface-chrome-blur)' },
  { opacity: 'var(--surface-overlay-opacity)', blur: 'var(--surface-overlay-blur)' },
]

const surfaceTokenItems: string[] = [
  'surface-base-background-color',
  'surface-base-border',
  'surface-base-backdrop-filter',
  'surface-chrome-background-color',
  'surface-chrome-border',
  'surface-chrome-backdrop-filter',
  'surface-overlay-background-color',
  'surface-overlay-border',
  'surface-overlay-backdrop-filter',
]

const borderStageSwatches: BorderSwatch[] = [
  {
    border: 'var(--border)',
    radius: 'var(--radius)',
    background: 'var(--background-color)',
    marker: 1,
  },
  {
    border: 'var(--border)',
    radius: 'var(--radius)',
    background: 'var(--background-color)',
    marker: 2,
  },
  {
    border: 'var(--interaction-selected-border-color)',
    radius: 'var(--radius)',
    background: 'var(--background-color)',
    marker: 3,
  },
  {
    border: 'var(--border-transparent)',
    radius: 'var(--radius)',
    background: 'var(--background-subtle-color)',
    marker: 4,
  },
  {
    border: 'var(--border)',
    radius: 'var(--radius)',
    background: 'var(--background-color)',
    marker: 1,
  },
  {
    border: 'var(--border)',
    radius: 'var(--radius-large)',
    background: 'var(--background-color)',
    marker: 2,
  },
  {
    border: 'var(--border)',
    radius: 'var(--radius-full)',
    background: 'var(--background-color)',
    marker: 3,
  },
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

const transitionTokenItems: string[] = [
  'transition-duration',
  'transition-easing',
  'transition-easing-emphasis',
]

const animationTokenItems: string[] = [
  'duration-quickly',
  'animation-duration',
  'animation-delay-first',
  'animation-delay-second',
  'animation-delay-third',
]

const zIndexTokenItems: string[] = [
  'material-zindex-base',
  'material-zindex-raised',
  'material-zindex-chrome',
  'material-zindex-chrome-top',
  'material-zindex-overlay',
  'material-zindex-modal',
  'material-zindex-toast',
]

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
              'foreground·background·border 계열은 subtle·strong로 세기를 나누고, 대비 표면 위의 색은 on- 접두사를 붙인다.',
            ]}
          ></mm-text-list>
        </mm-content-section>
      </mm-content-section-list>

      <mm-token-section
        heading="Color"
        description="원시 팔레트에 그 색을 참조하는 시맨틱 토큰을 태그로 붙입니다. background 역할 토큰은 대비쌍을 얹어 명도 대비를 함께 확인합니다."
      >
        <mm-grid columns="6">${renderColorTokens(grayscaleColorTokens)}</mm-grid>

        <mm-separator variant="section"></mm-separator>
        <mm-grid columns="4" aria-label="background color tokens">
          ${renderColorTokens(backgroundColorTokens)}
        </mm-grid>
      </mm-token-section>

      <mm-token-section
        heading="Typography"
        description="타이포그래피 토큰은 크기와 고정 행간을 함께 사용합니다. 행간은 컴포넌트의 역할에 맞춰 조합합니다."
      >
        <mm-flex direction="column" gap="4">
          <mm-surface variant="outlined" radius="large">
            <mm-marquee gap="4" speed="80" pause-on-hover>
              <mm-text size="32" weight="bold">
                font-family: Alan Sans, Gothic A1, system-ui, sans-serif
              </mm-text>
              <mm-text size="32" weight="bold">font-size: 32px</mm-text>
              <mm-text size="32" weight="bold">line-height: 40px</mm-text>
            </mm-marquee>
          </mm-surface>
          <mm-surface variant="outlined" radius="large">
            <mm-marquee gap="4" speed="64" pause-on-hover>
              <mm-text size="24" weight="bold">
                font-family: Alan Sans, Gothic A1, system-ui, sans-serif
              </mm-text>
              <mm-text size="24" weight="bold">font-size: 24px</mm-text>
              <mm-text size="24" weight="bold">line-height: 32px</mm-text>
            </mm-marquee>
          </mm-surface>
          <mm-surface variant="outlined" radius="large">
            <mm-marquee gap="4" speed="64" pause-on-hover>
              <mm-text size="18" weight="bold">
                font-family: Alan Sans, Gothic A1, system-ui, sans-serif
              </mm-text>
              <mm-text size="18" weight="bold">font-size: 18px</mm-text>
              <mm-text size="18" weight="bold">line-height: 28px</mm-text>
            </mm-marquee>
          </mm-surface>
          <mm-surface variant="outlined" radius="large">
            <mm-marquee gap="4" speed="64" pause-on-hover>
              <mm-text size="14" weight="bold">
                font-family: Alan Sans, Gothic A1, system-ui, sans-serif
              </mm-text>
              <mm-text size="14" weight="bold">font-size: 14px</mm-text>
              <mm-text size="14" weight="bold">line-height: 24px</mm-text>
            </mm-marquee>
          </mm-surface>
          <mm-surface variant="outlined" radius="large">
            <mm-marquee gap="4" speed="64" pause-on-hover>
              <mm-text size="12" weight="bold">
                font-family: Alan Sans, Gothic A1, system-ui, sans-serif
              </mm-text>
              <mm-text size="12" weight="bold">font-size: 12px</mm-text>
              <mm-text size="12" weight="bold">line-height: 16px</mm-text>
            </mm-marquee>
          </mm-surface>
        </mm-flex>

        <mm-token-group>${renderTokenItems(typographyTokenItems)}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Size"
        description="요소의 크기를 결정합니다. 주로 height에 사용하고 정사각형 요소에 한정하여 width에 사용합니다."
      >
        <mm-token-stage>
          <mm-flex align-items="flex-end" gap="8">${renderSizeStage(sizeTokenItems)}</mm-flex>
        </mm-token-stage>
        <mm-token-group>${renderTokenItems(sizeTokenItems)}</mm-token-group>
      </mm-token-section>

      <mm-token-section heading="Space" description="space는 요소 사이의 거리입니다.">
        <mm-token-stage>
          <mm-flex align-items="center" gap="8">${renderSpaceStage(spaceStageTokens)}</mm-flex>
        </mm-token-stage>
        <mm-token-group>${renderTokenItems(spaceTokenItems)}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Layout"
        description="레이아웃 토큰은 페이지, 팝오버, 폼 컨테이너처럼 반복되는 구조의 최대 너비와 여백을 정의합니다."
      >
        <mm-token-group>${renderTokenItems(layoutTokenItems)}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Border"
        description="테두리는 표면의 경계와 클릭 가능성을 표현합니다. 모서리 곡률은 요소의 성격과 위계를 시각적으로 구분합니다."
      >
        <mm-token-stage>
          <mm-flex align-items="flex-end" gap="4">
            ${renderBorderStage(borderStageSwatches)}
          </mm-flex>
        </mm-token-stage>
        <mm-token-group>${renderTokenItems(borderTokenItems)}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Shadow"
        description="그림자는 레이어의 고도와 부유감을 표현합니다."
      >
        <mm-token-stage>
          <mm-flex align-items="flex-end" gap="4">${renderShadowStage(shadowTokenItems)}</mm-flex>
        </mm-token-stage>
        <mm-token-group aria-label="shadow primitive tokens">
          ${renderTokenItems(shadowTokenItems)}
        </mm-token-group>

        <mm-separator></mm-separator>
      </mm-token-section>

      <mm-token-section
        heading="Blur &amp; Opacity"
        description="material은 뒤 배경을 얼마나 흐리고 덮을지 정하는 blur·opacity 쌍입니다. 단계가 오를수록 더 흐리고 더 불투명해집니다."
      >
        <mm-token-stage>
          <div
            style="
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
            height: 100px;
            border-radius: var(--radius-large);
            overflow: hidden;
            background: linear-gradient(
              135deg,
              var(--primary-color) 0%,
              var(--accent-color) 50%,
              var(--danger-color) 100%
            );
          "
          >
            <mm-flex gap="4">${renderBlurStage(blurStageSwatches)}</mm-flex>
          </div>
        </mm-token-stage>
        <mm-token-group aria-label="material primitive tokens">
          ${renderTokenItems(materialTokenItems)}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Surface"
        description="surface 재질 티어는 z-index 역할 구분과 맞춰 나뉩니다. 한 티어의 표면 속성은 함께 선언되어 테마별로 교체됩니다."
      >
        <mm-token-group aria-label="surface tier tokens">
          ${renderTokenItems(surfaceTokenItems)}
        </mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Z-index"
        description="z-index는 레이어의 우선순위를 정의합니다. 같은 레이어군 안에서만 비교되도록 의미 이름을 사용합니다."
      >
        <mm-token-group>${renderTokenItems(zIndexTokenItems)}</mm-token-group>

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
        description="모든 transition은 하나의 duration을 공유하고 easing만 기본과 오버슈트(등장 강조)로 나뉩니다. 스테이지에 마우스를 올리면 두 easing의 차이를 볼 수 있습니다."
      >
        <mm-token-stage>
          <mm-flex direction="column" gap="4">${renderMotionStage(motionTracks)}</mm-flex>
        </mm-token-stage>
        <mm-token-group>${renderTokenItems(transitionTokenItems)}</mm-token-group>
      </mm-token-section>

      <mm-token-section
        heading="Animation"
        description="애니메이션 토큰은 등장·강조 모션의 길이와 순차 등장의 지연을 정의합니다."
      >
        <mm-token-group>${renderTokenItems(animationTokenItems)}</mm-token-group>
      </mm-token-section>

      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-flex>
  </mm-page>
`

renderPage(main)
