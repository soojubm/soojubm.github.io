import '@/components/common'
import { html } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'
import './interaction.css'

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://m3.material.io/foundations/interaction/states/state-layers',
    label: 'MD3 - State Layers',
    external: true,
  },
  {
    href: 'https://spectrum.adobe.com/page/states/',
    label: 'Adobe Spectrum - States',
    external: true,
  },
  {
    href: 'https://carbondesignsystem.com/patterns/read-only-states-pattern/',
    label: 'Carbon - Read-only States',
    external: true,
  },
]

const checkedComponentRows = html`
  <tr>
    <th scope="row"><mm-code>mm-checkbox-group</mm-code></th>
    <td><mm-code>checked</mm-code></td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-radio-group</mm-code></th>
    <td><mm-code>checked</mm-code></td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-switch</mm-code></th>
    <td><mm-code>aria-checked</mm-code></td>
  </tr>
  <tr>
    <th scope="row">
      <mm-code>mm-menu-item-radio</mm-code>
      <mm-code>mm-menu-item-checkbox</mm-code>
    </th>
    <td><mm-code>aria-checked</mm-code></td>
  </tr>
`
const currentComponentRows = html`
  <tr>
    <th scope="row"><mm-code>mm-breadcrumb</mm-code></th>
    <td><mm-code>page</mm-code></td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-pagination</mm-code></th>
    <td><mm-code>page</mm-code></td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-page-button</mm-code></th>
    <td><mm-code>page</mm-code></td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-bottom-bar</mm-code></th>
    <td><mm-code>page</mm-code></td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-app-sidebar</mm-code></th>
    <td><mm-code>page</mm-code></td>
  </tr>
`
const expandedComponentRows = html`
  <tr>
    <th scope="row"><mm-code>mm-show-more-button</mm-code></th>
    <td>잘린 텍스트</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-read-more-button</mm-code></th>
    <td>잘린 텍스트</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-hamburger-button</mm-code></th>
    <td>내비게이션 메뉴</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-more-button</mm-code></th>
    <td>오버플로 메뉴</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-app-sidebar</mm-code></th>
    <td>하위 트리</td>
  </tr>
  <tr>
    <th scope="row">navbar-search</th>
    <td>검색 패널</td>
  </tr>
  <tr>
    <th scope="row">chat-source</th>
    <td>출처 상세</td>
  </tr>
  <tr>
    <th scope="row">model-selector</th>
    <td>모델 목록</td>
  </tr>
`
const hoverRows = html`
  <tr>
    <th scope="row">
      <mm-code>mm-menu-item</mm-code>
    </th>
    <td>배경 채움</td>
    <td>배경을 가진 행·항목·카드처럼 채울 면이 있을 때.</td>
    <td><mm-code>\${interactiveElement}:hover</mm-code></td>
    <td>
      <mm-code>--menu-item-background-color: var(--interaction-hover-background-color)</mm-code>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <mm-code>mm-table</mm-code>
      <br />
      (reset.css 전역 규칙)
    </th>
    <td>배경 채움</td>
    <td>배경을 가진 행·항목·카드처럼 채울 면이 있을 때.</td>
    <td><mm-code>table tbody tr:hover</mm-code></td>
    <td>
      <mm-code>--table-cell-background-color: var(--interaction-hover-background-color)</mm-code>
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-portfolio-item</mm-code></th>
    <td>떠오름</td>
    <td>채울 배경이 없는 떠 있는 표면일 때.</td>
    <td><mm-code>\${interactiveElement}:hover</mm-code></td>
    <td><mm-code>--lift: var(--interaction-hover-lift)</mm-code></td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-foundation-item</mm-code></th>
    <td>떠오름</td>
    <td>채울 배경이 없는 떠 있는 표면일 때.</td>
    <td><mm-code>\${interactiveElement}:hover</mm-code></td>
    <td><mm-code>--lift: var(--interaction-hover-lift)</mm-code></td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-button</mm-code></th>
    <td>테두리 드러내기</td>
    <td>평소 테두리를 감춰 둔 컨트롤일 때.</td>
    <td><mm-code>:is(button, a):hover</mm-code></td>
    <td><mm-code>--button-border: var(--border)</mm-code></td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-icon-button</mm-code></th>
    <td>테두리 드러내기</td>
    <td>평소 테두리를 감춰 둔 컨트롤일 때.</td>
    <td><mm-code>button:hover</mm-code></td>
    <td><mm-code>--icon-button-border: var(--border)</mm-code></td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-input</mm-code></th>
    <td>테두리 드러내기</td>
    <td>평소 테두리를 감춰 둔 컨트롤일 때.</td>
    <td><mm-code>:host(:hover)</mm-code></td>
    <td><mm-code>--input-border: var(--border)</mm-code></td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-thumbnail</mm-code></th>
    <td>테두리 드러내기</td>
    <td>평소 테두리를 감춰 둔 컨트롤일 때.</td>
    <td><mm-code>\${interactiveElement}:hover .image-wrapper</mm-code></td>
    <td><mm-code>--thumbnail-border: var(--border)</mm-code></td>
  </tr>
  <tr>
    <th scope="row">커스텀 스크롤바</th>
    <td>기능</td>
    <td></td>
    <td><mm-code>:hover::-webkit-scrollbar-thumb</mm-code></td>
    <td><mm-code>background: var(--background-strong-color)</mm-code></td>
  </tr>
`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Interaction"
      description="어떤 요소가 상호작용할 수 있는지, 그리고 상호작용할 때 어떻게 반응하는지를 일관된 시각 언어로 정의합니다. 상태는 색상만으로 전달하지 않습니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="Interactive signifiers">
        <mm-paragraph>
          클릭 가능성은 형태로 드러냅니다. 이 단서는 장식이나 일반 강조로 쓰지 않습니다.
        </mm-paragraph>
        <mm-grid columns="3">
          <mm-surface variant="elevated">
            <mm-paragraph>
              떠 있는 표면은 그 자체가 클릭 대상이거나 안에 클릭할 요소를 담습니다. 표면 자체가
              대상이면 hover에서 한 단계 더 떠올라 이를 확인시킵니다.
            </mm-paragraph>
          </mm-surface>
          <mm-surface variant="filled">
            <mm-paragraph>채워진 배경은 안에 실행 가능한 액션이 있음을 알립니다.</mm-paragraph>
          </mm-surface>
          <mm-surface variant="ghost">
            <mm-paragraph>
              <mm-link href="#">브랜드 색 텍스트·아이콘</mm-link>
              은 이동하거나 실행하는 링크입니다.
            </mm-paragraph>
          </mm-surface>
        </mm-grid>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Interaction tokens">
        <mm-paragraph>
          상호작용 상태가 공유하는 토큰입니다. 상태 selector에서 속성을 다시 선언하지 않고 이 토큰을
          재할당합니다.
        </mm-paragraph>
        <mm-grid columns="3" gap="3">
          <mm-flex direction="column" gap="2">
            <div
              class="swatch-chip"
              style="outline: var(--interaction-focus-outline); outline-offset: -4px"
            ></div>
            <mm-caption>--interaction-focus-outline</mm-caption>
          </mm-flex>
          <mm-flex direction="column" gap="2">
            <div
              class="swatch-chip"
              style="background: var(--interaction-hover-background-color)"
            ></div>
            <mm-caption>--interaction-hover-background-color</mm-caption>
          </mm-flex>
          <mm-flex direction="column" gap="2">
            <div class="swatch-chip"></div>
            <mm-caption>--interaction-hover-lift</mm-caption>
          </mm-flex>
          <mm-flex direction="column" gap="2">
            <div
              class="swatch-chip"
              style="background: var(--interaction-active-background-color)"
            ></div>
            <mm-caption>--interaction-active-background-color</mm-caption>
          </mm-flex>
          <mm-flex direction="column" gap="2">
            <div class="swatch-chip" style="box-shadow: var(--interaction-active-shadow)"></div>
            <mm-caption>--interaction-active-shadow</mm-caption>
          </mm-flex>
          <mm-flex direction="column" gap="2">
            <div
              class="swatch-chip"
              style="background: var(--interaction-selected-background-color)"
            ></div>
            <mm-caption>--interaction-selected-background-color</mm-caption>
          </mm-flex>
          <mm-flex direction="column" gap="2">
            <div
              class="swatch-chip"
              style="background: var(--interaction-selected-foreground-color)"
            ></div>
            <mm-caption>--interaction-selected-foreground-color</mm-caption>
          </mm-flex>
          <mm-flex direction="column" gap="2">
            <div
              class="swatch-chip"
              style="background: var(--interaction-selected-border-color)"
            ></div>
            <mm-caption>--interaction-selected-border-color</mm-caption>
          </mm-flex>
        </mm-grid>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="States">
        <mm-paragraph>
          상태 표현은 각 컴포넌트가 소유하며, Interaction tokens를 상태별로 재할당해 나타냅니다.
        </mm-paragraph>
        <mm-flex direction="column" gap="3">
          <mm-list-item
            icon=${ICON_NAMES.CLICK}
            size="small"
            label="Hover"
            description="포인터가 올라와 있다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.CUBE_SCAN}
            size="small"
            label="Focus"
            description="키보드가 지금 이 요소에 있다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.MOUSE_BUTTON}
            size="small"
            label="Active"
            description="지금 누르고 있다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon="check-square"
            size="small"
            label="Pressed"
            description="그룹 없이 스스로 눌린 상태를 유지한다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.CHECK}
            size="small"
            label="Checked"
            description="컨트롤의 on/off 값이 켜져 있다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.SELECTED}
            size="small"
            label="Selected"
            description="목록에서 고른 항목이라는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon="map-pin"
            size="small"
            label="Current"
            description="내비게이션에서 지금 위치한 곳이라는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.EXPAND}
            size="small"
            label="Expanded"
            description="토글 대상이 펼쳐져 있다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.WARNING}
            size="small"
            label="Invalid"
            description="입력값이 유효하지 않다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.LOCK}
            size="small"
            label="Disabled"
            description="지금은 조작을 받지 않는다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon="eye-circle"
            size="small"
            label="Read-only (보류)"
            description="disabled와 달리 이동·낭독은 되고 수정만 막힌다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.REFRESH}
            size="small"
            label="진행 중"
            description="결과가 올 때까지 다시 실행할 수 없다는 표시입니다."
          ></mm-list-item>
        </mm-flex>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Hover">
        <mm-paragraph>
          hover 처리는 요소가 무엇을 가졌는지에 따라 정해집니다. 상태 selector에서 속성을 다시
          선언하지 않고, 평소 값을 담고 있는 컴포넌트 토큰에 아래 값을 재할당합니다.
        </mm-paragraph>
        <mm-surface variant="filled">
          <mm-grid columns="3" gap="4">
            <mm-flex direction="column" gap="2">
              <mm-menu-item-action icon="folder" label="배경 채움"></mm-menu-item-action>
              <mm-caption>
                배경을 가진 면이면 hover에 --interaction-hover-background-color로 채운다.
              </mm-caption>
            </mm-flex>
            <mm-flex direction="column" gap="2">
              <mm-foundation-item
                href="#"
                heading="떠오름"
                description="채울 배경이 없는 떠 있는 표면."
              ></mm-foundation-item>
              <mm-caption>hover에 --interaction-hover-lift만큼 떠오른다.</mm-caption>
            </mm-flex>
            <mm-flex direction="column" gap="2">
              <mm-button variant="tertiary">테두리 드러내기</mm-button>
              <mm-caption>
                평소 테두리를 감춘 컨트롤이면 hover에 border-color를 드러낸다.
              </mm-caption>
            </mm-flex>
          </mm-grid>
        </mm-surface>
        <mm-table
          .rows=${hoverRows}
          caption="컴포넌트별 hover 처리와 재할당 값"
          .columns=${[
            { label: '컴포넌트', width: '200px' },
            { label: '처리', width: '120px' },
            { label: '언제', width: '260px' },
            { label: 'Selector', width: '220px' },
            { label: '변경 값' },
          ]}
        ></mm-table>
        <mm-paragraph>
          <mm-code>mm-marquee</mm-code>
          의
          <mm-code>pause-on-hover</mm-code>
          는 상태 표현이 아니라 포인터가 있는 동안만 애니메이션을 멈추는 기능이라 위 표에 포함하지
          않습니다.
        </mm-paragraph>
      </mm-content-section>
      <mm-content-section heading-level="3" heading="Pressed">
        <mm-paragraph>
          스스로 눌림 상태를 유지하는 컨트롤은
          <mm-code>aria-pressed</mm-code>
          로 표현하고, 선택 상태와 같은 강조 토큰을 공유합니다.
          <mm-code>mm-toggle-button</mm-code>
          과 그 시맨틱 컴포넌트(follow·bookmark·reveal), toggle·filter 버튼 그룹이 씁니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Checked">
        <mm-paragraph>
          컨트롤 자체의 on/off 값입니다. 네이티브
          <mm-code>checked</mm-code>
          가 있으면 그것을, 없으면
          <mm-code>aria-checked</mm-code>
          를 씁니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            '눌러 실행되는 항목이나 화면을 바꾸는 탭처럼 결과가 화면 변화로 드러나는 상호작용은 값을 남기지 않는다.',
            '그룹의 상태 소유·옵션 모양·키보드 이동은 Selection 문서를 따른다.',
            '스킨은 상태 attribute selector를 기준으로 두고, 강조에는 --interaction-selected-* 토큰을 함께 쓴다.',
          ]}
        ></mm-text-list>
        <mm-table
          .rows=${checkedComponentRows}
          caption="Checked 컴포넌트와 상태 attribute"
          .columns=${[{ label: '컴포넌트', width: '220px' }, { label: '상태' }]}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Selected">
        <mm-paragraph>
          컬렉션에서 고른 항목입니다.
          <mm-code>mm-select</mm-code>
          의 옵션이
          <mm-code>aria-selected</mm-code>
          로 고른 값을 나타내며, 그룹 소유·키보드·강조 토큰 규칙은 Checked와 같습니다.
        </mm-paragraph>
        <mm-paragraph>
          <mm-code>mm-tab</mm-code>
          도
          <mm-code>aria-selected</mm-code>
          로 활성 탭을 나타내지만, 폼 값이 아니라 지금 보이는 패널을 가리킵니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Current">
        <mm-paragraph>
          지금 위치한 곳을
          <mm-code>aria-current</mm-code>
          로 표시합니다. 페이지·라우트를 가리키면
          <mm-code>page</mm-code>
          를 씁니다.
        </mm-paragraph>
        <mm-table
          .rows=${currentComponentRows}
          caption="Current 컴포넌트와 값"
          .columns=${[
            { label: '컴포넌트', width: '180px' },
            { label: '값', width: '100px' },
          ]}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Expanded">
        <mm-paragraph>
          펼침·접힘 여부는
          <mm-code>aria-expanded</mm-code>
          로 표시합니다.
        </mm-paragraph>
        <mm-table
          .rows=${expandedComponentRows}
          caption="Expanded 컴포넌트와 펼치는 대상"
          .columns=${[{ label: '컴포넌트', width: '220px' }, { label: '펼치는 대상' }]}
        ></mm-table>
      </mm-content-section>
    </mm-content-section-list>

    <mm-component-references .items=${componentReferences}></mm-component-references>
  </mm-main>
`

renderPage(main)
