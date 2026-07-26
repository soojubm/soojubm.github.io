import { html } from 'lit'

import type { BreadcrumbItem } from '@/components/breadcrumb/breadcrumb'
import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderDocumentLayout } from '../../../layouts/document-layout'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'link.html', label: 'Link' },
  { href: 'top-bar.html', label: 'Top Bar' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'items', type: '{ label: string; href?: string }[] (JSON)' },
  { name: 'divider', type: "string = '/'", optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'breadcrumb-item-text-color', default: 'var(--color-primary)' },
  { name: 'breadcrumb-item-text-color-current', default: 'var(--foreground-color)' },
  { name: 'breadcrumb-divider-text-color', default: 'var(--border-color)' },
  { name: 'breadcrumb-divider-space', default: 'var(--space-3)' },
]

const componentFeatures: ComponentFeatureItem[] = [
  { heading: 'TODO', description: 'TODO' },
  { heading: 'TODO', description: 'TODO' },
  { heading: 'TODO', description: 'TODO' },
]

const breadcrumbItems: BreadcrumbItem[] = [
  { label: '홈', href: '/' },
  { label: '페이지 이름', href: '#' },
  { label: '현재 페이지' },
]

const main = html`
  <main class="page">
    <mm-page-header
      heading="Breadcrumb"
      description="사용자의 현재 위치를 계층 구조로 보여줍니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-breadcrumb .items=${breadcrumbItems}></mm-breadcrumb>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
      <mm-text-list
        texts='[
        "flat sitemap 또는 모바일에서의 레이어 구조 때문에 사용빈도가 낮아짐. 네비게이션 바. 대부분의 경우 불필요하다. 도움말, 상품 카테고리 구조에서 제한적으로 사용? (foundation. flat sitemap. 페이지 댑스의 제한). 페이지 제목이 길어지는 케이스.",
        "PG 심사 시 카테고리 표현을 위해 요구했던 경험.  프로모션용 랜딩 페이지. 푸터에서 사이트맵과 함께 사용",
        "브레드크럼에서 드롭다운으로 페이지 구조를 표현하여 사이트맵의 역할로 확대하지 마세요. 사용자는 브레드크럼을 통해 현재 위치를 파악하고 이전 수준의 페이지로 쉽게 돌아갈 수 있어야 합니다."
      ]'
      ></mm-text-list>
    </mm-component-guide>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
