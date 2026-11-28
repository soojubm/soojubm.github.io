import { html } from 'lit'

import type {
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { BottomBarItem } from '@/components/layouts/bottom-bar'

import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://m3.material.io/components/navigation-bar/overview',
    label: 'Material Design 3 - Navigation Bar',
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/tab-bars',
    label: 'Apple HIG - Tab Bars',
  },
]

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'top-bar.html', label: 'Top Bar' },
  { href: 'tabs.html', label: 'Tabs' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-bottom-bar'),
  { name: 'change', type: 'CustomEvent detail: index', kind: 'event' },
]

const navItems: BottomBarItem[] = [
  { label: '홈', href: '#', icon: 'home-simple-door', active: true },
  { label: '검색', href: '#', icon: 'search' },
  { label: '설정', href: '#', icon: 'settings' },
]

const exampleCode = `<fff-bottom-bar .items=\${navItems}></fff-bottom-bar>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Bottom Bar"
      description="작은 화면 하단에 고정되는 주요 목적지 내비게이션입니다. 최상위 목적지를 아이콘과 레이블로 나란히 두고 현재 위치를 표시하므로, 사용자는 엄지가 닿는 자리에서 한 번의 탭으로 주요 화면 사이를 오갈 수 있습니다."
    ></fff-page-header>

    <fff-component-example>
      <fff-bottom-bar .items=${navItems}></fff-bottom-bar>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
