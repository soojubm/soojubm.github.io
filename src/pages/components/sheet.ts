import { html } from 'lit'

import type {
  ComponentChangelogItemData,
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import {
  componentPropsOf,
  openStateMethods,
  subComponentPropsOf,
} from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'dialog.html', label: 'Dialog' },
  { href: 'popover.html', label: 'Popover' },
  { href: 'surface.html', label: 'Surface' },
]

const componentChangelog: ComponentChangelogItemData[] = [
  {
    date: '2026-09-20',
    description:
      'placement에서 center를 빼고 top을 더했습니다. 기본값은 bottom이며, 화면 가운데에 뜨는 표면은 fff-dialog가 맡습니다. navbar 검색 패널은 top sheet로 바꿨습니다.',
  },
  {
    date: '2026-09-20',
    description: 'full을 다른 컴포넌트와 같은 이름인 full-width로 바꿨습니다.',
  },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.mozilla.org/ko/docs/Web/API/Popover_API',
    label: 'MDN - Popover API',
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/presentation/action-sheets',
    label: 'Apple HIG - Action Sheets',
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/sheets',
    label: 'Apple HIG - Sheets',
  },
  {
    href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alertdialog_role',
    label: 'MDN - alertdialog Role',
  },
  {
    href: 'https://mobbin.com/glossary/bottom-sheet',
    label: 'Mobbin - Bottom Sheet',
  },
  {
    href: 'https://ogp.me/',
    label: 'Open Graph Protocol',
  },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-sheet'),
  ...subComponentPropsOf('fff-sheet-header'),
  ...subComponentPropsOf('fff-sheet-footer'),
  ...openStateMethods,
  { name: 'toggle', type: 'CustomEvent<{ open: boolean }>', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Modality',
    description:
      '배경 상호작용을 차단하며, backdrop·ESC·닫기 버튼으로 사용자가 흐름을 빠져나갈 수 있어야 합니다.',
  },
  {
    heading: 'Contextual',
    description:
      '현재 페이지 위에 열려 backdrop 너머로 보던 화면이 그대로 남습니다. 사용자는 페이지를 옮기지 않고 하위 작업을 마친 뒤, 방금 있던 자리로 돌아옵니다.',
  },
]

const exampleCode = `<fff-button aria-controls="bottom-sheet" aria-haspopup="dialog">Bottom</fff-button>
<fff-sheet id="bottom-sheet" placement="bottom" height="360px">
  <fff-sheet-header heading="Bottom Sheet"></fff-sheet-header>
  <fff-sheet-body>
    <fff-paragraph>콘텐츠</fff-paragraph>
  </fff-sheet-body>
  <fff-sheet-footer></fff-sheet-footer>
</fff-sheet>`

renderPage(sheetPageTemplate())

function sheetPageTemplate() {
  return html`
    <fff-main>
      <fff-page-header
        heading="Sheet"
        description="화면 위를 덮어 독립된 작업 공간을 여는 modal 표면입니다. 화면 가장자리에서 밀려 들어와 배경 상호작용을 막고 backdrop·ESC·닫기 버튼으로 닫히므로, 사용자는 현재 페이지를 벗어나지 않고 하위 작업에 집중한 뒤 원래 흐름으로 돌아갈 수 있습니다."
      ></fff-page-header>

      <fff-component-aka
        .items=${['Drawer', 'Panel', 'Bottom Sheet', 'Side Sheet', 'Modal']}
      ></fff-component-aka>

      <fff-component-example>${sheetExampleTemplate()}</fff-component-example>
      <fff-component-code .code=${exampleCode}></fff-component-code>

      <fff-component-props .props=${componentProps}></fff-component-props>

      <fff-component-tokens .elements=${['fff-sheet']}></fff-component-tokens>

      <fff-component-guide .features=${componentFeatures}>
        <fff-content-section
          heading-level="3"
          heading="안전마진도 고려해야 하나요?"
          description="패널이 닿은 화면 변에는 노치·홈 인디케이터 영역만큼 여백이 더해집니다. footer 유무와 상관없이 같은 여백이 유지되므로, footer나 사용하는 쪽에서 따로 두지 않습니다."
        ></fff-content-section>

        <fff-text-list
          .texts=${['사용자의 확인이 필요하거나 꼭 알려야 하는 내용은 fff-dialog를 사용합니다.']}
        ></fff-text-list>
      </fff-component-guide>

      <fff-component-anatomy
        .parts=${[
          '헤더 — 타이틀과 닫기 버튼.',
          '바디 — header·footer를 제외한 나머지를 채우고, 콘텐츠가 넘치면 내부에서 스크롤됩니다.',
          '푸터 — 주요·보조 액션 버튼을 배치합니다.',
        ]}
        .markers=${[
          { placement: 'inline-start', offset: '1rem' },
          { placement: 'inline-start', offset: '3.75rem' },
          { placement: 'inline-start', offset: 'calc(100% - 1.5rem)' },
        ]}
      >
        ${sheetAnatomyTemplate()}
      </fff-component-anatomy>

      <fff-component-section heading="Filter" description="샘플">
        ${filterSheetTemplate()}
      </fff-component-section>

      <fff-component-related .items=${relatedComponents}></fff-component-related>

      <fff-component-references .items=${componentReferences}></fff-component-references>

      <fff-component-changelog .items=${componentChangelog}></fff-component-changelog>

      <fff-component-pager></fff-component-pager>
    </fff-main>
  `
}

// 패널 gap(--overlay-panel-gap)이 벌리는 간격을 placeholder의 space로 드러낸다.
function sheetAnatomyTemplate() {
  const gapPlaceholder = html`
    <fff-ui-placeholder space="4">
      <fff-text size="12" weight="bold">space-4</fff-text>
    </fff-ui-placeholder>
  `

  return html`
    <fff-flex direction="column">
      <fff-sheet-header heading="필터"></fff-sheet-header>
      ${gapPlaceholder}
      <fff-sheet-body>
        <fff-paragraph>넘치는 콘텐츠는 body 안에서 스크롤됩니다.</fff-paragraph>
      </fff-sheet-body>
      ${gapPlaceholder}
      <fff-sheet-footer .primaryAction=${{ label: '적용' }}></fff-sheet-footer>
    </fff-flex>
  `
}

function sheetExampleTemplate() {
  return html`
    <fff-button-group>
      <fff-button aria-controls="top-sheet" aria-haspopup="dialog">Top</fff-button>
      <fff-button aria-controls="bottom-sheet" aria-haspopup="dialog">Bottom</fff-button>
      <fff-button aria-controls="left-sheet" aria-haspopup="dialog">Left</fff-button>
      <fff-button aria-controls="right-sheet" aria-haspopup="dialog">Right</fff-button>
    </fff-button-group>

    <fff-sheet id="top-sheet" placement="top">
      <fff-sheet-header heading="Top Sheet"></fff-sheet-header>
      <fff-sheet-body>
        <fff-paragraph>
          상단 트리거에서 여는 검색·알림처럼 시작점이 위쪽인 흐름에 씁니다.
        </fff-paragraph>
      </fff-sheet-body>
    </fff-sheet>
    <fff-sheet id="bottom-sheet" placement="bottom" height="360px">
      <fff-sheet-header heading="Bottom Sheet"></fff-sheet-header>
      <fff-sheet-body>
        <fff-menu-item-group size="large">
          <fff-menu-item-action size="medium" label="검색"></fff-menu-item-action>
          <fff-menu-item-action size="medium" label="저장"></fff-menu-item-action>
          <fff-menu-item-action size="medium" label="공유"></fff-menu-item-action>
          <fff-menu-item-action size="medium" label="보관"></fff-menu-item-action>
          <fff-menu-item-action size="medium" label="숨기기"></fff-menu-item-action>
          <fff-menu-item-action size="medium" label="신고"></fff-menu-item-action>
          <fff-menu-item-action size="medium" label="삭제" destructive></fff-menu-item-action>
        </fff-menu-item-group>
      </fff-sheet-body>
      <fff-sheet-footer
        .primaryAction=${{ label: '저장', onClick: () => {} }}
        .secondaryAction=${{ label: '취소', onClick: () => {} }}
      ></fff-sheet-footer>
    </fff-sheet>
    <fff-sheet id="left-sheet" placement="left">
      <fff-sheet-header heading="Left Sheet"></fff-sheet-header>
      <fff-sheet-body><fff-paragraph>왼쪽 패널 콘텐츠</fff-paragraph></fff-sheet-body>
    </fff-sheet>
    <fff-sheet id="right-sheet" placement="right">
      <fff-sheet-header heading="Right Sheet"></fff-sheet-header>
      <fff-sheet-body><fff-paragraph>오른쪽 패널 콘텐츠</fff-paragraph></fff-sheet-body>
    </fff-sheet>
  `
}

function filterSheetTemplate() {
  return html`
    <fff-icon-button
      icon=${ICON_NAMES.FILTER}
      aria-label="필터"
      aria-controls="filter-sheet"
      aria-haspopup="dialog"
    ></fff-icon-button>
    <fff-sheet placement="bottom" id="filter-sheet">
      <fff-sheet-header heading="필터"></fff-sheet-header>
      <fff-sheet-body>
        <form>
          <fff-menu-item-switch
            size="medium"
            icon=${ICON_NAMES.DATE}
            label="즉시 예약"
            value="instant"
            description="호스트 승인을 기다릴 필요 없이 예약할 수 있는 숙소"
          ></fff-menu-item-switch>
          <fff-separator></fff-separator>
          <fff-form-field label="예산">
            <fff-menu-item-radio-group
              name="budget"
              .options=${[
                { value: '50000', label: '50,000원 미만' },
                { value: '100000', label: '100,000원 미만' },
                { value: '150000', label: '150,000원 미만' },
              ]}
            ></fff-menu-item-radio-group>
          </fff-form-field>
          <fff-separator></fff-separator>
          <fff-form-field label="평수">
            <fff-filter-button-group
              mode="single"
              .options=${[
                { value: '10', label: '10평 미만' },
                { value: '20', label: '20평' },
                { value: '30', label: '30평' },
              ]}
            ></fff-filter-button-group>
          </fff-form-field>
          <fff-separator></fff-separator>
          <fff-form-field
            label="접근성 편의"
            description="호스트가 제공하고 에어비앤비에서 검토한 정보입니다."
          >
            <fff-menu-item-checkbox-group
              .options=${[
                { value: 'no-stairs', label: '게스트 출입구에 계단이나 문턱 없음' },
                { value: 'entrance-width', label: '너비 81cm 이상의 게스트 출입구' },
                { value: 'parking', label: '휠체어 접근 가능 주차 공간' },
              ]}
            ></fff-menu-item-checkbox-group>
          </fff-form-field>
        </form>
      </fff-sheet-body>
      <fff-sheet-footer
        .primaryAction=${{ label: '숙소 25개 표시', onClick: () => {} }}
        .secondaryAction=${{ label: '초기화', onClick: () => {} }}
      ></fff-sheet-footer>
    </fff-sheet>
  `
}
