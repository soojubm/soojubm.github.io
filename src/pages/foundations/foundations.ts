import { html, type TemplateResult } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component'

import { renderPage } from '@/components/layouts/base-layouts'
import { SITEMAP } from '@/sitemap'

const FOUNDATION_DESCRIPTIONS: Record<string, string> = {
  layout: '페이지·섹션·오버레이가 놓이는 골격과 층위를 정합니다.',
  interaction: '요소가 반응하는 상태와 선택지를 고르는 방식을 정합니다.',
  pattern: '여러 컴포넌트가 이어지는 펼침·검색·모음 흐름을 정합니다.',
  content: '텍스트의 이름과 어조, 아이콘의 뜻을 정합니다.',
  conventions: '코드와 문서를 쓰는 방식을 정합니다.',
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

type FeatureCategory = 'Interaction' | 'Presentation'

type ComponentFeature = {
  category: FeatureCategory
  heading: string
  description: string | TemplateResult
}

const FEATURE_TAG_TONES = { Interaction: 'blue', Presentation: 'purple' } as const

const componentFeatures: ComponentFeature[] = [
  {
    category: 'Interaction',
    heading: 'Interactive - action',
    description:
      '누르면 이동하거나 실행되는 최종 상호작용. 결과는 페이지 이동·정보 구조 변화로도 드러나므로 중복해서 알리지 않는다.',
  },
  {
    category: 'Interaction',
    heading: 'Interactive - selection',
    description: html`
      선택 여부를 상태로 유지한다. 기준은
      <mm-link href="./interaction.html?tab=selection">Selection</mm-link>
      문서가 정한다.
    `,
  },
  {
    category: 'Interaction',
    heading: 'Interactive - input',
    description: html`
      제한된 선택지가 아니라 자유 형식 값을 받고, 입력 규칙 검증과 오류 표시를 함께 제공한다. 오류는
      해당 필드와 연결한다. 기준은
      <mm-link href="./interaction.html">Interaction</mm-link>
      문서가 정한다.
    `,
  },
  {
    category: 'Interaction',
    heading: 'Feedback',
    description: '사용자 행동이나 시스템 상태의 결과를 알린다.',
  },
  {
    category: 'Presentation',
    heading: 'Glanceable',
    description: html`
      훑는 것만으로 뜻이 파악되게 한다. 기준은
      <mm-link href="./content.html">Content</mm-link>
      문서가 정한다.
    `,
  },
  {
    category: 'Presentation',
    heading: 'Representative',
    description:
      '사용자·브랜드·객체를 대표하는 시각 정보. 원본이 없거나 실패해도 대체 표현과 대체 텍스트로 형태와 정체성을 유지한다.',
  },
  {
    category: 'Presentation',
    heading: 'Stateful',
    description: html`
      의미 상태를 톤으로 구분하고 아이콘·텍스트를 함께 준다. 기준은
      <mm-link href="./interaction.html">Interaction</mm-link>
      문서가 정한다.
    `,
  },
  {
    category: 'Presentation',
    heading: 'Structural',
    description: '상호작용 없이 반복되는 구조와 경계를 잡는다.',
  },
  {
    category: 'Presentation',
    heading: 'Contextual',
    description: '상호작용 맥락이나 기준 요소에 따라 표현 방식 또는 동작이 결정되는 컴포넌트 특성',
  },
  // dsclosure와 modalty 는 특정 패턴에 가까워서 제외하는 게 낫다. 패턴 문서에서 다루는 게 더 적절하다.
  // {
  //   category: 'Presentation',
  //   heading: 'Disclosure',
  //   description: html`
  //     부차적인 정보를 접어 두고 필요할 때만 펼친다. 기준은
  //     <mm-link href="./pattern.html">Pattern</mm-link>
  //     문서가 정한다.
  //   `,
  // },
  // {
  //   category: 'Presentation',
  //   heading: 'Modality',
  //   description: html`
  //     배경 상호작용 차단 여부로 레이어를 규정한다. 기준은
  //     <mm-link href="./layout.html?tab=overlay">Layout</mm-link>
  //     문서가 정한다.
  //   `,
  // },
]

const renderFeatureCard = ({ category, heading, description }: ComponentFeature) => html`
  <mm-surface>
    <mm-flex direction="column" gap="2" align-items="flex-start">
      <mm-tag tone=${FEATURE_TAG_TONES[category]}>${category}</mm-tag>
      <mm-text-block level="4" heading=${heading}>
        <mm-text size="14">${description}</mm-text>
      </mm-text-block>
    </mm-flex>
  </mm-surface>
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
          <mm-grid columns="4" gap="4">${componentFeatures.map(renderFeatureCard)}</mm-grid>
        </mm-content-section>
        <mm-component-references .items=${references}></mm-component-references>
      </mm-content-section-list>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
