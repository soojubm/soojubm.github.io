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
          선택 상태도 색상만으로 전달하지 않고 아이콘·형태·ARIA와 함께 제공합니다.
        </mm-paragraph>
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
})
