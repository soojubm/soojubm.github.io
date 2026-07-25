import '@/components/table'
import { html } from 'lit'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { renderLayout } from '../../../layouts/base-layouts'

type LayerElement = HTMLElement & {
  open(): void
}

type ToastElement = HTMLElement & {
  open(): void
}

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(layerPageTemplate())

  setupLayerTriggers()
  setupToastTrigger()
  setupComparisonTable()
})

function setupComparisonTable() {
  const table = document.querySelector<HTMLElementTagNameMap['mm-table']>(
    'mm-table#layer-comparison-table',
  )
  if (!table) return

  const yes = html`
    <span role="img" aria-label="예">✅</span>
  `
  const no = html`
    <span role="img" aria-label="아니오">❌</span>
  `

  table.rows = html`
    <tr>
      <th scope="row">Dialog</th>
      <td>${yes}</td>
      <td>Viewport</td>
    </tr>
    <tr>
      <th scope="row">Bottom Sheet</th>
      <td>${yes}</td>
      <td>Viewport</td>
    </tr>
    <tr>
      <th scope="row">Popover</th>
      <td>${no}</td>
      <td>Trigger</td>
    </tr>
    <tr>
      <th scope="row">Select</th>
      <td>${no}</td>
      <td>Trigger</td>
    </tr>
    <tr>
      <th scope="row">Tooltip</th>
      <td>${no}</td>
      <td>Trigger</td>
    </tr>
  `
}

// 자동 닫힘·재시작 타이머는 mm-toast가 소유하므로 트리거는 open()만 호출한다.
function setupToastTrigger() {
  const trigger = document.querySelector<HTMLElement>('[data-open-toast]')
  const toast = document.querySelector<ToastElement>('.js-demo-toast')
  if (!trigger || !toast) return

  trigger.addEventListener('click', () => toast.open())
}

function setupLayerTriggers() {
  document.querySelectorAll<HTMLElement>('[data-open-layer]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const value = trigger.dataset.openLayer ?? ''
      const selector = /^[#.]/.test(value) ? value : `mm-layer[placement="${value}"]`
      const layer = document.querySelector<LayerElement>(selector)
      if (!layer) return

      layer.open()
    })
  })
}

function openLayer(id: string) {
  const layer = document.querySelector<LayerElement>(`#${id}`)
  layer?.open()
}

function layerPageTemplate() {
  return html`
    <main class="page">
      <mm-page-header
        heading="Layer"
        description="viewport 기준 modal 레이어 위에 표시합니다."
      ></mm-page-header>

      <mm-component-aka
        .items=${['Drawer', 'Panel', 'Bottom Sheet', 'Side Sheet', 'Modal']}
      ></mm-component-aka>

      <mm-component-example>${layerExampleTemplate()}</mm-component-example>

      <mm-component-props>
        <mm-prop name="open" type="boolean"></mm-prop>
        <mm-prop
          name="placement"
          type="'center' | 'bottom' | 'left' | 'right' = 'center'"
        ></mm-prop>
        <mm-prop
          name="width"
          type="'small' | 'medium' | 'large' | 'full' = 'medium'"
          optional
        ></mm-prop>
        <mm-prop name="height" type="string" optional></mm-prop>
        <mm-prop name="primaryAction" type="ActionConfig" optional></mm-prop>
        <mm-prop name="secondaryAction" type="ActionConfig" optional></mm-prop>
        <mm-prop name="layerclose" type="CustomEvent" kind="event"></mm-prop>
      </mm-component-props>

      <mm-component-anatomy
        .parts=${[
          'Backdrop — 레이어 뒤 반투명 배경. 배경 클릭 또는 ESC 시 layerclose 이벤트를 발생시킵니다.',
          '레이어 컨테이너 — flex column 박스. height prop으로 높이 고정, max-height: 90vh 기본값.',
          'mm-layer-header — 타이틀과 닫기 버튼. layerclose 이벤트를 발생시킵니다.',
          'mm-layer-body — 스크롤 가능한 콘텐츠 영역. flex: 1 1 auto로 header·footer를 제외한 나머지를 채웁니다.',
          'mm-layer-footer — 액션 버튼 영역. primaryAction / secondaryAction prop으로 구성합니다.',
        ]}
      ></mm-component-anatomy>

      <mm-component-guide>
        <!-- <mm-paragraph>
            시각적 형태(Dialog, Sheet 등)가 아니라 행동 계약으로 Layer와 AnchoredLayer 둘로 나뉜다.
            행동(modality·dismiss·reference)은 컨트롤러가 책임지는 별도 관심사고, elevation·
            background·radius·width·placement 같은 외형은 컨트롤러와 무관하게 구현체가 조합한다.
            실제 컴포넌트는 두 행동 계약 중 하나를 고르고, 여기에 외형과 자기 고유 로직(폼 상태,
            액션 등)을 더해 완성된다.
          </mm-paragraph> -->

        <mm-grid columns="2" gap="8">
          <mm-text-block level="2" heading="Level">
            <mm-paragraph>
              viewport를 reference로 삼아 화면 중앙·가장자리에 위치하며, 배경과의 상호작용을
              차단하는 modal 행동 계약. Backdrop(dim)이 뒤를 덮고, 포커스는 레이어 내부에
              갇힌다(focus trap). 닫기는 명시적인 버튼 액션으로만 허용하는 것이 원칙이며, 배경
              클릭·ESC로 닫는 기능은 중요도가 낮은 작업에서만 예외적으로 허용한다.
            </mm-paragraph>
            <mm-text-list
              texts=${JSON.stringify([
                'reference — viewport.',
                'modality — 배경 클릭 불가·스크롤 불가.',
                'dismiss — 명시 버튼 우선, 배경 클릭·ESC는 예외적으로만 허용. 포커스 트랩, aria-modal="true".',
                '구현: mm-layer, mm-dialog(mm-layer와 LayerController 배관 공유).',
                '용례: 삭제 확인, 중요 정보 입력, 오류 처리, 결제 흐름, bottom sheet/drawer.',
              ])}
            ></mm-text-list>
          </mm-text-block>
          <mm-thumbnail ratio="1:1">12</mm-thumbnail>
        </mm-grid>

        <mm-heading level="2">AnchoredLayer</mm-heading>
        <mm-paragraph>
          트리거를 reference로 삼아 위치하며, 배경과의 상호작용을 허용하는 non-modal 행동 계약. 현재
          작업 맥락을 유지하면서 부가 정보나 서브태스크를 제공할 때 사용한다. 포커스 트랩이 없고,
          외부 클릭·ESC로 언제든 닫을 수 있다.
        </mm-paragraph>
        <mm-text-list
          texts=${JSON.stringify([
            'reference — 트리거.',
            'modality — 배경 클릭 가능·스크롤 가능.',
            'dismiss — 외부 클릭 또는 ESC. 포커스 트랩 없음.',
            '구현: mm-popover. mm-select 등 popover 기반 컴포넌트가 이 계약을 재사용한다.',
            '용례: Dropdown, Tooltip, 사이드 패널, Select.',
          ])}
        ></mm-text-list>

        <mm-heading level="2">외형</mm-heading>
        <mm-text-list
          texts=${JSON.stringify([
            'surface — elevation·background·radius.',
            'width — 패널 너비.',
            'placement — 패널 위치. 계약마다 값 집합이 다르다: mm-layer는 center/bottom/left/right, mm-popover는 top-left/top-right/bottom-left/bottom-right.',
          ])}
        ></mm-text-list>

        <mm-table
          id="layer-comparison-table"
          style="margin-top: var(--space-4)"
          caption="UI별 modal 여부와 위치 기준 비교"
          columns='[
              {"label": "UI"},
              {"label": "Modal"},
              {"label": "Anchor"}
            ]'
        ></mm-table>
      </mm-component-guide>

      <mm-component-section
        heading="Layer Header"
        description="타이틀과 선택적인 닫기 버튼을 제공합니다. 닫기 버튼은 layerclose 이벤트를 버블링합니다."
      >
        <mm-layer-header heading="Layer Title"></mm-layer-header>
        <mm-text>내용</mm-text>
      </mm-component-section>

      <mm-component-section
        heading="Layer Body"
        description="스크롤 가능한 콘텐츠 영역. flex: 1 1 auto로 header·footer를 제외한 나머지를 채웁니다."
      >
        <mm-layer-body>
          <mm-paragraph>layer-body는 콘텐츠가 넘치면 내부에서 스크롤됩니다.</mm-paragraph>
          <mm-paragraph>
            mm-layer에 height를 지정하면 고정 높이 내에서 body가 스크롤됩니다.
          </mm-paragraph>
        </mm-layer-body>
      </mm-component-section>

      <mm-component-section
        heading="Toast"
        description="화면 하단 중앙에 잠깐 떠올랐다 약 3초 후 스스로 사라지는 transient non-modal 레이어입니다. open()으로 띄우며, 열려 있을 때 다시 호출하면 남은 시간이 초기화됩니다."
      >
        <mm-button data-open-toast>토스트 띄우기</mm-button>
        <mm-toast class="js-demo-toast">저장되었습니다.</mm-toast>
      </mm-component-section>

      <mm-component-section heading="Filter" description="샘플">
        ${filterLayerTemplate()}
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

function layerExampleTemplate() {
  return html`
    <mm-button-group>
      <mm-button @click=${() => openLayer('center-layer')}>Center</mm-button>
      <mm-button @click=${() => openLayer('bottom-layer')}>Bottom</mm-button>
      <mm-button @click=${() => openLayer('left-layer')}>Left</mm-button>
      <mm-button @click=${() => openLayer('right-layer')}>Right</mm-button>
    </mm-button-group>

    <mm-layer id="center-layer" placement="center" width="medium">
      <mm-layer-header heading="Center Layer"></mm-layer-header>
      <mm-layer-body><mm-paragraph>중앙 모달 콘텐츠</mm-paragraph></mm-layer-body>
      <mm-layer-footer
        .primaryAction=${{ label: '확인', onClick: () => {} }}
        .secondaryAction=${{ label: '닫기', onClick: () => {} }}
      ></mm-layer-footer>
    </mm-layer>
    <mm-layer id="bottom-layer" placement="bottom" height="360px">
      <mm-layer-header heading="Bottom Layer"></mm-layer-header>
      <mm-layer-body>
        <mm-menu-item-group>
          <mm-menu-item-action size="48" label="검색"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="저장"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="공유"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="보관"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="숨기기"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="신고"></mm-menu-item-action>
          <mm-menu-item-action size="48" label="삭제" tone="danger"></mm-menu-item-action>
        </mm-menu-item-group>
      </mm-layer-body>
      <mm-layer-footer
        .primaryAction=${{ label: '저장', onClick: () => {} }}
        .secondaryAction=${{ label: '취소', onClick: () => {} }}
      ></mm-layer-footer>
    </mm-layer>
    <mm-layer id="left-layer" placement="left">
      <mm-layer-header heading="Left Layer"></mm-layer-header>
      <mm-layer-body><mm-paragraph>왼쪽 패널 콘텐츠</mm-paragraph></mm-layer-body>
      <mm-layer-footer
        .primaryAction=${{ label: '완료', onClick: () => {} }}
        .secondaryAction=${{ label: '닫기', onClick: () => {} }}
      ></mm-layer-footer>
    </mm-layer>
    <mm-layer id="right-layer" placement="right">
      <mm-layer-header heading="Right Layer"></mm-layer-header>
      <mm-layer-body><mm-paragraph>오른쪽 패널 콘텐츠</mm-paragraph></mm-layer-body>
      <mm-layer-footer
        .primaryAction=${{ label: '완료', onClick: () => {} }}
        .secondaryAction=${{ label: '닫기', onClick: () => {} }}
      ></mm-layer-footer>
    </mm-layer>
  `
}

function filterLayerTemplate() {
  return html`
    <mm-icon-button icon=${ICON_NAMES.FILTER} data-open-layer="#filter-layer"></mm-icon-button>
    <mm-layer placement="bottom" id="filter-layer">
      <mm-layer-header heading="필터"></mm-layer-header>
      <mm-layer-body>
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
      </mm-layer-body>
      <mm-layer-footer
        .primaryAction=${{ label: '숙소 25개 표시', onClick: () => {} }}
        .secondaryAction=${{ label: '전체 해제', onClick: () => {} }}
      ></mm-layer-footer>
    </mm-layer>
  `
}
