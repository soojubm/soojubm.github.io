import '@/components/common/table'
import { html } from 'lit'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

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
          의 <code>pause-on-hover</code>는 상태 표현이 아니라 포인터가 있는 동안만 애니메이션을
          멈추는 기능이라 위 표에 포함하지 않습니다.
        </mm-paragraph>
      </mm-content-section>
      <mm-content-section heading-level="3" heading="Selection">
        <mm-paragraph>
          선택은 값을 남기는 상호작용으로, 색상 외의 단서와 그룹 단위 소유·표현 규칙을 함께
          따릅니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          texts='[
            "색상만이 아니라 아이콘·형태·ARIA로 함께 전달하고, 아이콘은 채우면 켜짐·윤곽이면 꺼짐을 뜻한다.",
            "눌러 실행되는 항목이나 화면을 바꾸는 탭처럼 결과가 화면 변화로 드러나는 상호작용은 값을 남기지 않는다.",
            "선택 상태는 항목이 아니라 그룹이 소유하며, 하나를 고르면 value·여럿을 고르면 values로 두고 바뀌면 change로 알린다. 하나의 값을 이루는 항목 사이는 화살표 키로 옮기고 Tab은 그룹을 한 번만 지난다.",
            "네이티브 요소가 있으면 그 attribute를, 없으면 역할에 맞는 ARIA attribute를 쓰고 스킨도 같은 selector를 기준으로 두며, 생김새가 비슷해도 다른 역할의 attribute를 빌려 쓰지 않는다."
          ]'
        ></mm-text-list>
        <mm-table
          id="selection-component-table"
          caption="선택 컴포넌트의 용도와 상태 attribute"
          columns='[
            {"label": "컴포넌트", "width": "260px"},
            {"label": "언제 쓰나"},
            {"label": "상태", "width": "140px"}
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
    </mm-content-section-list>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
  setupSelectionComponentTable()
  setupHoverTable()
})

function setupSelectionComponentTable() {
  const table = document.querySelector<HTMLElementTagNameMap['mm-table']>(
    'mm-table#selection-component-table',
  )
  if (!table) return

  table.rows = html`
    <tr>
      <th scope="row"><code>mm-checkbox-group</code></th>
      <td>선택지를 모두 펼쳐 두고 여럿을 독립적으로 켤 때.</td>
      <td><code>checked</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-radio-group</code></th>
      <td>선택지를 나란히 견주며 하나만 고를 때.</td>
      <td><code>checked</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-switch</code></th>
      <td>저장 없이 즉시 반영되는 켜짐·꺼짐일 때.</td>
      <td><code>aria-checked</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-filter-button-group</code></th>
      <td>보고 있는 목록을 좁히는 조건을 바로 적용할 때.</td>
      <td><code>aria-pressed</code></td>
    </tr>
    <tr>
      <th scope="row"><code>mm-select</code></th>
      <td>선택지가 많아 접어 두고 고른 값만 트리거에 남길 때.</td>
      <td><code>aria-selected</code></td>
    </tr>
    <tr>
      <th scope="row">
        <code>mm-menu-item-radio</code>
        <code>mm-menu-item-checkbox</code>
      </th>
      <td>메뉴 안에서 실행 항목과 함께 상태를 유지할 때.</td>
      <td><code>aria-checked</code></td>
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
        <code>--table-cell-background: var(--interaction-hover-background-color)</code>
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
      <td><code>border-color: var(--background-strong-color)</code></td>
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
