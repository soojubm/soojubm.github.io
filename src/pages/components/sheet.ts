import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'

import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import { renderLayout } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'dialog.html', label: 'Dialog' },
  { href: 'popover.html', label: 'Popover' },
  { href: 'surface.html', label: 'Surface' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.mozilla.org/ko/docs/Web/API/Popover_API',
    label: 'Mozilla Popover API',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/presentation/action-sheets',
    label: 'HIG action-sheets',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/sheets',
    label: 'HIG sheets',
    external: true,
  },
  {
    href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alertdialog_role',
    label: 'alertdialog role',
    external: true,
  },
  {
    href: 'https://mobbin.com/glossary/bottom-sheet',
    label: 'moffin - Bottom Sheet',
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
  { name: 'primaryAction', type: 'ActionConfig', optional: true },
  { name: 'secondaryAction', type: 'ActionConfig', optional: true },
  { name: 'sheet-close', type: 'CustomEvent', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Modality',
    description:
      '배경 상호작용을 차단하며, backdrop·ESC·닫기 버튼으로 사용자가 흐름을 빠져나갈 수 있어야 합니다.',
  },
]

type SheetElement = HTMLElement & {
  show(): void
}

type ToastElement = HTMLElement & {
  show(): void
}

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(sheetPageTemplate())

  setupSheetTriggers()
  setupToastTrigger()
})

// 자동 닫힘·재시작 타이머는 mm-toast가 소유하므로 트리거는 show()만 호출한다.
function setupToastTrigger() {
  const trigger = document.querySelector<HTMLElement>('[data-open-toast]')
  const toast = document.querySelector<ToastElement>('.js-demo-toast')
  if (!trigger || !toast) return

  trigger.addEventListener('click', () => toast.show())
}

function setupSheetTriggers() {
  document.querySelectorAll<HTMLElement>('[data-open-sheet]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const value = trigger.dataset.openSheet ?? ''
      const selector = /^[#.]/.test(value) ? value : `mm-sheet[placement="${value}"]`
      const sheet = document.querySelector<SheetElement>(selector)
      if (!sheet) return

      sheet.show()
    })
  })
}

function openSheet(id: string) {
  const sheet = document.querySelector<SheetElement>(`#${id}`)
  sheet?.show()
}

function sheetPageTemplate() {
  return html`
    <main class="page">
      <mm-page-header
        heading="Sheet"
        description="viewport 기준 modal 시트로 화면 위에 표시합니다. center dialog만 써도 충분."
      ></mm-page-header>

      <mm-component-aka
        .items=${['Drawer', 'Panel', 'Bottom Sheet', 'Side Sheet', 'Modal']}
      ></mm-component-aka>

      <mm-component-example>
        ${sheetExampleTemplate()}
        <mm-toast class="js-demo-toast">저장되었습니다.</mm-toast>
      </mm-component-example>

      <mm-component-props .props=${componentProps}></mm-component-props>

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
    </main>
  `
}

function sheetExampleTemplate() {
  return html`
    <mm-button-group>
      <mm-button @click=${() => openSheet('center-sheet')}>Center</mm-button>
      <mm-button @click=${() => openSheet('bottom-sheet')}>Bottom</mm-button>
      <mm-button @click=${() => openSheet('left-sheet')}>Left</mm-button>
      <mm-button @click=${() => openSheet('right-sheet')}>Right</mm-button>
      <mm-button data-open-toast>토스트 띄우기</mm-button>
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
    <mm-icon-button icon=${ICON_NAMES.FILTER} data-open-sheet="#filter-sheet"></mm-icon-button>
    <mm-sheet placement="bottom" id="filter-sheet">
      <mm-sheet-header heading="필터"></mm-sheet-header>
      <mm-sheet-body>
        <form class="filter">
          <fieldset class="filter-fieldset" role="group">
            <mm-menu-item-switch
              icon=${ICON_NAMES.DATE}
              label="즉시 예약"
              value="instant"
              description="호스트 승인을 기다릴 필요 없이 예약할 수 있는 숙소"
            ></mm-menu-item-switch>
          </fieldset>
          <mm-separator></mm-separator>
          <fieldset class="filter-fieldset" role="group">
            <legend class="filter-fieldset-legend">예산</legend>
            <mm-menu-item-radio-group name="budget" aria-label="예산">
              <mm-menu-item-radio value="50000" label="50,000원 미만"></mm-menu-item-radio>
              <mm-menu-item-radio value="100000" label="100,000원 미만"></mm-menu-item-radio>
              <mm-menu-item-radio value="150000" label="150,000원 미만"></mm-menu-item-radio>
            </mm-menu-item-radio-group>
          </fieldset>
          <mm-separator></mm-separator>
          <fieldset class="filter-fieldset" role="group">
            <legend class="filter-fieldset-legend">평수</legend>
            <mm-filter-button-group
              mode="single"
              .options=${[
                { value: '10', label: '10평 미만' },
                { value: '20', label: '20평' },
                { value: '30', label: '30평' },
              ]}
            ></mm-filter-button-group>
          </fieldset>
          <mm-separator></mm-separator>
          <fieldset class="filter-fieldset" role="group">
            <legend class="filter-fieldset-legend">접근성 편의</legend>
            <mm-paragraph>호스트가 제공하고 에어비앤비에서 검토한 정보입니다.</mm-paragraph>
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
          </fieldset>
          <mm-separator></mm-separator>
          <fieldset class="filter-fieldset" role="group">
            <legend class="filter-fieldset-legend">릴리스 채널</legend>
            <mm-select>
              <option value="stable">Stable</option>
              <option value="beta">Beta</option>
              <option value="canary">Canary</option>
            </mm-select>
          </fieldset>
          <mm-separator></mm-separator>
          <fieldset class="filter-fieldset" role="group">
            <legend class="filter-fieldset-legend">데스크톱에서 활성 상태가 아닌 경우...</legend>
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
          </fieldset>
        </form>
      </mm-sheet-body>
      <mm-sheet-footer
        .primaryAction=${{ label: '숙소 25개 표시', onClick: () => {} }}
        .secondaryAction=${{ label: '전체 해제', onClick: () => {} }}
      ></mm-sheet-footer>
    </mm-sheet>
  `
}
