import '@/components/common/table'
import { html } from 'lit'

import { renderLayout } from '@/components/layouts/base-layouts'

const main = html`
  <main class="page">
    <mm-page-header
      heading="Interaction"
      description="어떤 요소가 상호작용할 수 있는지, 그리고 상호작용할 때 어떻게 반응하는지를 일관된 시각 언어로 정의합니다."
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

      <mm-content-section heading-level="3" heading="States">
        <mm-paragraph>
          상태 표현은 컴포넌트가 소유하고 아래 토큰을 공유합니다. 상태는 색상만으로 전달하지
          않습니다.
        </mm-paragraph>
        <mm-flex direction="column" gap="3">
          <mm-list-item
            icon="cursor-pointer"
            size="small"
            label="Hover"
            description="포인터가 올라온 요소를 강조합니다."
          ></mm-list-item>
          <mm-list-item
            icon="cube-scan"
            size="small"
            label="Focus"
            description="키보드 위치를 항상 보이는 outline으로 표시합니다."
          ></mm-list-item>
          <mm-list-item
            icon="mouse-button-left"
            size="small"
            label="Active"
            description="누르는 순간의 눌림 피드백입니다."
          ></mm-list-item>
          <mm-list-item
            icon="check-square"
            size="small"
            label="Pressed"
            description="그룹 없이 스스로 눌림 상태를 유지하는 컨트롤입니다."
          ></mm-list-item>
          <mm-list-item
            icon="check-circle"
            size="small"
            label="Selection"
            description="선택은 그룹이 소유하며 값을 남기는 상태입니다."
          ></mm-list-item>
          <mm-list-item
            icon="map-pin"
            size="small"
            label="Current"
            description="지금 위치한 곳을 내비게이션에서 표시합니다."
          ></mm-list-item>
          <mm-list-item
            icon="nav-arrow-down"
            size="small"
            label="Expanded"
            description="펼침·접힘 여부를 토글 대상에 표시합니다."
          ></mm-list-item>
          <mm-list-item
            icon="warning-triangle"
            size="small"
            label="Invalid"
            description="입력값이 유효하지 않을 때 오류로 표시합니다."
          ></mm-list-item>
          <mm-list-item
            icon="lock"
            size="small"
            label="Disabled"
            description="투명도만이 아니라 커서와 동작 차단을 함께 줍니다."
          ></mm-list-item>
          <mm-list-item
            icon="refresh"
            size="small"
            label="진행 중"
            description="결과가 올 때까지 재실행을 막고 로딩을 노출합니다."
          ></mm-list-item>
        </mm-flex>
        <mm-flex direction="column" gap="2">
          <code>--interaction-focus-outline</code>
          <code>--interaction-hover-background-color</code>
          <code>--interaction-hover-lift</code>
          <code>--interaction-active-background-color</code>
          <code>--interaction-active-shadow</code>
          <code>--interaction-selected-background-color</code>
          <code>--interaction-selected-foreground-color</code>
          <code>--interaction-selected-border-color</code>
        </mm-flex>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Hover">
        <mm-paragraph>
          hover 처리는 요소가 무엇을 가졌는지에 따라 정해집니다. 상태 selector에서 속성을 다시
          선언하지 않고, 평소 값을 담고 있는 컴포넌트 토큰에 아래 값을 재할당합니다.
        </mm-paragraph>
        <mm-table
          id="hover-table"
          caption="컴포넌트별 hover 처리와 재할당 값"
          style="--table-height: auto"
          columns='[
            {"label": "컴포넌트", "width": "200px"},
            {"label": "처리", "width": "120px"},
            {"label": "언제", "width": "260px"},
            {"label": "Selector", "width": "220px"},
            {"label": "변경 값"}
          ]'
        ></mm-table>
        <mm-paragraph>
          <code>mm-marquee</code>
          의
          <code>pause-on-hover</code>
          는 상태 표현이 아니라 포인터가 있는 동안만 애니메이션을 멈추는 기능이라 위 표에 포함하지
          않습니다.
        </mm-paragraph>
      </mm-content-section>
      <mm-content-section heading-level="3" heading="Selection">
        <mm-paragraph>
          선택은 값을 남기는 상호작용으로, 그룹 단위 소유·표현 규칙을 따릅니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          texts='[
            "눌러 실행되는 항목이나 화면을 바꾸는 탭처럼 결과가 화면 변화로 드러나는 상호작용은 값을 남기지 않는다.",
            "선택 상태는 항목이 아니라 그룹이 소유하며, 하나를 고르면 value·여럿을 고르면 values로 두고 바뀌면 change로 알린다. 하나의 값을 이루는 항목 사이는 화살표 키로 옮기고 Tab은 그룹을 한 번만 지난다.",
            "네이티브 attribute가 있으면 그것을, 없으면 역할에 맞는 ARIA attribute를 쓰고 스킨도 같은 selector를 기준으로 둔다."
          ]'
        ></mm-text-list>
        <mm-table
          id="selection-component-table"
          caption="선택 컴포넌트의 용도와 상태 attribute"
          style="--table-width: fit-content"
          columns='[
            {"label": "컴포넌트", "width": "220px"},
            {"label": "상태"}
          ]'
        ></mm-table>
        <mm-grid columns="3" gap="3">
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

        <style>
          .swatch-chip {
            height: var(--size-48);
            border: var(--border);
            border-radius: var(--radius);
          }
        </style>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Pressed">
        <mm-paragraph>
          그룹 없이 스스로 눌림 상태를 유지하는 컨트롤은
          <code>aria-pressed</code>
          로 표현하고, Selection과 같은 강조 토큰을 공유합니다.
        </mm-paragraph>
        <mm-table
          id="pressed-component-table"
          caption="Pressed 컴포넌트의 소유 방식"
          style="--table-width: fit-content"
          columns='[
            {"label": "컴포넌트", "width": "220px"},
            {"label": "소유"}
          ]'
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Current">
        <mm-paragraph>
          지금 위치한 곳을
          <code>aria-current</code>
          로 표시합니다. 페이지·라우트를 가리키면
          <code>page</code>
          , 그 외 항목을 가리키면
          <code>true</code>
          를 씁니다.
        </mm-paragraph>
        <mm-table
          id="current-component-table"
          caption="Current 컴포넌트와 값"
          style="--table-width: fit-content"
          columns='[
            {"label": "컴포넌트", "width": "180px"},
            {"label": "값", "width": "100px"}
          ]'
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Expanded">
        <mm-paragraph>
          펼침·접힘 여부는
          <code>aria-expanded</code>
          로 표시합니다.
        </mm-paragraph>
        <mm-table
          id="expanded-component-table"
          caption="Expanded 컴포넌트와 펼치는 대상"
          style="--table-width: fit-content"
          columns='[
            {"label": "컴포넌트", "width": "220px"},
            {"label": "펼치는 대상"}
          ]'
        ></mm-table>
      </mm-content-section>
    </mm-content-section-list>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main)
  setupSelectionComponentTable()
  setupHoverTable()
  setupPressedComponentTable()
  setupCurrentComponentTable()
  setupExpandedComponentTable()
})

function setupSelectionComponentTable() {
  const table = document.querySelector<HTMLElementTagNameMap['mm-table']>(
    'mm-table#selection-component-table',
  )
  if (!table) return

  table.rows = html`
    <tr>
      <th scope="row"><code>mm-checkbox-group</code></th>
      <td><code>checked</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-radio-group</code></th>
      <td><code>checked</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-switch</code></th>
      <td><code>aria-checked</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-filter-button-group</code></th>
      <td><code>aria-pressed</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-select</code></th>
      <td><code>aria-selected</code></td>
    </tr>
    <tr>
      <th scope="row">
        <code>mm-menu-item-radio</code>
        <code>mm-menu-item-checkbox</code>
      </th>
      <td><code>aria-checked</code></td>
    </tr>
  `
}

function setupPressedComponentTable() {
  const table = document.querySelector<HTMLElementTagNameMap['mm-table']>(
    'mm-table#pressed-component-table',
  )
  if (!table) return

  table.rows = html`
    <tr>
      <th scope="row"><code>mm-toggle-button</code></th>
      <td>단독</td>
    </tr>
    <tr>
      <th scope="row"><code>mm-follow-button</code></th>
      <td>단독</td>
    </tr>
    <tr>
      <th scope="row"><code>mm-bookmark-button</code></th>
      <td>단독</td>
    </tr>
    <tr>
      <th scope="row"><code>mm-reveal-button</code></th>
      <td>단독</td>
    </tr>
    <tr>
      <th scope="row"><code>mm-toggle-button-group</code></th>
      <td>그룹</td>
    </tr>
    <tr>
      <th scope="row"><code>mm-filter-button-group</code></th>
      <td>그룹</td>
    </tr>
  `
}

function setupCurrentComponentTable() {
  const table = document.querySelector<HTMLElementTagNameMap['mm-table']>(
    'mm-table#current-component-table',
  )
  if (!table) return

  table.rows = html`
    <tr>
      <th scope="row"><code>mm-breadcrumb</code></th>
      <td><code>page</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-pagination</code></th>
      <td><code>page</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-page-button</code></th>
      <td><code>page</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-bottom-bar</code></th>
      <td><code>page</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-app-sidebar</code></th>
      <td><code>page</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-toc</code></th>
      <td><code>true</code></td>
    </tr>
    <tr>
      <th scope="row">theme-selector</th>
      <td><code>true</code></td>
    </tr>
  `
}

function setupExpandedComponentTable() {
  const table = document.querySelector<HTMLElementTagNameMap['mm-table']>(
    'mm-table#expanded-component-table',
  )
  if (!table) return

  table.rows = html`
    <tr>
      <th scope="row"><code>mm-show-more-button</code></th>
      <td>잘린 텍스트</td>
    </tr>
    <tr>
      <th scope="row"><code>mm-read-more-button</code></th>
      <td>잘린 텍스트</td>
    </tr>
    <tr>
      <th scope="row"><code>mm-hamburger-button</code></th>
      <td>내비게이션 메뉴</td>
    </tr>
    <tr>
      <th scope="row"><code>mm-more-button</code></th>
      <td>오버플로 메뉴</td>
    </tr>
    <tr>
      <th scope="row"><code>mm-app-sidebar</code></th>
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
}

function setupHoverTable() {
  const table = document.querySelector<HTMLElementTagNameMap['mm-table']>('mm-table#hover-table')
  if (!table) return

  table.rows = html`
    <tr>
      <th scope="row">
        <code>mm-menu-item</code>
      </th>
      <td>배경 채움</td>
      <td>배경을 가진 행·항목·카드처럼 채울 면이 있을 때.</td>
      <td><code>\${interactiveElement}:hover</code></td>
      <td>
        <code>--menu-item-background-color: var(--interaction-hover-background-color)</code>
      </td>
    </tr>
    <tr>
      <th scope="row">
        <code>mm-table</code>
        <br />
        (reset.css 전역 규칙)
      </th>
      <td>배경 채움</td>
      <td>배경을 가진 행·항목·카드처럼 채울 면이 있을 때.</td>
      <td><code>table tbody tr:hover</code></td>
      <td>
        <code>--table-cell-background-color: var(--interaction-hover-background-color)</code>
      </td>
    </tr>
    <tr>
      <th scope="row"><code>mm-portfolio-item</code></th>
      <td>떠오름</td>
      <td>채울 배경이 없는 떠 있는 표면일 때.</td>
      <td><code>\${interactiveElement}:hover</code></td>
      <td><code>--lift: var(--interaction-hover-lift)</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-foundation-item</code></th>
      <td>떠오름</td>
      <td>채울 배경이 없는 떠 있는 표면일 때.</td>
      <td><code>\${interactiveElement}:hover</code></td>
      <td><code>--lift: var(--interaction-hover-lift)</code></td>
    </tr>
    <tr>
      <th scope="row">
        <code>mm-button</code>
        <br />
        (icon-button·toggle-button·follow-button·hashtag-link 등 파생 포함)
      </th>
      <td>테두리 드러내기</td>
      <td>평소 테두리를 감춰 둔 컨트롤일 때.</td>
      <td><code>\${interactiveElement}:hover</code></td>
      <td><code>border-color: var(--border-color)</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-input</code></th>
      <td>테두리 드러내기</td>
      <td>평소 테두리를 감춰 둔 컨트롤일 때.</td>
      <td><code>:host(:hover)</code></td>
      <td><code>--input-border: var(--border)</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-thumbnail</code></th>
      <td>테두리 드러내기</td>
      <td>평소 테두리를 감춰 둔 컨트롤일 때.</td>
      <td><code>\${interactiveElement}:hover .image-wrapper</code></td>
      <td><code>--thumbnail-border: var(--border)</code></td>
    </tr>
    <tr>
      <th scope="row">커스텀 스크롤바</th>
      <td>기능</td>
      <td></td>
      <td><code>:hover::-webkit-scrollbar-thumb</code></td>
      <td><code>background: var(--background-strong-color)</code></td>
    </tr>
  `
}
