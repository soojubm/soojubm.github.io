import { html } from 'lit'

import type { BreadcrumbItem } from '@/components/common'
import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'link.html', label: 'Link' },
  { href: 'top-bar.html', label: 'Top Bar' },
]

const componentProps: ComponentPropItemData[] = [...componentPropsOf('mm-breadcrumb')]

const componentFeatures: ComponentFeatureItem[] = []

const breadcrumbItems: BreadcrumbItem[] = [
  { label: '홈', href: '/' },
  { label: '페이지 이름', href: '#' },
  { label: '현재 페이지' },
]

const exampleCode = `<mm-breadcrumb .items=\${breadcrumbItems}></mm-breadcrumb>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Breadcrumb"
      description="현재 페이지에 이르는 상위 경로를 나열하는 내비게이션입니다. 최상위부터 현재 위치까지 계층 순서대로 링크를 이어 보여 주므로, 사용자는 자신이 구조의 어디에 있는지 알고 한 번에 상위 단계로 돌아갈 수 있습니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-breadcrumb .items=${breadcrumbItems}></mm-breadcrumb>
    </mm-component-example>
    <mm-component-code .code=${exampleCode}></mm-component-code>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-breadcrumb']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          '평평한 사이트맵과 모바일에서는 계층이 얕아 쓸 일이 드물다. 대부분 필요하지 않으며, 도움말이나 상품 카테고리처럼 계층이 깊은 곳과 페이지 제목이 길어지는 곳에서 제한적으로 쓴다.',
          '브레드크럼에서 드롭다운으로 페이지 구조를 표현하여 사이트맵의 역할로 확대하지 마세요. 사용자는 브레드크럼을 통해 현재 위치를 파악하고 이전 수준의 페이지로 쉽게 돌아갈 수 있어야 합니다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
