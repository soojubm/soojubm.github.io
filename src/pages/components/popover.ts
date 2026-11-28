import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { PopoverPlacement } from '@/components/overlay/popover/popover'
import type { MoreMenuAction } from '@/components/overlay/popover/semantics/more-menu'

import { code, componentPropsOf, openStateMethods } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const placements: PopoverPlacement[] = ['bottom-start', 'bottom-end', 'top-start', 'top-end']

const moreMenuActions: MoreMenuAction[] = [
  { value: 'share', label: '공유', onClick: () => alert('clicked') },
  { value: 'edit', label: '수정', onClick: () => alert('clicked') },
  { value: 'delete', label: '삭제', destructive: true, onClick: () => alert('clicked') },
]

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'select.html', label: 'Select' },
  { href: 'sheet.html', label: 'Sheet' },
  { href: 'tooltip.html', label: 'Tooltip' },
  { href: 'menu-item.html', label: 'Menu Item' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-popover'),
  ...openStateMethods,
  { name: 'toggle', type: 'CustomEvent<{ open: boolean }>', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Contextual',
    description:
      '트리거 가까이에 열려 사용자가 보던 맥락을 떠나지 않고 추가 동작이나 정보를 다룹니다. 배경은 그대로 조작할 수 있고, 바깥을 누르거나 ESC를 누르면 닫혀 작업 흐름이 끊기지 않습니다.',
  },
]

// popover 패널과 같은 재질. 패널 토큰은 fff-popover :host에만 선언돼 있어 같은 값을 직접 건다.
const panelStyle = [
  'width: calc(var(--size-80) * 3)',
  '--surface-padding: var(--space-2)',
  '--surface-border-radius: var(--border-radius)',
  '--surface-border: var(--material-overlay-border)',
  '--surface-shadow: var(--material-overlay-shadow)',
].join(';')

const triggerCode = `<fff-button aria-controls="menu-popover" aria-haspopup="menu">더보기</fff-button>
<fff-popover id="menu-popover" placement="bottom-start">
  ...
</fff-popover>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Popover"
      description="트리거에 붙어 뜨는 non-modal 레이어입니다. 트리거로 열고 바깥 클릭이나 ESC로 닫히며 배경 상호작용을 막지 않으므로, 사용자는 지금 보던 맥락을 떠나지 않고 추가 옵션이나 정보를 다룰 수 있습니다."
    ></fff-page-header>

    <fff-component-aka .items=${['Flyout', 'Dropdown Panel', 'Menu Surface']}></fff-component-aka>

    <fff-component-example>
      <fff-flex gap="2" wrap="wrap">
        ${placements.map(
          placement => html`
            <fff-button aria-controls=${`popover-${placement}`}>${placement}</fff-button>
            <fff-popover id=${`popover-${placement}`} placement=${placement}>
              <fff-paragraph>${placement}에 붙는 패널입니다.</fff-paragraph>
            </fff-popover>
          `,
        )}
      </fff-flex>
    </fff-component-example>

    <fff-component-code .code=${triggerCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-popover']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-content-section
        heading-level="3"
        heading="언제 사용하나요"
        description="컨텍스트 메뉴나 댓글 항목의 수정·삭제 메뉴처럼, 보던 맥락을 떠나지 않고 추가 동작을 꺼낼 때 사용합니다."
        .texts=${[
          html`
            값을 고르는 드롭다운에는 ${code('fff-select')}를 사용한다
          `,
        ]}
      ></fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="트리거를 가리키는 화살표를 두나요?"
        description="사용자가 직접 연 패널이라 어디에서 나왔는지 이미 분명하므로 화살표를 두지 않습니다."
      >
        <fff-grid columns="2" gap="6">
          <fff-figure-card description="화살표가 없어도 출처가 분명한데 시각 요소만 늘어난다">
            <fff-flex slot="figure" direction="column" align-items="center" gap="1">
              <fff-button variant="secondary">더보기</fff-button>
              <fff-flex direction="column" align-items="center" gap="0">
                <div
                  style="position: relative; z-index: 1; width: var(--size-16); aspect-ratio: 2; background: var(--border-color); clip-path: polygon(50% 0, 0 100%, 100% 100%)"
                ></div>
                <fff-surface style=${panelStyle}>
                  <fff-paragraph>오버레이 패널</fff-paragraph>
                </fff-surface>
              </fff-flex>
            </fff-flex>
            <fff-code-tag slot="tags" tone="red">Don't</fff-code-tag>
          </fff-figure-card>
          <fff-figure-card description="트리거 바로 아래에 붙여 열어 출처를 전한다">
            <fff-flex slot="figure" direction="column" align-items="center" gap="2">
              <fff-button variant="secondary">더보기</fff-button>
              <fff-surface style=${panelStyle}>
                <fff-paragraph>오버레이 패널</fff-paragraph>
              </fff-surface>
            </fff-flex>
            <fff-code-tag slot="tags" tone="green">Do</fff-code-tag>
          </fff-figure-card>
        </fff-grid>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="접근성"
        .texts=${[
          '패널이 열리면 포커스가 패널 안으로 옮겨 가 키보드 사용자가 바로 조작할 수 있다.',
          '메뉴·목록이면 선택된 항목(없으면 첫 항목)에서 시작해 방향키로 탐색한다.',
          '패널이 닫히면 포커스가 트리거로 돌아와 하던 자리에서 이어 간다. Tab으로 패널을 벗어나도 닫힌다.',
        ]}
      ></fff-content-section>

      <fff-component-notice heading="트리거를 slot으로 받지 않는 이유">
        slot으로 받으면 트리거가 패널과 함께 옮겨져, 패널이 열리는 순간 원래 자리에서 사라진다.
        그래서 트리거는 바깥에 두고 aria-controls로 가리킨다. 트리거까지 함께 쓰는 곳은 역할이
        분명한 도메인 컴포넌트가 맡는다. 예: fff-more-menu.
      </fff-component-notice>
    </fff-component-guide>

    <fff-component-section
      heading="MoreMenu"
      description="더보기 버튼으로 여는 명령 목록입니다. 좁은 화면에서는 목록이 sheet로 열립니다."
    >
      <fff-more-menu aria-label="추가 액션" .actions=${moreMenuActions}></fff-more-menu>
    </fff-component-section>

    <fff-component-section
      heading="ThemeSelector"
      description="현재 테마를 아이콘 버튼으로 표시하고, 펼친 패널에서 테마와 모서리 모양을 바꿉니다."
    >
      <fff-theme-selector></fff-theme-selector>
    </fff-component-section>
    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
