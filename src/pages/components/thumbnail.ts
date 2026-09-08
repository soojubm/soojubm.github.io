import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderLayout } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'avatar.html', label: 'Avatar' },
  { href: 'surface.html', label: 'Surface' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'src', type: 'string' },
  { name: 'alt', type: 'string' },
  { name: 'ratio', type: "'1:1' | '16:9' | '4:3' | 'full' = '16:9'", optional: true },
  { name: 'caption', type: 'string', optional: true },
  { name: 'href', type: 'string', optional: true },
  { name: 'loading', type: "'eager' | 'lazy' = 'lazy'", optional: true },
  { name: 'fetchpriority', type: "'high' | 'low' | 'auto' = 'auto'", optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'thumbnail-border', default: 'var(--border-transparent)' },
  { name: 'thumbnail-border-radius', default: 'var(--radius)' },
  { name: 'thumbnail-background-color-empty', default: 'var(--background-subtle-color)' },
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

    <mm-component-anatomy
      style="--component-anatomy-stage-width: 320px"
      .code=${'<mm-thumbnail src="/src/images/temp.png" alt="멋진 풍경" ratio="16:9"></mm-thumbnail>'}
    >
      <mm-thumbnail src="/src/images/temp.png" alt="멋진 풍경" ratio="16:9"></mm-thumbnail>
    </mm-component-anatomy>

    <mm-component-section
      heading="Caption"
      description="이미지 아래에 짧은 설명을 덧붙입니다. 출처나 촬영 정보처럼 이미지를 보조하는 내용만 담고, 본문으로 읽을 텍스트는 담지 않습니다."
    >
      <mm-thumbnail
        src="/src/images/temp.png"
        alt="노을 지는 협재 해변"
        ratio="16:9"
        caption="제주 협재 해변, 2024년 봄"
        style="max-width: 360px"
      ></mm-thumbnail>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main)
})
