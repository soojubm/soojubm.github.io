import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'layer.html', label: 'Layer' },
  { href: 'tooltip.html', label: 'Tooltip' },
  { href: 'menu-item.html', label: 'menuItem' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'open', type: 'boolean' },
  {
    name: 'placement',
    type: "'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-left'",
  },
  { name: 'width', type: 'string' },
  { name: 'padding', type: 'string' },
  { name: 'popoverclose', type: 'CustomEvent', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'popover-width', default: 'auto' },
  { name: 'popover-max-height', default: 'none' },
  { name: 'popover-offset', default: 'var(--space-1)' },
  { name: 'popover-padding', default: 'var(--space-1)' },
  { name: 'popover-border', default: 'var(--surface-overlay-border)' },
  { name: 'popover-border-radius', default: 'var(--radius)' },
  { name: 'popover-background-color', default: 'var(--surface-overlay-background-color)' },
  { name: 'popover-backdrop-filter', default: 'var(--surface-overlay-backdrop-filter)' },
  { name: 'popover-shadow', default: 'var(--surface-overlay-shadow)' },
]

const componentFeatures: ComponentFeatureItem[] = [
  { heading: 'TODO', description: 'TODO' },
  { heading: 'TODO', description: 'TODO' },
  { heading: 'TODO', description: 'TODO' },
]

const main = html`
  <main class="page">
    <mm-page-header
      heading="Popover"
      description="anchor 기준 non-modal 레이어 프리미티브입니다. TODO"
    ></mm-page-header>

    <mm-component-aka items='["Flyout", "Dropdown Panel", "Menu Surface"]'></mm-component-aka>

    <mm-component-example>
      <mm-popover width="200px">
        <mm-button slot="trigger">팝오버 열기</mm-button>
        <mm-paragraph>트리거에 앵커되는 non-modal 레이어 표면입니다.</mm-paragraph>
      </mm-popover>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
      <mm-text-list
        texts='[
        "열림 상태는 popover가 소유한다. 트리거는 항상 slot=trigger로 넣으며, popover가 스스로 positioned 앵커가 되어 별도 래퍼가 필요 없고, 클릭 토글·외부 클릭·ESC 닫기·aria-expanded 반영까지 자동으로 연결된다.",
        "패널 지오메트리를 밖에서 다듬을 때는 ::part(panel)을 사용한다.",
        "role=menu/listbox를 popover 요소에 직접 지정한다.",
        "용례: select, 컨텍스트 메뉴, 댓글 항목의 수정·삭제 메뉴."
      ]'
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-section
      heading="Select"
      description="popover를 프리미티브로 하는 선택 입력입니다. 트리거·옵션 파싱·선택 상태를 소유하고, 목록 표면은 popover에 맡깁니다."
    >
      <mm-select width="200px" value="stable">
        <mm-button slot="trigger" size="small" icon="nav-arrow-down" icon-position="trailing">
          릴리스 채널
        </mm-button>
        <option value="stable" selected>Stable</option>
        <option value="beta">Beta</option>
        <option value="canary">Canary</option>
      </mm-select>
    </mm-component-section>

    <mm-component-section
      heading="ThemeSelector"
      description="현재 테마를 아이콘 버튼으로 표시하고, 드롭다운에서 테마를 전환합니다."
    >
      <mm-theme-selector></mm-theme-selector>
    </mm-component-section>

    <mm-component-section
      heading="SortSelector"
      description="목록의 재정렬Sort을 위한 옵션 목록을 group으로 제공하지 마세요. 현재 정렬 상태만 요약 표기하고
    확장가능한 메뉴로 정렬 목록을 제공하세요. (bad case: 2022.04 구글 지도 바뀐 것)"
    >
      <mm-select id="my-dropdown">
        <mm-button slot="trigger" size="small" icon="nav-arrow-down" icon-position="trailing">
          최신순
        </mm-button>
        <option value="profile" selected>최신순</option>
        <option value="settings">오래된순</option>
      </mm-select>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </main>
`

// 트리거는 aria-controls로 popover를 가리키기만 하면 되고, 클릭 토글·외부 클릭·ESC 닫기·aria는 popover가 소유한다.
document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
