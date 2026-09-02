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
            description="포인터가 올라온 요소를 배경으로 강조합니다. 채울 배경이 없는 떠 있는 표면은 대신 살짝 떠오릅니다."
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

      <mm-content-section heading-level="3" heading="Selection">
        <mm-paragraph>
          선택 상태도 색상만으로 전달하지 않고 아이콘·형태·ARIA와 함께 제공합니다. 선택을 아이콘으로
          나타낼 때는 채운 아이콘이 켜짐, 윤곽 아이콘이 꺼짐을 뜻합니다.
        </mm-paragraph>
        <mm-paragraph>
          선택은 값을 남기는 상호작용입니다. 눌러 실행되는 항목이나 보이는 콘텐츠를 바꾸는 탭은
          결과가 화면 변화로 드러나므로 값을 남기지 않습니다.
        </mm-paragraph>
        <mm-paragraph>
          선택 상태는 항목이 아니라 그룹이 소유합니다. 하나를 고르는 그룹은 value로, 여럿을 고르는
          그룹은 values로 상태를 두고 바뀌면 change로 알립니다. 여러 항목이 하나의 값을 이룰 때는
          화살표 키로 항목 사이를 옮기고 Tab은 그룹을 한 번만 지납니다.
        </mm-paragraph>
        <mm-paragraph>
          무엇으로 상태를 표현할지는 역할이 정합니다. 네이티브 요소가 있으면 그 attribute를, 없으면
          역할에 맞는 ARIA attribute를 쓰고 스킨도 같은 selector를 기준으로 둡니다. 생김새가
          비슷해도 다른 역할의 attribute를 빌려 쓰지 않습니다.
        </mm-paragraph>
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
