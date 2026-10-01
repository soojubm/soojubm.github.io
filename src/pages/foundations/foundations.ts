import { html, type TemplateResult } from 'lit'

import { ICON_NAMES } from '@/components/common'
import { code, rule, type ComponentReferenceItemData } from '@/components/domains/component'
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
      제한된 선택지가 아니라 자유 형식 값을 받고, 입력 규칙 검증과 오류 표시를 소유한다. 오류는 해당
      필드와 연결한다. 기준은
      <mm-link href="./interaction.html">Interaction</mm-link>
      문서가 정한다.
    `,
  },
  {
    category: 'Interaction',
    heading: 'Feedback',
    description: html`
      사용자 행동이나 시스템 상태의 결과를 알린다. 기준은
      <mm-link href="./interaction.html">Interaction</mm-link>
      문서가 정한다.
    `,
  },
  {
    category: 'Presentation',
    heading: 'Glanceable',
    description: html`
      훑는 것만으로 뜻이 파악되게 한다. 레이블은 짧게 쓰되 줄여 표시하지 않는다. 기준은
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
    heading: 'Statusful',
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
    heading: 'Disclosure',
    description: html`
      부차적인 정보를 접어 두고 필요할 때만 펼친다. 기준은
      <mm-link href="./pattern.html">Pattern</mm-link>
      문서가 정한다.
    `,
  },
  {
    category: 'Presentation',
    heading: 'Modality',
    description: html`
      배경 상호작용 차단 여부로 레이어를 규정한다. 기준은
      <mm-link href="./layout.html?tab=overlay">Layout</mm-link>
      문서가 정한다.
    `,
  },
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
    <div style="height: var(--size-48)"></div>
    <mm-page-header
      centered
      heading="Foundations"
      description="제품 전체가 공유하는 시각 언어의 기반입니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="16">
      <mm-flex justify-content="center">
        <mm-grid columns="2" gap="4" style="width: 100%; max-width: var(--layout-width-small)">
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
        <mm-surface
          variant="filled"
          style="--surface-border-radius: 0; --surface-padding: var(--space-8) 0; --surface-shadow: 0 0 0 100vmax var(--background-subtle-color); clip-path: inset(0 -100vmax)"
        >
          <mm-flex justify-content="center">
            <mm-content-section
              heading-level="3"
              heading="공통 원칙"
              style="width: 100%; max-width: var(--layout-width-small)"
            >
              <mm-text-list
                variant="check"
                .texts=${[
                  rule(
                    '상호작용 가능성은 형태로 드러낸다',
                    html`
                      색·밑줄·표면 같은 단서는 장식이나 일반 강조로 쓰지 않는다. —
                      <mm-link href="./interaction.html">Interaction</mm-link>
                    `,
                  ),
                  rule(
                    '상태는 색상만으로 표현하지 않는다',
                    html`
                      선택·피드백·오류 상태는 아이콘·텍스트·형태·ARIA를 함께 써서 색각 이상이나
                      스크린리더 사용자에게도 전달한다. —
                      <mm-link href="./interaction.html">Interaction</mm-link>
                    `,
                  ),
                  rule(
                    '열기·선택·검증 같은 상호작용 상태는 컴포넌트가 소유한다',
                    html`
                      닫힘 처리도 컴포넌트가 맡고, 트리거는 표준 attribute로 대상을 가리키기만 한다.
                      —
                      <mm-link href="./interaction.html">Interaction</mm-link>
                    `,
                  ),
                  rule(
                    '같은 종류의 항목은 그 계열의 그룹 컴포넌트로 묶는다',
                    html`
                      역할·간격·정렬은 그룹이 소유한다. —
                      <mm-link href="./layout.html?tab=group">Layout</mm-link>
                    `,
                  ),
                  rule(
                    '화면 위로 뜨는 표면은 동작과 표현을 분리한다',
                    html`
                      배경을 막는지, 무엇으로 닫는지, 트리거와 어떻게 이어지는지는
                      ${code('SheetController')}·${code('DisclosureController')} 같은 컨트롤러가
                      맡는다. 패널 재질·너비·${code('placement')}는 각 컴포넌트가 공유 스타일을
                      조합해 정한다. 표면이 달라도 열고 닫는 방식이 같아진다. —
                      <mm-link href="./layout.html?tab=overlay">Layout</mm-link>
                    `,
                  ),
                  rule(
                    '접는 것은 훑어서 고르는 목록에만 쓴다',
                    html`
                      약관·경고·오류처럼 반드시 읽어야 하는 정보는 펼쳐 둔다. —
                      <mm-link href="./pattern.html">Pattern</mm-link>
                    `,
                  ),
                  rule(
                    '하나의 아이콘에는 하나의 의미만 준다',
                    html`
                      뜻은 이름 맵 한 곳에서 정해, 어디서든 같은 기호가 같은 뜻으로 읽힌다. —
                      <mm-link href="./content.html?tab=iconography">Content</mm-link>
                    `,
                  ),
                ]}
              ></mm-text-list>
            </mm-content-section>
          </mm-flex>
        </mm-surface>

        <mm-content-section heading-level="3" heading="Component Level">
          <mm-paragraph>컴포넌트의 레벨에 따라 간격과 그루핑 규칙이 정해집니다.</mm-paragraph>
          <mm-list-item-group>
            <mm-list-item
              icon=${ICON_NAMES.IDLE}
              size="medium"
              label="Element"
              description="단일 UI 유닛."
            ></mm-list-item>
            <mm-list-item
              icon=${ICON_NAMES.GROUP}
              size="medium"
              label="Group"
              description="같은 Element를 묶어 나열한 리스트."
            ></mm-list-item>
            <mm-list-item
              icon=${ICON_NAMES.LIST_VIEW}
              size="medium"
              label="Section"
              description="제목과 본문으로 이루어진 구획."
            ></mm-list-item>
          </mm-list-item-group>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Component Feature">
          <mm-grid columns="4" gap="4">${componentFeatures.map(renderFeatureCard)}</mm-grid>
        </mm-content-section>
        <mm-component-references .items=${references}></mm-component-references>
      </mm-content-section-list>
    </mm-flex>
  </mm-main>
`

renderPage(main)
