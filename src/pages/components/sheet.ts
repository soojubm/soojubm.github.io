import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'dialog.html', label: 'Dialog' },
  { href: 'popover.html', label: 'Popover' },
  { href: 'surface.html', label: 'Surface' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.mozilla.org/ko/docs/Web/API/Popover_API',
    label: 'MDN - Popover API',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/presentation/action-sheets',
    label: 'Apple HIG - Action Sheets',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/sheets',
    label: 'Apple HIG - Sheets',
    external: true,
  },
  {
    href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alertdialog_role',
    label: 'MDN - alertdialog Role',
    external: true,
  },
  {
    href: 'https://mobbin.com/glossary/bottom-sheet',
    label: 'Mobbin - Bottom Sheet',
    external: true,
  },
  {
    href: 'https://ogp.me/',
    label: 'Open Graph Protocol',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'open', type: 'boolean' },
  { name: 'placement', type: "'center' | 'bottom' | 'left' | 'right' = 'center'" },
  { name: 'width', type: "'small' | 'medium' | 'large' | 'full' = 'medium'", optional: true },
  { name: 'height', type: 'string', optional: true },
  { name: 'mm-sheet-header heading', type: 'string', optional: true },
  { name: 'mm-sheet-footer primaryAction', type: 'ActionConfig', optional: true },
  { name: 'mm-sheet-footer secondaryAction', type: 'ActionConfig', optional: true },
  { name: 'sheet-close', type: 'CustomEvent', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'overlay-panel-min-width' },
  { name: 'overlay-panel-max-width' },
  { name: 'overlay-panel-height' },
  { name: 'overlay-panel-max-height' },
  { name: 'overlay-panel-viewport-max-height' },
  { name: 'overlay-panel-padding-block' },
  { name: 'overlay-panel-padding-inline' },
  { name: 'overlay-panel-border-radius' },
  { name: 'overlay-panel-backdrop-background-color' },
  { name: 'overlay-panel-backdrop-blur' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Modality',
    description:
      '배경 상호작용을 차단하며, backdrop·ESC·닫기 버튼으로 사용자가 흐름을 빠져나갈 수 있어야 합니다.',
  },
]

renderPage(sheetPageTemplate())

function sheetPageTemplate() {
  return html`
    <mm-page>
      <mm-page-header
        heading="Sheet"
        description="viewport 기준 modal 시트로 화면 위에 표시합니다. center dialog만 써도 충분."
      ></mm-page-header>

      <mm-component-aka
        .items=${['Drawer', 'Panel', 'Bottom Sheet', 'Side Sheet', 'Modal']}
      ></mm-component-aka>

      <mm-component-example>${sheetExampleTemplate()}</mm-component-example>

      <mm-component-props .props=${componentProps}></mm-component-props>

      <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

      <mm-component-guide>
        <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
      </mm-component-guide>

      <mm-component-section
        heading="Sheet Header"
        description="타이틀과 선택적인 닫기 버튼을 제공합니다. 닫기 버튼은 sheet-close 이벤트를 버블링합니다."
      >
        <mm-sheet-header heading="Sheet Title"></mm-sheet-header>
      </mm-component-section>

      <mm-component-section
        heading="Sheet Body"
        description="스크롤 가능한 콘텐츠 영역. flex: 1 1 auto로 header·footer를 제외한 나머지를 채웁니다."
      >
        <mm-sheet-body>
          <mm-paragraph>sheet-body는 콘텐츠가 넘치면 내부에서 스크롤됩니다.</mm-paragraph>
          <mm-paragraph>
            mm-sheet에 height를 지정하면 고정 높이 내에서 body가 스크롤됩니다.
          </mm-paragraph>
        </mm-sheet-body>
      </mm-component-section>

      <mm-component-section heading="Filter" description="샘플">
        ${filterSheetTemplate()}
      </mm-component-section>

      <mm-component-related .items=${relatedComponents}></mm-component-related>

      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-page>
  `
}

function sheetExampleTemplate() {
  return html`
    <mm-button-group>
      <mm-button aria-controls="center-sheet">Center</mm-button>
      <mm-button aria-controls="bottom-sheet">Bottom</mm-button>
      <mm-button aria-controls="left-sheet">Left</mm-button>
      <mm-button aria-controls="right-sheet">Right</mm-button>
    </mm-button-group>

    <mm-sheet id="center-sheet" placement="center" width="medium">
      <mm-sheet-header heading="Center Sheet"></mm-sheet-header>
      <mm-sheet-body>
        <mm-paragraph>
          이것도 막무가내로 정의하지 말고 필요한 케이스를 정의. 대부분이 다이얼로그로 충분함.
          페이지에 가까운 레이어만 정의해도 됨.
        </mm-paragraph>
      </mm-sheet-body>
    </mm-sheet>
    <mm-sheet id="bottom-sheet" placement="bottom" height="360px">
      <mm-sheet-header heading="Bottom Sheet"></mm-sheet-header>
      <mm-sheet-body>
        <mm-menu-item-group size="large">
          <mm-menu-item-action size="48" label="검색"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="저장"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="공유"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="보관"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="숨기기"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="신고"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="삭제" tone="danger"></mm-menu-item-action>
        </mm-menu-item-group>
      </mm-sheet-body>
      <mm-sheet-footer
        .primaryAction=${{ label: '저장', onClick: () => {} }}
        .secondaryAction=${{ label: '취소', onClick: () => {} }}
      ></mm-sheet-footer>
    </mm-sheet>
    <mm-sheet id="left-sheet" placement="left">
      <mm-sheet-header heading="Left Sheet"></mm-sheet-header>
      <mm-sheet-body><mm-paragraph>왼쪽 패널 콘텐츠</mm-paragraph></mm-sheet-body>
    </mm-sheet>
    <mm-sheet id="right-sheet" placement="right">
      <mm-sheet-header heading="Right Sheet"></mm-sheet-header>
      <mm-sheet-body><mm-paragraph>오른쪽 패널 콘텐츠</mm-paragraph></mm-sheet-body>
    </mm-sheet>
  `
}

function filterSheetTemplate() {
  return html`
    <mm-icon-button icon=${ICON_NAMES.FILTER} aria-controls="filter-sheet"></mm-icon-button>
    <mm-sheet placement="bottom" id="filter-sheet">
      <mm-sheet-header heading="필터"></mm-sheet-header>
      <mm-sheet-body>
        <form>
          <mm-menu-item-switch
            icon=${ICON_NAMES.DATE}
            label="즉시 예약"
            value="instant"
            description="호스트 승인을 기다릴 필요 없이 예약할 수 있는 숙소"
          ></mm-menu-item-switch>
          <mm-separator></mm-separator>
          <mm-form-field label="예산">
            <mm-menu-item-radio-group name="budget" aria-label="예산">
              <mm-menu-item-radio value="50000" label="50,000원 미만"></mm-menu-item-radio>
              <mm-menu-item-radio value="100000" label="100,000원 미만"></mm-menu-item-radio>
              <mm-menu-item-radio value="150000" label="150,000원 미만"></mm-menu-item-radio>
            </mm-menu-item-radio-group>
          </mm-form-field>
          <mm-separator></mm-separator>
          <mm-form-field label="평수">
            <mm-filter-button-group
              mode="single"
              .options=${[
                { value: '10', label: '10평 미만' },
                { value: '20', label: '20평' },
                { value: '30', label: '30평' },
              ]}
            ></mm-filter-button-group>
          </mm-form-field>
          <mm-separator></mm-separator>
          <mm-form-field
            label="접근성 편의"
            helper="호스트가 제공하고 에어비앤비에서 검토한 정보입니다."
          >
            <mm-menu-item-checkbox-group aria-label="접근성 편의">
              <mm-menu-item-checkbox
                value="no-stairs"
                label="게스트 출입구에 계단이나 문턱 없음"
              ></mm-menu-item-checkbox>
              <mm-menu-item-checkbox
                value="entrance-width"
                label="너비 81cm 이상의 게스트 출입구"
              ></mm-menu-item-checkbox>
              <mm-menu-item-checkbox
                value="parking"
                label="휠체어 접근 가능 주차 공간"
              ></mm-menu-item-checkbox>
            </mm-menu-item-checkbox-group>
          </mm-form-field>
          <mm-separator></mm-separator>
          <mm-form-field label="릴리스 채널">
            <mm-select>
              <option value="stable">Stable</option>
              <option value="beta">Beta</option>
              <option value="canary">Canary</option>
            </mm-select>
          </mm-form-field>
          <mm-separator></mm-separator>
          <mm-form-field label="데스크톱에서 활성 상태가 아닌 경우...">
            <mm-menu-item-switch
              value="email-notify"
              label="멘션 및 다이렉트 메시지에 대한 이메일 알림 받기"
            ></mm-menu-item-switch>
            <mm-menu-item-radio-group
              name="email-interval"
              aria-label="이메일 알림 주기"
              value="15min"
            >
              <mm-menu-item-radio value="15min" label="15분 마다 한 번"></mm-menu-item-radio>
              <mm-menu-item-radio value="1hour" label="한 시간에 한 번"></mm-menu-item-radio>
            </mm-menu-item-radio-group>
          </mm-form-field>
        </form>
      </mm-sheet-body>
      <mm-sheet-footer
        .primaryAction=${{ label: '숙소 25개 표시', onClick: () => {} }}
        .secondaryAction=${{ label: '전체 해제', onClick: () => {} }}
      ></mm-sheet-footer>
    </mm-sheet>
  `
}
