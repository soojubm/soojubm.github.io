import { html, type TemplateResult } from 'lit'

import type { TagTone } from '@/components/common/tag/tag.styles'

import './layout.css'

import '@/components/common/separator/separator'
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

type ControllerMember = { name: string; description: TemplateResult }

type ControllerInfo = {
  name: string
  description: string
  members?: ControllerMember[]
  notice?: { heading: string; description: string }
}

const controllers: ControllerInfo[] = [
  {
    name: 'DisclosureController',
    description:
      '트리거를 누르면 컴포넌트를 열고 닫는 컨트롤러입니다. overlay뿐 아니라 FAQ·사이드바 섹션처럼 제자리에서 펼치는 컴포넌트에도 씁니다.',
    members: [
      {
        name: 'toggle()',
        description: html`
          열림 상태 ${code('open')}을 토글합니다. 컨트롤러는 따로 저장하지 않고
          ${code('show()')}·${code('close()')}로 바꿉니다. 열림 상태가 바뀔 때마다 ${code('toggle')}
          이벤트를 발행하며, ESC나 바깥 클릭으로 컴포넌트가 스스로 닫혀도 발행하므로 사용하는 쪽이
          자기 상태를 맞출 수 있습니다.
        `,
      },
      {
        name: 'trigger',
        description: html`
          이 컴포넌트를 열고 닫는 버튼 요소를 리턴합니다. 트리거의 ${code('aria-controls')}가
          컴포넌트 ${code('id')}를 가리키면 클릭 시 ${code('toggle()')}이 불립니다.
          ${code('aria-haspopup')}이 여는 종류를 선언하고, ${code('aria-expanded')}로 열린 상태를
          스크린리더에 알립니다.
        `,
      },
    ],
  },
  {
    name: 'SheetController',
    description:
      'viewport 기준 modal overlay가 열린 동안 뒤 화면을 막고, 닫는 방법을 처리하는 컨트롤러입니다.',
    members: [
      {
        name: '닫기',
        description: html`
          ESC로 항상 닫고, ${code('closeOnBackdrop')}을 켜면 배경 클릭으로도 닫습니다.
        `,
      },
      {
        name: '뒤 화면 잠금',
        description: html`
          열릴 때 뒤 화면과 아래쪽 모달을 ${code('inert')}로 만들어 포커스를 ${code('autofocus')}
          요소나 컴포넌트 안으로 옮기고, 닫힐 때 풀어 포커스를 연 요소로 돌립니다. 배경(backdrop)은
          마우스 클릭만 막으므로, 막지 않으면 키보드 Tab이나 스크린리더가 뒤 화면으로 빠져나갑니다.
          모달이 겹쳤을 때는 막은 횟수를 세어, 위 모달이 닫혀도 아래 모달이 열려 있는 동안은 뒤
          화면을 풀지 않습니다. 닫히는 순서가 달라도 마지막 모달이 닫힐 때만 풀립니다.
        `,
      },
      {
        name: '함께 쓰는 컨트롤러',
        description: html`
          ${code('PortalController')}(이동), ${code('DisclosureController')}(트리거),
          ${code('EscapeKeyController')}(ESC), ${code('ScrollLockController')}(스크롤 잠금)가 함께
          연결됩니다.
        `,
      },
    ],
  },
  {
    name: 'AdaptiveOverlay',
    description:
      '넓은 화면에서 popover로 열리는 overlay를 좁은 화면에서 bottom sheet로 전환하는 클래스입니다.',
    members: [
      {
        name: 'isViewportCompact',
        description: html`
          좁은 화면인지 알려 줍니다. true이면 sheet가, false이면 popover가 맡습니다.
        `,
      },
      {
        name: 'popoverOpen · sheetOpen',
        description: html`
          컴포넌트의 ${code('open')}과 화면 폭을 합쳐, 화면 폭에 맞는 표면에만 열림을 내려 줍니다.
          열림 상태는 컴포넌트가 ${code('open')}으로 소유하고, 이 클래스는 읽기만 합니다.
        `,
      },
      {
        name: 'handlePopoverToggle · handleSheetToggle',
        description: html`
          ESC 등으로 popover·sheet가 스스로 닫혀도 열림 상태를 맞춥니다. 각 표면의 ${code('toggle')}
          이벤트에 연결하면, 이벤트가 알리는 ${code('open')} 값으로 컴포넌트를 열거나 닫습니다. 화면
          폭이 바뀌어 표면이 갈릴 때 물러나는 표면이 닫히며 보내는 이벤트는 무시해, 열림이
          유지됩니다.
        `,
      },
    ],
  },
  {
    name: 'EscapeKeyController',
    description: 'ESC를 누르면 열려 있는 overlay를 닫는 컨트롤러입니다.',
  },
  {
    name: 'OutsideClickController',
    description: 'overlay 바깥을 누르면 콜백을 호출해 닫게 하는 컨트롤러입니다.',
    members: [
      {
        name: 'onOutsideClick',
        description: html`
          컴포넌트 바깥을 누르면 부르는 콜백입니다. 누른 곳이 안인지는 ${code('composedPath()')}로
          판단합니다.
        `,
      },
      {
        name: 'open',
        description: html`
          열려 있는 동안에만 화면 전체에서 누르는 동작(${code('pointerdown')})을 감지하고, 닫히면
          멈춥니다.
        `,
      },
      {
        name: 'getTrigger',
        description: html`
          넘긴 트리거(열림을 토글하는 요소)를 누르면 바깥을 누른 것으로 보지 않습니다.
        `,
      },
      {
        name: '배경 클릭',
        description: html`
          sheet처럼 ${code('closeOnBackdrop')}을 켠 표면의 배경 클릭은 ${code('SheetController')}가
          처리합니다. 이 컨트롤러는 ${code('document')}에서 누름을 받아, 모달이 겹쳐 있으면 위 모달
          패널을 눌러도 아래 모달이 함께 닫히기 때문입니다.
        `,
      },
    ],
  },
  {
    name: 'PortalController',
    description: 'overlay를 쓰는 자리에서 꺼내 페이지 맨 끝으로 옮겨 띄우는 컨트롤러입니다.',
    members: [
      {
        name: 'hostConnected()',
        description: html`
          컴포넌트가 연결되면 ${code('index.html')} 끝의 ${code('#portal-root')}로 옮기고 원래
          자리에 주석 자리표를 남깁니다. 이 컨테이너는 ${code('body')}의 마지막 자식이라 앱 셸의
          어떤 요소 안에도 속하지 않습니다.
        `,
      },
      {
        name: 'originRoot',
        description: html`
          옮기기 전 자리의 root를 리턴합니다. 트리거가 다른 컴포넌트의 shadow DOM 안에 있으면 옮겨진
          뒤의 document에서는 찾을 수 없어, ${code('DisclosureController')}가 트리거를 찾을 때
          씁니다.
        `,
      },
      {
        name: 'removeIfOrphaned()',
        description: html`
          원래 자리의 컴포넌트가 DOM에서 빠져 자리표가 문서에서 떨어졌으면, 옮겨 둔 컴포넌트도
          걷어냅니다.
        `,
      },
    ],
    notice: {
      heading: 'tooltip은 한 번 만든 말풍선을 다시 그리지 않는다',
      description:
        '표처럼 트리거가 수백 개인 페이지에서 말풍선을 미리 다 만들어 두면, 화면에 보이지도 않는 요소가 그만큼 늘어 페이지가 느려집니다. 그래서 사용자가 처음 hover하거나 포커스할 때 그 트리거의 말풍선만 한 번 만들고, 이후에는 다시 그리지 않고 열림 상태만 바꿔 같은 말풍선을 씁니다. 처음 열 때도 두 번째부터와 같은 나타나는 애니메이션이 재생됩니다.',
    },
  },
]

/** 컨트롤러 하나를 이름·설명·제공하는 멤버 순으로 세로로 그린다. */
const renderController = (controller: ControllerInfo) => html`
  <mm-flex direction="column" gap="4">
    <mm-flex direction="column" gap="2">
      <mm-heading level="4">
        <mm-code-tag size="large" tone="orange">${controller.name}</mm-code-tag>
      </mm-heading>
      <mm-text size="14">${controller.description}</mm-text>
    </mm-flex>
    ${controller.members?.map(
      member => html`
        <mm-flex direction="column" gap="1">
          <mm-tag-group>
            <mm-code-tag>${member.name}</mm-code-tag>
          </mm-tag-group>
          <mm-text size="14">${member.description}</mm-text>
        </mm-flex>
      `,
    )}
    ${controller.notice
      ? html`
          <mm-component-notice heading=${controller.notice.heading}>
            ${controller.notice.description}
          </mm-component-notice>
        `
      : ''}
  </mm-flex>
`

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

const placementTypeCode = `type Side = 'top' | 'right' | 'bottom' | 'left'
type Alignment = 'start' | 'end'

// anchored overlay (popover · select · tooltip): \`\${Side}\` | \`\${Side}-\${Alignment}\`
type PlacementType =
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'

// viewport overlay (sheet · dialog)
type ViewportPlacementType = 'center' | Side`

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
  <mm-token-stage>
    <mm-flex class="stage-width" direction="column">
      ${renderSpacingSection(true)}${renderSpacingGap(
        'section',
        '--space-section',
      )}${renderSpacingSection()}
      <mm-separator variant="section"></mm-separator>
      ${renderSpacingOtherContext()}
    </mm-flex>
  </mm-token-stage>
`

/** 화면 폭을 나타내는 트랙 위에, 본문이 차지하는 너비만큼의 막대를 가운데에 놓는다. */
const widthExample = (options: {
  caption: string
  token: string
  /** 이 너비를 정하는 레이아웃 토큰 이름. */
  widthToken?: string
  category: number
  tone: TagTone
  maxWidth?: string
  description?: string
  links: [href: string, label: string][]
}) => html`
  <mm-flex direction="column" gap="2">
    <div class="width-track">
      <div
        class="width-bar"
        style=${`--width-bar-background-color: var(--category-${
          options.category
        }-background-color);${options.maxWidth ? ` max-width: ${options.maxWidth}` : ''}`}
      >
        <mm-code-tag tone=${options.tone}>${options.token}</mm-code-tag>
      </div>
    </div>
    ${options.widthToken
      ? html`
          <mm-tag-group>
            <mm-code-tag>${options.widthToken}</mm-code-tag>
          </mm-tag-group>
        `
      : ''}
    <mm-caption>${options.caption}</mm-caption>
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
  value: string
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
      <mm-code-tag>${options.value}</mm-code-tag>
    </mm-tag-group>
    <mm-caption>${options.caption}</mm-caption>
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
      <div class="contrast-page stage-width">
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
      </mm-tab-list>

      <mm-tab-panel value="page">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="페이지 너비">
            <mm-paragraph>
              너비로 읽기 밀도를 정합니다. 본문 골격은 ${code('mm-main')}의 width로, 떠오르는
              overlay는 각 컴포넌트의 width로 지정합니다.
            </mm-paragraph>
            <mm-token-stage>
              <mm-flex class="stage-width" direction="column" gap="6">
                ${widthExample({
                  caption: '집중형 · 폼, 인증',
                  description: '좁은 폭은 폼·인증처럼 한 가지 작업에 집중시킨다',
                  token: '400px',
                  widthToken: '--layout-width-narrow',
                  category: 2,
                  tone: 'green',
                  maxWidth: 'var(--layout-width-narrow)',
                  links: [['./auth.html', 'Auth']],
                })}
                ${widthExample({
                  caption: '일반 문서 · 에디토리얼, 설정, 대화',
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
                  caption: '확장형 · 목록, 대시보드, 상품, 프로필',
                  description: '넓은 폭은 목록·대시보드처럼 훑어보는 화면에 쓴다',
                  token: '콘텐츠 영역 전체',
                  category: 8,
                  tone: 'purple',
                  links: [
                    ['./dashboard.html', 'Dashboard'],
                    ['./product.html', 'Product'],
                    ['./profile.html', 'Profile'],
                  ],
                })}
              </mm-flex>
            </mm-token-stage>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="배경 대비">
            <mm-paragraph>
              글쓰기·설정·소개처럼 이전 화면과 다른 정보 구조로 들어갈 때 페이지 배경을 한 단계 낮춰
              다른 맥락으로 넘어왔다는 감각을 줍니다.
            </mm-paragraph>
            <mm-token-stage>
              <mm-flex class="stage-width" direction="column" gap="6">
                ${renderBackgroundExample({ caption: '이전 화면', value: 'background 기본' })}
                ${renderBackgroundExample({
                  caption: '다른 정보 구조 · 글쓰기, 설정, 소개',
                  value: 'background="subtle"',
                  subtle: true,
                })}
              </mm-flex>
            </mm-token-stage>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="콘텐츠 모듈의 대비">
            <mm-paragraph>
              상태 변화·결과·맥락 전환을 전달하는 콘텐츠 모듈은 주변 콘텐츠와 대비를 만들어 사용자의
              주의를 끌어옵니다.
            </mm-paragraph>
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
                <mm-paragraph>
                  트리거를 기준으로 엽니다. 트리거 옆에 붙어 떠서, 어느 요소에서 열린 overlay인지
                  위치만으로 이어집니다.
                </mm-paragraph>
                ${anchoredOverlays.map(renderOverlay)}
              </mm-content-section>
              <mm-content-section heading-level="3" heading="Viewport overlay">
                <mm-paragraph>
                  viewport를 기준으로 화면 중앙이나 가장자리에 띄웁니다. 트리거 위치와 상관없이 같은
                  자리에 열려, 어디서 열었든 같은 overlay라는 인상을 줍니다.
                </mm-paragraph>
                ${viewportOverlays.map(renderOverlay)}
              </mm-content-section>
            </mm-grid>
            <mm-caption>
              <mm-code-tag tone="blue">blue</mm-code-tag>
              modal,
              <mm-code-tag tone="green">green</mm-code-tag>
              non-modal,
              <mm-code-tag tone="purple">purple</mm-code-tag>
              role,
              <mm-code-tag tone="orange">orange</mm-code-tag>
              layer,
              <mm-code-tag tone="cyan">cyan</mm-code-tag>
              focus move on open, 무색은 닫는 방법
            </mm-caption>
          </mm-flex>

          <mm-content-section heading-level="3" heading="Modal × Non-Modal">
            <mm-paragraph>
              모달은 열린 동안 뒤의 화면을 막는 overlay입니다. 작업을 마치거나 취소해야 다음으로
              넘어가는 흐름에 쓰며, 삭제 확인·중요 정보 입력·결제가 여기에 해당합니다.
            </mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '모달이 열려 있는 동안 뒤 화면은 조작할 수 없게 한다',
                  html`
                    뒤 화면에서 포커스가 움직이거나 스크롤되면 사용자가 모달을 벗어났다고 착각하거나
                    하던 작업의 위치를 잃는다. 뒤 화면은 backdrop으로 흐려 보이게 하고,
                    ${code('inert')}로 포커스를 받지 못하게 하며, 스크롤을 멈춘다. 스크롤 위치는
                    기억했다가 닫을 때 그 자리로 되돌린다
                  `,
                ),
                rule(
                  '비모달 overlay에서 Tab으로 나가면 닫고, 포커스를 트리거로 되돌린다',
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
            <mm-flex class="stage-width" direction="column" gap="4">
              ${controllers.map(renderController)}
            </mm-flex>
          </mm-text-block>
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
