import { html } from 'lit'
import { renderDocumentLayout } from '../../../layouts/document-layout'

const main = html`
  <main class="page">
    <mm-flex direction="column" gap="16">
      <mm-page-header
        heading="Patterns"
        description="패턴은 여러 컴포넌트를 조합해 반복되는 사용자 문제를 해결하는 재사용 가능한 상호작용 단위입니다."
      ></mm-page-header>

      <mm-flex direction="column" gap="3">
        <mm-text-block
          level="2"
          heading-level="2"
          heading="Popover"
          description="트리거에 앵커되어 뜨는 비모달 패널 프리미티브입니다. popover 자신은 role을 갖지 않고, 안에 무엇을 담는지에 따라 Menu·ListBox 같은 접근성 패턴의 컨테이너가 됩니다. 열림·닫힘과 바깥 클릭·ESC 닫힘은 popover가 소유하고, 좌표는 placement, 폭은 width로 정합니다."
        ></mm-text-block>
        <mm-text-list
          texts='[
          "mm-popover — 앵커 패널. role 없이 위치·크기·닫힘만 책임진다.",
          "role은 소비자가 내부 콘텐츠에 맞게 정한다 — 행동 목록이면 Menu, 선택 목록이면 ListBox."
        ]'
        ></mm-text-list>
      </mm-flex>

      <mm-flex direction="column" gap="8">
        <mm-text-block
          level="2"
          heading-level="2"
          heading="Accessibility Patterns"
          description="Menu와 ListBox는 서로 다른 컴포넌트가 아니라, 같은 popover + menu-item 조합에 role만 다르게 적용해 만드는 상호작용 계약입니다."
        ></mm-text-block>

        <mm-grid columns="2">
          <mm-flex direction="column" gap="3">
            <mm-text-block
              level="3"
              heading-level="3"
              heading="Menu"
              description="트리거를 누르면 뜨는 행동 목록입니다. 누르면 즉시 실행되거나 닫히며, 실행형 액션과 체크박스·라디오형 옵션을 함께 담을 수 있습니다."
            ></mm-text-block>
            <mm-text-list
              variant="number"
              texts='[
              "mm-popover — 패널",
              "mm-menu-item-group (role=menu, 기본값)",
              "mm-menu-item-action · mm-menu-item-link — role=menuitem",
              "mm-menu-item-checkbox-group(role=group) > mm-menu-item-checkbox — role=menuitemcheckbox",
              "mm-menu-item-radio-group(role=radiogroup) > mm-menu-item-radio — role=menuitemradio"
            ]'
            ></mm-text-list>
          </mm-flex>

          <mm-flex direction="column" gap="3">
            <mm-text-block
              level="3"
              heading-level="3"
              heading="ListBox"
              description="여러 값 중 하나 또는 여러 개를 고르고 그 선택 상태를 유지하는 목록입니다. 고르면 닫히는 Menu와 달리, 지금 무엇이 선택되어 있는지가 핵심입니다."
            ></mm-text-block>
            <mm-text-list
              variant="number"
              texts='[
              "mm-popover — 패널",
              "mm-menu-item-group role=\\"listbox\\" — Menu와 같은 컨테이너, role만 override",
              "mm-menu-item-action role=\\"option\\" — role prop이 menuitem 대신 option을 지원한다"
            ]'
            ></mm-text-list>
            <mm-paragraph size="small" color="light">
              mm-select는 지금 이 조합을 role=menu/menuitem 기본값 그대로 사용해 단일 선택을
              흉내내고 있습니다. 엄밀한 listbox 시맨틱(aria-selected 등)이 필요해지면, 새 컴포넌트를
              만들지 않고 같은 조합의 role만 listbox/option으로 바꾸면 됩니다.
            </mm-paragraph>
          </mm-flex>
        </mm-grid>
      </mm-flex>
    </mm-flex>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
