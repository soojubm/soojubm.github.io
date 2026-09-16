import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'select.html', label: 'Select' },
  { href: 'sheet.html', label: 'Sheet' },
  { href: 'tooltip.html', label: 'Tooltip' },
  { href: 'menu-item.html', label: 'menuItem' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'open', type: 'boolean' },
  {
    name: 'placement',
    type: "'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-left'",
  },
  { name: 'slot: trigger', type: 'HTMLElement' },
  { name: 'popover-toggle', type: 'CustomEvent<{ open: boolean }>', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'overlay-panel-min-width' },
  { name: 'overlay-panel-max-width' },
  { name: 'overlay-panel-height' },
  { name: 'overlay-panel-max-height' },
  { name: 'overlay-panel-padding-block' },
  { name: 'overlay-panel-padding-inline' },
  { name: 'overlay-panel-border-radius' },
  { name: 'popover-offset' },
]

const componentFeatures: ComponentFeatureItem[] = []

const main = html`
  <mm-main>
    <mm-page-header
      heading="Popover"
      description="트리거에 앵커되어 뜨는 non-modal 레이어 프리미티브입니다. backdrop·스크롤 잠금 없이 패널 표면과 열림 상태만 책임집니다."
    ></mm-page-header>

    <mm-component-aka .items=${['Flyout', 'Dropdown Panel', 'Menu Surface']}></mm-component-aka>

    <mm-component-example>
      <mm-popover>
        <mm-button slot="trigger">팝오버 열기</mm-button>
        <mm-paragraph>트리거에 앵커되는 non-modal 레이어 표면입니다.</mm-paragraph>
      </mm-popover>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          '열림 상태는 popover가 소유한다. 트리거는 항상 slot=trigger로 넣으며, popover가 스스로 positioned 앵커가 되어 별도 래퍼가 필요 없고, 클릭 토글·외부 클릭·ESC 닫기·aria-expanded 반영까지 자동으로 연결된다.',
          '패널 폭·여백은 --overlay-panel-* 토큰으로 정한다.',
          '여는 표면의 종류는 트리거의 aria-haspopup으로 알리고, role은 안에 넣는 목록 컴포넌트가 소유한다. 설정 컨트롤을 담은 패널은 aria-haspopup 없이 aria-expanded만 둔다.',
          '메뉴·목록이 열리면 선택된 항목(없으면 첫 항목)으로 포커스가 옮겨 가 방향키로 탐색하고, 포커스가 안에 있던 채로 닫히면 트리거로 돌아온다.',
          '트리거를 가리키는 화살표는 두지 않는다. 사용자가 직접 연 표면이라 어디에서 나왔는지 이미 분명하다.',
          '용례: 컨텍스트 메뉴, 댓글 항목의 수정·삭제 메뉴. 값을 고르는 드롭다운은 Select를 사용한다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-popover>
    <mm-button slot="trigger">팝오버 열기</mm-button>
    <mm-paragraph>트리거에 앵커되는 non-modal 레이어 표면입니다.</mm-paragraph>
</mm-popover>`}
    ></mm-component-anatomy>

    <mm-component-section
      heading="ThemeSelector"
      description="현재 테마를 아이콘 버튼으로 표시하고, 펼친 패널에서 테마와 모서리 모양을 바꿉니다."
    >
      <mm-theme-selector></mm-theme-selector>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </mm-main>
`

renderPage(main)
