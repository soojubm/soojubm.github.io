import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { BottomBarItem } from '@/components/layouts/bottom-bar'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'top-bar.html', label: 'Top Bar' },
  { href: 'tabs.html', label: 'Tabs' },
]

const componentProps: ComponentPropItemData[] = [
  {
    name: 'items',
    type: '{ label: string; href?: string; icon?: IconName; active?: boolean }[] (JSON)',
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
  <mm-page>
    <mm-page-header
      heading="Bottom Bar"
      description="작은 화면 하단에서 주요 목적지 사이를 이동하는 내비게이션입니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-bottom-bar .items=${navItems}></mm-bottom-bar>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
    </mm-component-guide>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </mm-page>
`

renderPage(main)
