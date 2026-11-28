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

      <fff-text-list
        .texts=${[
          '내용이 최대 높이(400px)보다 길면 패널 안에서 스크롤된다.',
          '패널이 열리면 포커스가 패널 안으로 옮겨 간다.',
          '메뉴·목록이면 선택된 항목(없으면 첫 항목)에서 시작해 방향키로 탐색한다.',
          '패널이 닫히면 포커스는 트리거로 돌아온다. Tab으로 패널을 벗어나도 닫힌다.',
          '트리거를 가리키는 화살표는 두지 않는다. 사용자가 직접 연 패널이라 어디에서 나왔는지 이미 분명하다.',
        ]}
      ></fff-text-list>
      <fff-component-notice heading="트리거를 slot으로 받지 않는다">
        fff-popover는 host가 곧 표면이라 열릴 때 portal로 옮겨진다. slot으로 받은 트리거도 함께
        옮겨져 원래 자리에서 사라지고, 위치를 재는 기준 요소가 표면 안에 들어간다. 그래서 트리거는
        바깥에 두고 aria-controls로 가리킨다. 펼침 단서도 트리거를 만드는 쪽이 붙이며, 단서를
        일관되게 붙이려면 fff-more-menu처럼 트리거를 포함한 파생 컴포넌트에서 맡긴다.
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
