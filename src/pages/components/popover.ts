import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { PopoverPlacement } from '@/components/overlay/popover/popover'
import type { MoreMenuAction } from '@/components/overlay/popover/semantics/more-menu'

import { componentPropsOf, openStateMethods } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const placements: PopoverPlacement[] = ['bottom-start', 'bottom-end', 'top-start', 'top-end']

const moreMenuActions: MoreMenuAction[] = [
  { value: 'share', label: '공유', onClick: () => alert('clicked') },
  { value: 'edit', label: '수정', onClick: () => alert('clicked') },
  { value: 'delete', label: '삭제', tone: 'danger', onClick: () => alert('clicked') },
]

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'select.html', label: 'Select' },
  { href: 'sheet.html', label: 'Sheet' },
  { href: 'tooltip.html', label: 'Tooltip' },
  { href: 'menu-item.html', label: 'Menu Item' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('mm-popover'),
  ...openStateMethods,
  { name: 'toggle', type: 'CustomEvent<{ open: boolean }>', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = []

const main = html`
  <mm-main>
    <mm-page-header
      heading="Popover"
      description="트리거에 붙어 뜨는 non-modal 레이어입니다. 트리거로 열고 바깥 클릭이나 ESC로 닫히며 배경 상호작용을 막지 않으므로, 사용자는 지금 보던 맥락을 떠나지 않고 추가 옵션이나 정보를 다룰 수 있습니다."
    ></mm-page-header>

    <mm-component-aka .items=${['Flyout', 'Dropdown Panel', 'Menu Surface']}></mm-component-aka>

    <mm-component-example>
      <mm-flex gap="2" wrap="wrap">
        ${placements.map(
          placement => html`
            <mm-button aria-controls=${`popover-${placement}`}>${placement}</mm-button>
            <mm-popover id=${`popover-${placement}`} placement=${placement}>
              <mm-paragraph>${placement}에 붙는 패널입니다.</mm-paragraph>
            </mm-popover>
          `,
        )}
      </mm-flex>
    </mm-component-example>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-popover']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          '열림 상태는 popover가 소유한다. 트리거는 popover 밖에 두고 aria-controls로 popover의 id를 가리키면, 클릭 토글·외부 클릭·ESC 닫기·aria-expanded 반영까지 자동으로 연결된다.',
          'popover는 portal 컨테이너로 옮겨져 트리거의 화면 좌표로 위치를 잡는다. 스크롤 영역이나 transform·contain을 가진 조상 안에 트리거가 있어도 잘리지 않고, sheet 안에서 열려도 sheet 위에 보인다.',
          '목록 컴포넌트처럼 열림 상태를 따로 소유해 트리거를 직접 배선하는 쪽은 aria-controls 대신 anchor로 기준 요소를 넘긴다.',
          '패널 폭·여백은 --overlay-panel-* 토큰으로 정한다.',
          '패널은 400px와 화면 높이의 50% 중 작은 값까지 자라고, 넘치면 안에서 스크롤된다.',
          '패널은 240px보다 좁아지지 않는다. 테이블 셀처럼 좁은 자리의 트리거에 붙이면 패널이 주변을 덮으니 그 범위를 함께 본다.',
          '여는 표면의 종류는 트리거의 aria-haspopup으로 알리고, role은 안에 넣는 목록 컴포넌트가 소유한다. 설정 컨트롤을 담은 패널은 aria-haspopup 없이 aria-expanded만 둔다.',
          '열리면 포커스가 표면 안으로 옮겨 간다. 메뉴·목록이면 선택된 항목(없으면 첫 항목)에서 방향키로 탐색하고, 그 밖의 내용이면 표면 자체가 받는다. 포커스가 안에 있던 채로 닫히거나 Tab으로 표면을 벗어나면 닫히고 트리거로 돌아온다. 표면이 문서 끝으로 옮겨져 Tab으로 나가면 엉뚱한 곳에 닿기 때문이다.',
          '트리거를 가리키는 화살표는 두지 않는다. 사용자가 직접 연 표면이라 어디에서 나왔는지 이미 분명하다.',
          '용례: 컨텍스트 메뉴, 댓글 항목의 수정·삭제 메뉴. 값을 고르는 드롭다운은 Select를 사용한다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-button aria-controls="popover">팝오버 열기</mm-button>
<mm-popover id="popover">
    <mm-paragraph>트리거에 앵커되는 non-modal 레이어 표면입니다.</mm-paragraph>
</mm-popover>`}
    ></mm-component-anatomy>

    <mm-component-section
      heading="MoreMenu"
      description="더보기 버튼으로 여는 명령 목록입니다. 좁은 화면에서는 목록을 sheet로 올립니다."
    >
      <mm-more-menu aria-label="추가 액션" .actions=${moreMenuActions}></mm-more-menu>
    </mm-component-section>

    <mm-component-section
      heading="ThemeSelector"
      description="현재 테마를 아이콘 버튼으로 표시하고, 펼친 패널에서 테마와 모서리 모양을 바꿉니다."
    >
      <mm-theme-selector></mm-theme-selector>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
