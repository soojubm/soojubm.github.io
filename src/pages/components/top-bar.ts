import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'

import { renderLayout } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'bottom-bar.html', label: 'Bottom Bar' },
  { href: 'tabs.html', label: 'Tabs' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'heading', type: 'string' },
  { name: 'nav', type: "'back' | 'close' = 'back'", optional: true },
  { name: "slot='action'", type: 'HTMLElement', optional: true },
  { name: 'nav-click', type: 'CustomEvent', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = []

const main = html`
  <main class="page">
    <mm-page-header
      heading="Top Bar"
      description="화면 상단에서 현재 위치와 주요 내비게이션 액션을 제공합니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-top-bar nav="close" heading="상세 정보"></mm-top-bar>
      <mm-text>기본 뒤로가기 내비게이션을 포함한 상단 바입니다.</mm-text>
      <mm-separator></mm-separator>
      <mm-top-bar heading="컬렉션에 추가">
        <mm-button slot="action" variant="ghost">완료</mm-button>
      </mm-top-bar>
      <mm-text>
        닫기 액션과 보조 액션을 함께 배치할 수 있습니다. 액션 갯수 제한. md에서 최대 3개. hamberger
        case.
      </mm-text>
      <mm-separator></mm-separator>
      <mm-top-bar heading="수줍이님">
        <mm-button-group slot="action">
          <mm-button>저장</mm-button>
          <mm-more-button></mm-more-button>
        </mm-button-group>
      </mm-top-bar>
      <mm-text>닫기 액션과 보조 액션을 함께 배치할 수 있습니다.</mm-text>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
    </mm-component-guide>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main)
})
