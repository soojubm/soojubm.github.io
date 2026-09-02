import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderLayout } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'tabs.html', label: 'Tabs' },
  { href: 'menu-item.html', label: 'menuItem' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
    label: 'WAI-ARIA Accordion Pattern',
    external: true,
  },
  { href: 'https://nuli.navercorp.com/community/article/1132889', label: 'nuli', external: true },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'mm-accordion', type: 'group container', optional: true },
  { name: 'exclusive', type: 'boolean = false' },
  { name: 'mm-accordion-item', type: 'individual item', optional: true },
  { name: 'summary', type: 'string' },
  { name: 'open', type: 'boolean = false' },
  { name: 'slot: summary', type: 'HTMLElement (trigger)', optional: true },
  { name: 'slot: default', type: 'HTMLElement (panel content)', optional: true },
  { name: 'event: accordion-toggle', type: 'CustomEvent { open: boolean }', optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'accordion-padding', default: 'var(--space-4) var(--space-2)' },
  { name: 'accordion-background-color', default: 'var(--background-subtle-color)' },
  { name: 'accordion-border', default: 'var(--border-transparent)' },
  { name: 'accordion-border-radius', default: 'var(--radius)' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Disclosure (점진적 공개)',
    description:
      '항목의 상세를 접어 두고 선택적으로 펼쳐 읽게 합니다. 같은 흐름 안의 부가 공개이며(tooltip·본문 접기와 같은 축), 독립된 작업 레이어로 전환하는 sheet 패턴과는 구별됩니다. 반드시 읽어야 하는 정보(약관·경고)는 접지 않습니다.',
  },
  { heading: 'TODO', description: 'TODO' },
  { heading: 'TODO', description: 'TODO' },
]

const main = html`
  <main class="page">
    <mm-page-header
      heading="Accordion"
      description="콘텐츠를 펼치거나 접어 필요한 정보만 선택적으로 볼 수 있게 합니다. 반드시 숙지해야 할 중요 정보에는 사용하지 않아야 합니다."
    ></mm-page-header>

    <mm-component-aka
      items='["Disclosure", "Expand / Collapse", "Details / Summary"]'
    ></mm-component-aka>

    <mm-component-example>
      <mm-accordion exclusive>
        <mm-accordion-item summary="서비스를 탈퇴하고 싶어요." open>
          <mm-paragraph>
            마이페이지 → 계정 설정 → 회원 탈퇴 순서로 진행하시면 됩니다. 탈퇴 후 30일간 데이터가
            보관되며 이후 완전히 삭제됩니다.
          </mm-paragraph>
        </mm-accordion-item>
        <mm-accordion-item summary="결제 영수증은 어디서 확인하나요?">
          <mm-paragraph>
            마이페이지 → 결제 내역에서 영수증을 확인하고 다운로드할 수 있습니다.
          </mm-paragraph>
        </mm-accordion-item>
      </mm-accordion>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
      <mm-paragraph-group>
        <mm-heading level="3">언제 사용하나요</mm-heading>
        <mm-paragraph>
          FAQ·커리큘럼·필터처럼 항목이 많고 사용자가 선택적으로 읽는 콘텐츠에 적합합니다. 모든
          내용을 한 번에 읽어야 하는 경우에는 펼쳐진 상태로 표시하는 것이 낫습니다.
        </mm-paragraph>
      </mm-paragraph-group>
      <mm-text-list
        texts='[
          "트리거 텍스트(summary)는 한 문장으로 간결하게 작성하세요.",
          "exclusive 모드는 FAQ처럼 하나씩 확인하는 패턴에 사용하고, 여러 항목을 동시에 비교해야 할 때는 끄세요.",
          "패널 안에 링크·버튼 등 인터랙션이 있을 경우, 패널 클릭으로 닫히는 동작을 추가하지 마세요."
        ]'
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main)
})
