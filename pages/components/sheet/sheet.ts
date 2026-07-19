import { html, render } from 'lit'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { renderLayout } from '../../../layouts/base-layouts'

type SheetElement = HTMLElement & {
  open(): void
}

type ToastElement = HTMLElement & {
  open(): void
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout('<div id="sheet-page-root"></div>')

  const root = document.querySelector<HTMLElement>('#sheet-page-root')
  if (root) render(sheetPageTemplate(), root)

  setupSheetTriggers()
  setupToastTrigger()
})

// 자동 닫힘·재시작 타이머는 mm-toast가 소유하므로 트리거는 open()만 호출한다.
function setupToastTrigger() {
  const trigger = document.querySelector<HTMLElement>('[data-open-toast]')
  const toast = document.querySelector<ToastElement>('.js-demo-toast')
  if (!trigger || !toast) return

  trigger.addEventListener('click', () => toast.open())
}

function setupSheetTriggers() {
  document.querySelectorAll<HTMLElement>('[data-open-sheet]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const value = trigger.dataset.openSheet ?? ''
      const selector = /^[#.]/.test(value) ? value : `mm-sheet[variant="${value}"]`
      const sheet = document.querySelector<SheetElement>(selector)
      if (!sheet) return

      sheet.open()
    })
  })
}

function openSheet(id: string) {
  const sheet = document.querySelector<SheetElement>(`#${id}`)
  sheet?.open()
}

function sheetPageTemplate() {
  return html`
    <main class="page">
      <mm-page-header
        heading="Sheet"
        description="viewport 기준 modal 레이어 위에 표시합니다."
      ></mm-page-header>

      <mm-component-aka
        .items=${['Drawer', 'Panel', 'Bottom Sheet', 'Side Sheet', 'Modal']}
      ></mm-component-aka>

      <mm-component-example>${sheetExampleTemplate()}</mm-component-example>

      <mm-component-props>
        <mm-prop name="open" type="boolean"></mm-prop>
        <mm-prop name="variant" type="'center' | 'bottom' | 'left' | 'right' = 'center'"></mm-prop>
        <mm-prop
          name="width"
          type="'small' | 'medium' | 'large' | 'full' = 'medium'"
          optional
        ></mm-prop>
        <mm-prop name="height" type="string" optional></mm-prop>
        <mm-prop name="primaryAction" type="ActionConfig" optional></mm-prop>
        <mm-prop name="secondaryAction" type="ActionConfig" optional></mm-prop>
        <mm-prop name="sheetclose" type="CustomEvent" kind="event"></mm-prop>
      </mm-component-props>

      <mm-component-anatomy
        .parts=${[
          'Backdrop — 시트 뒤 반투명 배경. 배경 클릭 시 sheetclose 이벤트를 발생시킵니다.',
          '시트 컨테이너 — flex column 박스. height prop으로 높이 고정, max-height: 90vh 기본값.',
          'mm-sheet-header — 타이틀과 닫기 버튼. sheetclose 이벤트를 발생시킵니다.',
          'mm-sheet-body — 스크롤 가능한 콘텐츠 영역. flex: 1 1 auto로 header·footer를 제외한 나머지를 채웁니다.',
          'mm-sheet-footer — 액션 버튼 영역. primaryAction / secondaryAction prop으로 구성합니다.',
        ]}
      ></mm-component-anatomy>

      <mm-component-guide>
        <mm-paragraph-group>
          <mm-paragraph>
            시각적 형태(Sheet, Dialog 등)가 아니라 배경과의 상호작용 허용 여부로 구분.
          </mm-paragraph>

          <mm-heading level="2">Modal</mm-heading>
          <mm-paragraph>
            배경과의 상호작용을 차단하고 사용자의 즉각적인 응답을 요구한다. Backdrop(dim)이 뒤를
            덮고, 포커스는 레이어 내부에 갇힌다(focus trap). 닫기는 명시적인 버튼 액션으로만
            허용하는 것이 원칙이며, 배경 클릭으로 닫는 기능은 중요도가 낮은 작업에서만 예외적으로
            허용한다.
          </mm-paragraph>
          <mm-text-list
            texts=${JSON.stringify([
              '배경 클릭 불가·스크롤 불가.',
              '포커스 트랩 — Tab 키가 레이어 내부를 순환한다.',
              'ESC 키 닫기는 데이터 손실 위험이 없는 경우에만 허용.',
              'aria-modal="true", role="dialog" 명시.',
              '용례: 삭제 확인, 중요 정보 입력, 오류 처리, 결제 흐름.',
            ])}
          ></mm-text-list>

          <mm-heading>Non-modal</mm-heading>
          <mm-paragraph>
            배경과의 상호작용을 허용한다. 현재 작업 맥락을 유지하면서 부가 정보나 서브태스크를
            제공할 때 사용한다. 포커스 트랩이 없고, 외부 클릭·ESC로 언제든 닫을 수 있다.
          </mm-paragraph>
          <mm-text-list
            texts=${JSON.stringify([
              '배경 클릭 불가·스크롤 가능.',
              '포커스 트랩 없음 — Tab 키가 페이지 전체를 순환한다.',
              '외부 클릭 또는 ESC로 닫힌다.',
              '용례: Dropdown, Tooltip, Toast, 사이드 패널, Popover.',
            ])}
          ></mm-text-list>

          <mm-heading>레이어 프리미티브 분리</mm-heading>
          <mm-text-list
            texts=${JSON.stringify([
              'mm-sheet — viewport 기준 modal 레이어. backdrop·portal·스크롤 잠금을 소유하며 variant로 형태를 지정한다. dialog(center), bottom sheet(bottom), drawer(left/right)를 커버한다.',
              'mm-popover — anchor 기준 non-modal 레이어. 트리거는 aria-controls로 연결하고, popover가 열림 상태·외부 클릭·ESC 닫기와 좌표를 소유한다. dropdown·메뉴를 커버한다.',
            ])}
          ></mm-text-list>
        </mm-paragraph-group>
      </mm-component-guide>

      <mm-component-section
        heading="Sheet Header"
        description="타이틀과 선택적인 닫기 버튼을 제공합니다. 닫기 버튼은 sheetclose 이벤트를 버블링합니다."
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

      <mm-component-section
        heading="Backdrop"
        description="레이어 뒤에 표시되는 반투명 Backdrop. onClose prop으로 배경 클릭 시."
      >
        <!-- <mm-backdrop open></mm-backdrop> -->
      </mm-component-section>

      <mm-component-section
        heading="Toast"
        description="화면 하단 중앙에 잠깐 떠올랐다 약 3초 후 스스로 사라지는 transient non-modal 레이어입니다. open()으로 띄우며, 열려 있을 때 다시 호출하면 남은 시간이 초기화됩니다."
      >
        <mm-button data-open-toast>토스트 띄우기</mm-button>
        <mm-toast class="js-demo-toast">저장되었습니다.</mm-toast>
      </mm-component-section>

      <mm-component-section heading="Filter" description="TEST">
        ${filterSheetTemplate()}
      </mm-component-section>

      <mm-component-related>
        <mm-button-group>
          <mm-hashtag-link href="dialog.html">Dialog</mm-hashtag-link>
          <mm-hashtag-link href="popover.html">Popover</mm-hashtag-link>
          <mm-hashtag-link href="surface.html">Surface</mm-hashtag-link>
        </mm-button-group>
      </mm-component-related>

      <mm-component-references>
        <mm-link external href="https://developer.mozilla.org/ko/docs/Web/API/Popover_API">
          Mozilla Popover API
        </mm-link>
        <mm-link
          external
          href="https://developer.apple.com/design/human-interface-guidelines/components/presentation/action-sheets"
        >
          HIG action-sheets
        </mm-link>
        <mm-link
          external
          href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alertdialog_role"
        >
          alertdialog role
        </mm-link>
      </mm-component-references>
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
    </mm-button-group>

    <mm-sheet id="center-sheet" variant="center" width="medium">
      <mm-sheet-header heading="Center Sheet"></mm-sheet-header>
      <mm-sheet-body><mm-paragraph>중앙 모달 콘텐츠</mm-paragraph></mm-sheet-body>
      <mm-sheet-footer
        .primaryAction=${{ label: '확인', onClick: () => {} }}
        .secondaryAction=${{ label: '닫기', onClick: () => {} }}
      ></mm-sheet-footer>
    </mm-sheet>
    <mm-sheet id="bottom-sheet" variant="bottom" height="360px">
      <mm-sheet-header heading="Bottom Sheet"></mm-sheet-header>
      <mm-sheet-body>
        <mm-menu-item-group>
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
    <mm-sheet id="left-sheet" variant="left">
      <mm-sheet-header heading="Left Sheet"></mm-sheet-header>
      <mm-sheet-body><mm-paragraph>왼쪽 패널 콘텐츠</mm-paragraph></mm-sheet-body>
      <mm-sheet-footer
        .primaryAction=${{ label: '완료', onClick: () => {} }}
        .secondaryAction=${{ label: '닫기', onClick: () => {} }}
      ></mm-sheet-footer>
    </mm-sheet>
    <mm-sheet id="right-sheet" variant="right">
      <mm-sheet-header heading="Right Sheet"></mm-sheet-header>
      <mm-sheet-body><mm-paragraph>오른쪽 패널 콘텐츠</mm-paragraph></mm-sheet-body>
      <mm-sheet-footer
        .primaryAction=${{ label: '완료', onClick: () => {} }}
        .secondaryAction=${{ label: '닫기', onClick: () => {} }}
      ></mm-sheet-footer>
    </mm-sheet>
  `
}

function filterSheetTemplate() {
  return html`
    <mm-icon-button icon=${ICON_NAMES.FILTER} data-open-sheet="#filter-sheet"></mm-icon-button>
    <mm-sheet variant="bottom" id="filter-sheet">
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
            <legend class="filter-fieldset-legend">빠른 작업</legend>
            <mm-menu-item-group aria-label="빠른 작업">
              <mm-menu-item-action
                icon=${ICON_NAMES.SEARCH}
                label="저장된 검색 불러오기"
              ></mm-menu-item-action>
              <mm-menu-item-action
                icon=${ICON_NAMES.DELETE}
                label="필터 초기화"
                tone="danger"
              ></mm-menu-item-action>
            </mm-menu-item-group>
          </fieldset>
          <mm-separator></mm-separator>
          <fieldset class="filter-fieldset" role="group">
            <legend class="filter-fieldset-legend">릴리스 채널</legend>
            <mm-select>
              <mm-button slot="trigger" size="small">Stable</mm-button>
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
