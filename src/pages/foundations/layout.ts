import { html } from 'lit'

import type { TagTone } from '@/components/common/tag/tag.styles'

import './layout.css'

import '@/components/common/separator/separator'
import '@/components/domains/chart/chart-legend'
import type { ChartLegendItem } from '@/components/domains/chart/chart-legend'
import '@/components/domains/component/component-notice'
import '@/components/domains/ui-placeholder/ui-placeholder'
import { code, rule } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

type OverlayInfo = {
  name: string
  modal: boolean
  role?: string
  layer: string
  focus: boolean
  close: string[]
}

const anchoredOverlays: OverlayInfo[] = [
  {
    name: 'Popover',
    modal: false,
    layer: 'popover',
    focus: true,
    close: ['outside click', 'ESC', 'focus out', 'close()'],
  },
  {
    name: 'Select',
    modal: false,
    role: 'listbox',
    layer: 'popover',
    focus: true,
    close: ['outside click', 'ESC', 'option select'],
  },
  {
    name: 'Tooltip',
    modal: false,
    role: 'tooltip',
    layer: 'tooltip',
    focus: false,
    close: ['pointer leave', 'focus out'],
  },
]

const viewportOverlays: OverlayInfo[] = [
  {
    name: 'Dialog',
    modal: true,
    role: 'alertdialog',
    layer: 'sheet',
    focus: true,
    close: ['ESC', 'close()'],
  },
  {
    name: 'Sheet',
    modal: true,
    role: 'dialog',
    layer: 'sheet',
    focus: true,
    close: ['outside click', 'ESC', 'close button'],
  },
  { name: 'Backdrop', modal: true, layer: 'backdrop', focus: false, close: [] },
  {
    name: 'Toast',
    modal: false,
    role: 'status',
    layer: 'toast',
    focus: false,
    close: ['timeout'],
  },
]

/** 작은 화면 위에 anchored overlay가 놓이는 자리를 그린다. 패널이 트리거 옆에 붙는다. */
const renderAnchoredDiagram = () => html`
  <mm-figure-card
    class="overlay-figure-card"
    description="트리거의 아래, 시작 가장자리에 맞춰 붙는다"
  >
    <div slot="figure" class="overlay-screen" data-kind="anchored">
      <span class="overlay-trigger"></span>
      <span class="overlay-panel"></span>
    </div>
    <mm-code-tag slot="tags">bottom-start</mm-code-tag>
  </mm-figure-card>
`

/** viewport overlay가 화면 기준으로 놓이는 다섯 자리를 한 화면에서 차례로 옮겨 가며 보인다. */
const renderViewportDiagram = () => html`
  <mm-figure-card
    class="overlay-figure-card"
    description="트리거 위치와 상관없이 화면 기준의 자리에서 열린다"
  >
    <div slot="figure" class="overlay-screen" data-kind="viewport">
      <span class="overlay-panel"></span>
    </div>
    ${['center', 'top', 'right', 'bottom', 'left'].map(
      placement => html`
        <mm-code-tag slot="tags">${placement}</mm-code-tag>
      `,
    )}
  </mm-figure-card>
`

const overlayLegendItems: ChartLegendItem[] = [
  { label: 'modal', tone: 'blue' },
  { label: 'non-modal', tone: 'green' },
  { label: 'role', tone: 'purple' },
  { label: 'layer', tone: 'orange' },
  { label: 'focus move on open', tone: 'cyan' },
  { label: '닫는 방법', tone: 'default' },
]

const controllerNames = [
  'DisclosureController',
  'SheetController',
  'AdaptiveOverlay',
  'EscapeKeyController',
  'OutsideClickController',
  'PortalController',
]

/** overlay 하나의 이름과 분류 속성을 색으로 구분된 태그로 나열한다. */
const renderOverlay = (overlay: OverlayInfo) =>
  html`
    <mm-flex direction="column" gap="2">
      <mm-code-tag size="large" tone=${overlay.modal ? 'blue' : 'green'}>
        ${overlay.name}
      </mm-code-tag>
      <mm-tag-group>
        <mm-code-tag tone=${overlay.modal ? 'blue' : 'green'}>
          ${overlay.modal ? 'Modal' : 'Non-modal'}
        </mm-code-tag>
        <mm-code-tag tone="purple">${overlay.role ?? 'none'}</mm-code-tag>
        <mm-code-tag tone="orange">${overlay.layer}</mm-code-tag>
        <mm-code-tag tone="cyan">${overlay.focus ? 'focus move' : 'no focus move'}</mm-code-tag>
        ${(overlay.close.length ? overlay.close : ['none']).map(
          method => html`
            <mm-code-tag>${method}</mm-code-tag>
          `,
        )}
      </mm-tag-group>
    </mm-flex>
  `

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

const placementTypeCode = `type Side = 'top' | 'right' | 'bottom' | 'left'
type Alignment = 'start' | 'end'

// anchored overlay (popover · select · tooltip): \`\${Side}\` | \`\${Side}-\${Alignment}\`
type AnchorPlacementType =
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'

// viewport overlay (sheet): 화면의 가장자리. dialog는 위치 값 없이 화면 가운데에 열린다.
type ViewportPlacementType = Side`

/** 간격 자리. 토큰을 알려 줄 자리에만 태그를 얹어, 태그가 간격의 한가운데에 걸치게 한다. */
const renderSpacingGap = (level: 'section' | 'group' | 'element', token?: string) => html`
  <span class="spacing-gap" data-level=${level}>
    ${token
      ? html`
          <mm-code-tag>${token}</mm-code-tag>
        `
      : ''}
  </span>
`

const renderSpacingElement = () => html`
  <mm-ui-placeholder></mm-ui-placeholder>
`

/** 첫 그룹의 첫 요소 사이에만 토큰을 적고 나머지는 같은 간격만 둔다. */
const renderSpacingGroup = (token?: string) => html`
  <div class="spacing-group">
    ${renderSpacingElement()}${renderSpacingGap('element', token)}${renderSpacingElement()}
    ${renderSpacingGap('element')}${renderSpacingElement()}
  </div>
`

const renderSpacingSection = (labeled = false) => html`
  <div class="spacing-section">
    ${renderSpacingGroup(labeled ? '--space-2' : undefined)}${renderSpacingGap(
      'group',
      labeled ? '--space-4' : undefined,
    )}${renderSpacingGroup()}
  </div>
`

/** 앞의 섹션들과 형태가 완전히 다른 가운데 정렬 모듈로, 맥락이 바뀌었음을 보여 준다. */
const renderSpacingOtherContext = () => html`
  <div class="contrast-module">
    <mm-ui-placeholder variant="avatar"></mm-ui-placeholder>
    <mm-ui-placeholder variant="heading"></mm-ui-placeholder>
    <mm-ui-placeholder variant="text"></mm-ui-placeholder>
  </div>
`

/** 같은 형태의 섹션 둘은 간격으로, 형태가 다른 맥락과는 구분선으로 구획한 한 화면을 그린다. */
const renderSpacingOverview = () => html`
  <mm-token-stage full-width>
    <mm-flex direction="column">
      ${renderSpacingSection(true)}${renderSpacingGap(
        'section',
        '--space-section',
      )}${renderSpacingSection()}
      <mm-separator variant="section"></mm-separator>
      ${renderSpacingOtherContext()}
    </mm-flex>
  </mm-token-stage>
`

const renderUsageTags = (tags: string[] = []) =>
  tags.map(
    tag =>
      html`
        <mm-tag>${tag}</mm-tag>
      `,
  )

/** 화면 폭을 나타내는 트랙 위에, 본문이 차지하는 너비만큼의 막대를 가운데에 놓는다. */
const widthExample = (options: {
  caption: string
  /** 캡션이 가리키는 페이지 성격에 해당하는 용도들. */
  tags?: string[]
  token: string
  /** 이 너비를 정하는 레이아웃 토큰 이름. */
  widthToken?: string
  /** 양끝 여백 토큰 이름을 함께 보인다. 모든 예시가 같은 여백이라 첫 예시에만 쓴다. */
  gutterToken?: boolean
  category: number
  tone: TagTone
  maxWidth?: string
  description?: string
  links: [href: string, label: string][]
}) => html`
  <mm-flex direction="column" gap="2">
    <div class="width-track">
      <div
        class="width-extent"
        style=${options.maxWidth
          ? `max-width: calc(${options.maxWidth} + 2 * var(--layout-padding-inline))`
          : ''}
      >
        <mm-text class="width-extent-label" size="12" data-extent-label></mm-text>
        <div class="width-extent-row">
          <div class="width-gutter"><mm-text size="12">5vw</mm-text></div>
          <div
            class="width-bar"
            style=${`--width-bar-background-color: var(--category-${
              options.category
            }-background-color);${options.maxWidth ? ` max-width: ${options.maxWidth}` : ''}`}
          >
            <mm-code-tag tone=${options.tone}>${options.token}</mm-code-tag>
          </div>
          <div class="width-gutter"><mm-text size="12">5vw</mm-text></div>
        </div>
      </div>
    </div>
    ${options.widthToken
      ? html`
          <mm-tag-group>
            <mm-code-tag>${options.widthToken}</mm-code-tag>
            ${options.gutterToken
              ? html`
                  <mm-code-tag>--layout-padding-inline</mm-code-tag>
                `
              : ''}
          </mm-tag-group>
        `
      : ''}
    <mm-tag-group>
      <mm-tag tone=${options.tone}>${options.caption}</mm-tag>
      ${renderUsageTags(options.tags)}
    </mm-tag-group>
    ${options.description
      ? html`
          <mm-paragraph>${options.description}</mm-paragraph>
        `
      : ''}
    <mm-flex gap="3" wrap="wrap">
      ${options.links.map(
        ([href, label]) =>
          html`
            <mm-link href=${href}>${label}</mm-link>
          `,
      )}
    </mm-flex>
  </mm-flex>
`

/** 페이지 너비와 같은 트랙·막대 모양으로, 트랙의 배경만 달리해 배경 대비를 보인다. */
const renderBackgroundExample = (options: {
  caption: string
  tags?: string[]
  values: string[]
  subtle?: boolean
}) => html`
  <mm-flex direction="column" gap="2">
    <div class="width-track" data-subtle=${options.subtle ? 'true' : 'false'}>
      <div
        class="width-bar"
        data-outlined
        style="--width-bar-background-color: var(--background-color); max-width: var(--layout-width-small)"
      ></div>
    </div>
    <mm-tag-group>
      ${options.values.map(
        value =>
          html`
            <mm-code-tag>${value}</mm-code-tag>
          `,
      )}
    </mm-tag-group>
    <mm-caption>${options.caption}</mm-caption>
    <mm-tag-group>${renderUsageTags(options.tags)}</mm-tag-group>
  </mm-flex>
`

/** 왼쪽 정렬로 흐르는 본문 사이에 가운데 정렬 모듈을 끼워, 정렬의 대비를 한 화면에 그린다. */
const renderAlignmentContrast = () => {
  const renderFlow = (tag: string) => html`
    <div class="contrast-flow">
      <mm-code-tag>${tag}</mm-code-tag>
      <mm-ui-placeholder variant="heading"></mm-ui-placeholder>
      <mm-ui-placeholder variant="text"></mm-ui-placeholder>
      <mm-ui-placeholder variant="text"></mm-ui-placeholder>
    </div>
  `

  return html`
    <mm-token-stage>
      <div class="contrast-page">
        ${renderFlow('text-align: start')}
        <div class="contrast-module">
          <mm-code-tag tone="blue">text-align: center</mm-code-tag>
          <mm-ui-placeholder variant="avatar"></mm-ui-placeholder>
          <mm-ui-placeholder variant="heading"></mm-ui-placeholder>
          <mm-ui-placeholder variant="text"></mm-ui-placeholder>
        </div>
        ${renderFlow('text-align: start')}
      </div>
    </mm-token-stage>
  `
}

const main = html`
  <mm-main>
    <mm-page-header
      heading="Layout"
      description="페이지 너비, 요소 사이의 간격, 화면 위로 뜨는 overlay의 층위를 정합니다. 이 신호들은 장식이 아니라 페이지의 성격과 작업 맥락을 드러내므로, 사용자는 의식하지 못해도 맥락이 달라졌다는 미묘한 감각을 얻습니다."
    ></mm-page-header>

    <mm-page-body>
      <mm-tab-list value="page" variant="text" search-param="tab">
        <mm-tab value="page">Page</mm-tab>
        <mm-tab value="division">Division</mm-tab>
        <mm-tab value="overlay">Overlay</mm-tab>
        <mm-tab value="elevation">Elevation</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="page">
        <mm-content-section-list>
          <mm-content-section
            heading-level="3"
            heading="페이지 너비"
            description="너비로 읽기 밀도를 정합니다. 본문 골격은 mm-main의 width로, 떠오르는 overlay는 각 컴포넌트의 width로 지정합니다."
          >
            <mm-token-stage full-width>
              <mm-flex direction="column" gap="6">
                ${widthExample({
                  caption: '집중형',
                  tags: ['폼', '인증'],
                  token: '400px',
                  widthToken: '--layout-width-narrow',
                  gutterToken: true,
                  category: 2,
                  tone: 'green',
                  maxWidth: 'var(--layout-width-narrow)',
                  links: [['./auth.html', 'Auth']],
                })}
                ${widthExample({
                  caption: '일반 문서',
                  tags: ['에디토리얼', '설정', '대화'],
                  token: '640px',
                  widthToken: '--layout-width-small',
                  category: 1,
                  tone: 'blue',
                  maxWidth: 'var(--layout-width-small)',
                  links: [
                    ['./post.html', 'Post'],
                    ['./setting.html', 'Setting'],
                    ['./chat.html', 'Chat'],
                  ],
                })}
                ${widthExample({
                  caption: '와이드형',
                  tags: ['요금제', '상품'],
                  description: '비교하며 고르는 화면은 두세 열이 들어갈 폭을 준다',
                  token: '960px',
                  widthToken: '--layout-width-large',
                  category: 4,
                  tone: 'orange',
                  maxWidth: 'var(--layout-width-large)',
                  links: [
                    ['./pricing.html', 'Pricing'],
                    ['./product.html', 'Product'],
                  ],
                })}
                ${widthExample({
                  caption: '확장형',
                  tags: ['목록', '대시보드', '프로필'],
                  description: '넓은 폭은 목록·대시보드처럼 훑어보는 화면에 쓴다',
                  token: '100%',
                  widthToken: '--layout-width-full',
                  category: 8,
                  tone: 'purple',
                  maxWidth: 'var(--layout-width-full)',
                  links: [
                    ['./dashboard.html', 'Dashboard'],
                    ['./profile.html', 'Profile'],
                  ],
                })}
              </mm-flex>
            </mm-token-stage>
          </mm-content-section>

          <mm-content-section
            heading-level="3"
            heading="배경 대비"
            description="글쓰기·설정·소개처럼 이전 화면과 다른 정보 구조로 들어갈 때 페이지 배경을 한 단계 낮춰 다른 맥락으로 넘어왔다는 감각을 줍니다."
          >
            <mm-token-stage full-width>
              <mm-flex direction="column" gap="6">
                ${renderBackgroundExample({
                  caption: '이전 화면',
                  values: ['background', 'default'],
                })}
                ${renderBackgroundExample({
                  caption: '다른 정보 구조',
                  tags: ['글쓰기', '설정', '소개'],
                  values: ['background', 'subtle'],
                  subtle: true,
                })}
              </mm-flex>
            </mm-token-stage>
          </mm-content-section>

          <mm-content-section
            heading-level="3"
            heading="콘텐츠 모듈의 대비"
            description="상태 변화·결과·맥락 전환을 전달하는 콘텐츠 모듈은 주변 콘텐츠와 대비를 만들어 사용자의 주의를 끌어옵니다."
          >
            <mm-paragraph>
              완료·오류·빈 상태를 보여 주는 ${code('mm-result')}가 이 규칙을 따릅니다.
            </mm-paragraph>
            ${renderAlignmentContrast()}
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="division">
        <mm-content-section-list>
          <mm-text-block
            level="3"
            heading=""
            description="사용자는 요소를 하나씩 읽기보다 가까이 놓인 것끼리 묶어 읽습니다. 그래서 덩어리 안의 간격은 덩어리 사이의 간격보다 좁아야 하며, 중첩이 한 단계 바깥으로 나갈수록 간격이 한 단계씩 커집니다. 한 경계에 간격과 구분선을 함께 쓰지 않습니다."
          >
            ${renderSpacingOverview()}
          </mm-text-block>

          <mm-grid columns="2" gap="4">
            <mm-flex direction="column" gap="2">
              <mm-heading level="3">
                <mm-code-tag size="large">Gap</mm-code-tag>
              </mm-heading>
              <mm-tag-group>
                <mm-code-tag tone="green">같은 맥락</mm-code-tag>
              </mm-tag-group>
              <mm-text size="14">
                같은 맥락의 그룹·섹션·리스트는 간격으로 구획합니다. 같은 모양의 제목과 여백이 콘텐츠
                그룹마다 반복되는 리듬은 구획되었다는 인상을 줍니다.
              </mm-text>
              <mm-text-list
                variant="check"
                .texts=${[
                  rule(
                    html`
                      간격은 부모 요소의 ${code('gap')}으로 둔다
                    `,
                    html`
                      형제의 ${code('margin')}·${code('padding')}으로 두지 않는다
                    `,
                  ),
                ]}
              ></mm-text-list>
              <mm-component-notice heading="Figma 오토 레이아웃도 같은 방식이다">
                항목 사이 간격을 항목이 아니라 부모 프레임의
                <mm-link href="https://help.figma.com/hc/en-us/articles/360040451373">
                  Spacing between items
                </mm-link>
                으로 정합니다. 항목이 빠지거나 순서가 바뀌어도 간격이 겹치거나 사라지지 않습니다.
              </mm-component-notice>
            </mm-flex>

            <mm-flex direction="column" gap="2">
              <mm-heading level="3">
                <mm-code-tag size="large">Separator</mm-code-tag>
              </mm-heading>
              <mm-tag-group>
                <mm-code-tag tone="blue">다른 맥락</mm-code-tag>
              </mm-tag-group>
              <mm-text size="14">
                맥락이 달라지는 자리에만 구분선을 긋습니다. 반복되는 패턴의 리듬이 구획되었다는
                인상을 줄 수 있습니다. 구분선을 과도하게 사용하면 시각적 노이즈로 작용할 수
                있습니다.
              </mm-text>
              <mm-text-list
                variant="check"
                .texts=${[
                  rule('separator는 서로 다른 맥락 사이에만 둔다'),
                  rule('separator가 구획을 맡으면 컨테이너에 gap을 두지 않는다'),
                ]}
              ></mm-text-list>
            </mm-flex>
          </mm-grid>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="overlay">
        <mm-content-section-list>
          <mm-flex direction="column" gap="4">
            <mm-grid columns="2" gap="4">
              <mm-content-section heading-level="3" heading="Anchored overlay">
                ${renderAnchoredDiagram()} ${anchoredOverlays.map(renderOverlay)}
              </mm-content-section>
              <mm-content-section heading-level="3" heading="Viewport overlay">
                ${renderViewportDiagram()} ${viewportOverlays.map(renderOverlay)}
              </mm-content-section>
            </mm-grid>
            <mm-chart-legend .items=${overlayLegendItems}></mm-chart-legend>
          </mm-flex>

          <mm-content-section
            heading-level="3"
            heading="Modal × Non-Modal"
            description="modal은 열린 동안 뒤의 화면을 막는 overlay입니다. 작업을 마치거나 취소해야 다음으로 넘어가는 흐름에 쓰며, 삭제 확인·중요 정보 입력·결제가 여기에 해당합니다."
          >
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  'modal이 열려 있는 동안 뒤 화면은 조작할 수 없게 한다',
                  html`
                    뒤 화면에서 포커스가 움직이거나 스크롤되면 사용자가 modal을 벗어났다고
                    착각하거나 하던 작업의 위치를 잃는다. 뒤 화면은 backdrop으로 흐려 보이게 하고,
                    ${code('inert')}로 포커스를 받지 못하게 하며, 스크롤을 멈춘다. 스크롤 위치는
                    기억했다가 닫을 때 그 자리로 되돌린다
                  `,
                ),
                rule(
                  'non-modal overlay에서 Tab으로 나가면 닫고, 포커스를 트리거로 되돌린다',
                  html`
                    Tab으로 나갔을 때 포커스가 트리거 다음 요소가 아니라 엉뚱한 곳으로 가면 사용자가
                    위치를 잃는다. overlay를 벗어나면 닫고 포커스를 트리거로 되돌려, 다음 Tab이
                    트리거에서 이어지게 한다. 바깥을 눌러 닫을 때는 사용자가 누른 곳의 포커스를
                    빼앗지 않는다
                  `,
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Placement Type">
            <mm-code-block language="typescript" .code=${placementTypeCode}></mm-code-block>
          </mm-content-section>

          <mm-text-block
            level="3"
            heading="컨트롤러"
            description="열림 상태, 스크롤 잠금, portal 이동처럼 overlay가 공통으로 하는 동작은 컨트롤러가 맡고, overlay 컴포넌트는 이를 가져다 씁니다."
          >
            <mm-tag-group>
              ${controllerNames.map(
                name => html`
                  <mm-code-tag>${name}</mm-code-tag>
                `,
              )}
            </mm-tag-group>
          </mm-text-block>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="elevation">
        <mm-content-section-list>
          <mm-content-section
            heading-level="3"
            heading="겹침 순서"
            description="앞에서 뒤로 층위를 나열합니다. 화면 위로 뜨는 요소는 역할에 맞는 층을 골라, 어느 표면에서 열려도 같은 순서로 겹치게 합니다."
          >
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
          </mm-content-section>

          <mm-content-section
            heading-level="3"
            heading="앱 셸"
            description="앱 셸 예제를 층별로 떼어 낸 그림입니다."
          >
            <mm-token-stage>${renderAppShellLayerDiagram()}</mm-token-stage>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-page-body>
  </mm-main>
`

/** 막대와 양옆 여백을 합친 실제 폭을 재어 위 라벨에 적고, 화면 크기가 바뀌면 다시 갱신한다. */
const showExtentWidths = () => {
  const observer = new ResizeObserver(entries => {
    entries.forEach(({ target }) => {
      const label = target.querySelector('[data-extent-label]')
      if (!label) return
      label.textContent = `${Math.round(target.getBoundingClientRect().width)}px`
    })
  })
  document.querySelectorAll('.width-extent').forEach(extent => observer.observe(extent))
}

renderPage(main, { initialize: showExtentWidths })
