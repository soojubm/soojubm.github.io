import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { BottomBarItem } from '@/components/layouts/bottom-bar'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'top-bar.html', label: 'Top Bar' },
  { href: 'tabs.html', label: 'Tabs' },
]

const componentProps: ComponentPropItemData[] = [
  {
    name: 'items',
    type: '{ label: string; href?: string; icon?: IconName; active?: boolean }[]',
    optional: true,
  },
  { name: 'aria-label', type: "string = '하단 내비게이션'", optional: true },
  { name: 'change', type: 'CustomEvent detail: index', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = []

const navItems: BottomBarItem[] = [
  { label: '홈', href: '#', icon: 'home-simple-door', active: true },
  { label: '검색', href: '#', icon: 'search' },
  { label: '설정', href: '#', icon: 'settings' },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Bottom Bar"
      description="작은 화면 하단에 고정되는 주요 목적지 내비게이션입니다. 최상위 목적지를 아이콘과 레이블로 나란히 두고 현재 위치를 표시하므로, 사용자는 엄지가 닿는 자리에서 한 번의 탭으로 주요 화면 사이를 오갈 수 있습니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-bottom-bar .items=${navItems}></mm-bottom-bar>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          'TODO: 좁은 화면에서 전역 내비게이션을 바텀바 한 곳에 모을지 검토. 바텀바에는 자주 가는 최상위 목적지를, 마지막 칸에는 전체메뉴(사이드바)를 두고 상단 햄버거를 숨기는 안. 지금은 햄버거가 전체메뉴를 연다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-bottom-bar
    .items=\${[
        { label: '홈', href: '#', icon: 'home-simple-door', active: true },
        { label: '검색', href: '#', icon: 'search' },
        { label: '설정', href: '#', icon: 'settings' },
    ]}
></mm-bottom-bar>`}
    ></mm-component-anatomy>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
