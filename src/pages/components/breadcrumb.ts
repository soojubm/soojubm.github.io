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

const componentProps: ComponentPropItemData[] = [...componentPropsOf('fff-breadcrumb')]

const componentFeatures: ComponentFeatureItem[] = []

const breadcrumbItems: BreadcrumbItem[] = [
  { label: '홈', href: '/' },
  { label: '페이지 이름', href: '#' },
  { label: '현재 페이지' },
]

const exampleCode = `<fff-breadcrumb .items=\${breadcrumbItems}></fff-breadcrumb>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Breadcrumb"
      description="현재 페이지에 이르는 상위 경로를 나열하는 내비게이션입니다. 최상위부터 현재 위치까지 계층 순서대로 링크를 이어 보여 주므로, 사용자는 자신이 구조의 어디에 있는지 알고 한 번에 상위 단계로 돌아갈 수 있습니다."
    ></fff-page-header>

    <fff-component-example>
      <fff-breadcrumb .items=${breadcrumbItems}></fff-breadcrumb>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-breadcrumb']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-text-list
        .texts=${[
          '평평한 사이트맵과 모바일에서는 계층이 얕아 쓸 일이 드물다. 대부분 필요하지 않으며, 도움말이나 상품 카테고리처럼 계층이 깊은 곳과 페이지 제목이 길어지는 곳에서 제한적으로 쓴다.',
          '브레드크럼은 현재 위치를 파악하고 이전 수준의 페이지로 돌아가는 정도의 역할만 맡는다. 드롭다운으로 페이지 구조를 펼치면 사이트맵 역할이 되어, 사용자가 위치를 확인하려다 이동할 곳을 고르는 일까지 떠안는다.',
        ]}
      ></fff-text-list>
    </fff-component-guide>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
