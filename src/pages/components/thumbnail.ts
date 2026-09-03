import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'avatar.html', label: 'Avatar' },
  { href: 'surface.html', label: 'Surface' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'src', type: 'string' },
  { name: 'alt', type: 'string' },
  { name: 'ratio', type: "'1:1' | '16:9' | '4:3' | 'full' = '16:9'", optional: true },
  { name: 'caption', type: 'string', optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'thumbnail-border-radius', default: 'var(--radius)' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Representative',
    description:
      '콘텐츠 본문 대신 그 성격을 대표하는 미리보기 이미지를 보여줍니다. 무엇에 대한 콘텐츠인지 한눈에 알아볼 수 있어야 합니다. 이미지를 불러오지 못하거나 비어 있어도 빈 상태 배경(thumbnail-color-empty)으로 비율과 형태를 유지하고, alt 텍스트를 반드시 제공합니다.',
  },
]

const main = html`
  <main class="page">
    <mm-page-header
      heading="Thumbnail"
      description="이미지나 미디어를 정해진 비율 안에서 미리 보여줍니다. 콘텐츠의 성격을 빠르게 알아볼 수 있어야 하며, 장식 목적의 반복 사용은 피합니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-grid columns="4" column-min-width="160px" gap="4">
        <mm-flex direction="column" gap="2">
          <mm-paragraph>1:1</mm-paragraph>
          <mm-thumbnail src="/src/images/temp.png" alt="멋진 풍경" ratio="1:1"></mm-thumbnail>
        </mm-flex>
        <mm-flex direction="column" gap="2">
          <mm-paragraph>4:3</mm-paragraph>
          <mm-thumbnail
            src="/src/images/temp.png"
            alt="멋진 풍경"
            ratio="4:3"
            href="/video/1025"
          ></mm-thumbnail>
        </mm-flex>
        <mm-flex direction="column" gap="2">
          <mm-paragraph>16:9</mm-paragraph>
          <mm-thumbnail src="/src/images/temp.png" alt="멋진 풍경" ratio="16:9"></mm-thumbnail>
        </mm-flex>
        <mm-flex direction="column" gap="2">
          <mm-paragraph>full</mm-paragraph>
          <mm-thumbnail src="/src/images/temp.png" alt="멋진 풍경" ratio="full"></mm-thumbnail>
        </mm-flex>
      </mm-grid>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
      <mm-paragraph>TODO 고해상도 디바이스를 위한 이미지 가이드.</mm-paragraph>
    </mm-component-guide>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
