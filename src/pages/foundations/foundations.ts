import { html } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component'

import { renderPage } from '@/components/layouts/base-layouts'
import { SITEMAP } from '@/sitemap'

const FOUNDATION_DESCRIPTIONS: Record<string, string> = {
  layout: '페이지·섹션·오버레이가 놓이는 골격과 층위를 정합니다.',
  interaction: '요소가 반응하는 상태와 선택지를 고르는 방식을 정합니다.',
  pattern: '여러 컴포넌트가 이어지는 펼침·검색·모음 흐름을 정합니다.',
  content: '텍스트의 이름과 어조, 아이콘의 뜻을 정합니다.',
}

// 사이드바와 같은 목록에서 만들어, 축을 추가하거나 옮겨도 카드가 빠지지 않는다.
const foundationsNode = SITEMAP.find(node => node.id === 'foundations')
const foundationItems = (
  foundationsNode?.type === 'standalone' ? foundationsNode.children ?? [] : []
).filter(item => item.id !== 'foundations')

// 축 순서(Layout → Interaction → Pattern)대로 묶고, 묶음 사이는 구분선이 나눈다.
const references: ComponentReferenceItemData[][] = [
  [
    {
      href: 'https://ix.siemens.io/docs/components/card-list/guide',
      label: 'Siemens iX - Card list',
    },
  ],
  [
    {
      href: 'https://m3.material.io/foundations/interaction/states/state-layers',
      label: 'MD3 - State Layers',
    },
    {
      href: 'https://spectrum.adobe.com/page/states/',
      label: 'Adobe Spectrum - States',
    },
    {
      href: 'https://m3.material.io/foundations/interaction/selection',
      label: 'MD3 - Selection',
    },
    {
      href: 'https://designsystem.maersk.com/guidelines/selection-components/',
      label: 'Maersk - Selection components',
    },
    {
      href: 'https://design.basis.com/patterns/selection-ui',
      label: 'Basis - Selection UI',
    },
  ],
  [
    {
      href: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
      label: 'WAI-ARIA APG - Accordion Pattern',
    },
    {
      href: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/',
      label: 'WAI-ARIA APG - Disclosure Pattern',
    },
    {
      href: 'https://nuli.navercorp.com/community/article/1132889',
      label: 'NULI - Web Accessibility',
    },
    {
      href: 'https://developer.apple.com/documentation/uikit/uisearchbar',
      label: 'Apple Developer - UISearchBar',
    },
    {
      href: 'https://material.io/design/navigation/search.html',
      label: 'Material Design - Search',
    },
    {
      href: 'https://developer.android.com/reference/android/widget/SearchView',
      label: 'Android - SearchView',
    },
  ],
]

type ComponentFeature = {
  tone: 'blue' | 'purple'
  name: string
}

// Interaction은 blue, Presentation은 purple 톤으로 묶음을 구분한다.
const componentFeatures: ComponentFeature[] = [
  { tone: 'blue', name: 'Interactive - action' },
  { tone: 'blue', name: 'Interactive - selection' },
  { tone: 'blue', name: 'Interactive - input' },
  { tone: 'blue', name: 'Feedback' },
  { tone: 'purple', name: 'Glanceable' },
  { tone: 'purple', name: 'Representative' },
  { tone: 'purple', name: 'Stateful' },
  { tone: 'purple', name: 'Structural' },
  { tone: 'purple', name: 'Contextual' },
]

const renderFeatureTag = ({ tone, name }: ComponentFeature) => html`
  <mm-code-tag tone=${tone}>${name}</mm-code-tag>
`

const main = html`
  <mm-main>
    <mm-page-header
      centered
      heading="Foundations"
      description="제품 전체가 공유하는 시각 언어의 기반입니다. 배치·상호작용·패턴·콘텐츠를 한 곳에서 정하므로, 사용자는 어느 화면에서든 같은 방식으로 제품을 읽고 다룹니다."
    ></mm-page-header>

    <mm-page-body>
      <mm-flex justify-content="center">
        <mm-grid columns="2" gap="4" style="max-width: var(--layout-width-small)">
          ${foundationItems.map(
            ({ id, name }) => html`
              <mm-foundation-item
                href="./${id}.html"
                heading=${name}
                description=${FOUNDATION_DESCRIPTIONS[id]}
              ></mm-foundation-item>
            `,
          )}
        </mm-grid>
      </mm-flex>

      <mm-content-section-list>
        <mm-content-section heading-level="3" heading="Component Feature">
          <mm-flex gap="2" wrap="wrap">${componentFeatures.map(renderFeatureTag)}</mm-flex>
        </mm-content-section>
        <mm-component-references .items=${references}></mm-component-references>
      </mm-content-section-list>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
