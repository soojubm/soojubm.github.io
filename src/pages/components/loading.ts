import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'result.html', label: 'Result' },
  { href: 'step.html', label: 'Step' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'size', type: "'small' | 'medium' | 'large' = 'medium'" },
  { name: 'label', type: "string = '로딩 중'" },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Feedback',
    description:
      '작업이 진행 중이며 시스템이 응답하고 있음을 알립니다. 결과를 기다리는 동안 사용자의 불확실성을 줄입니다.',
  },
]

const main = html`
  <mm-page>
    <mm-page-header
      heading="Loading"
      description="비동기 작업의 진행 중 상태를 나타냅니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-flex>
        <mm-spinner size="small"></mm-spinner>
        <mm-spinner size="medium" label="저장 중..."></mm-spinner>
        <mm-spinner size="large" label="불러오는 중..."></mm-spinner>
      </mm-flex>
      <mm-separator></mm-separator>
      <mm-spinner>
        <mm-paragraph>커스텀 슬롯 레이블</mm-paragraph>
      </mm-spinner>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-anatomy
      .code=${'<mm-spinner size="large" label="불러오는 중..."></mm-spinner>'}
    ></mm-component-anatomy>

    <mm-component-section
      heading="TypingIndicator"
      description="입력 중·응답 대기 등 진행 상태를 나타내는 3-dot 모션입니다. 채팅 입력 표시에 사용합니다."
    >
      <mm-flex>
        <mm-typing-indicator></mm-typing-indicator>
      </mm-flex>
      <mm-separator></mm-separator>
      <!-- 어두운 버블 위 색상 반전 예시 -->
      <div
        style="
        display: inline-flex;
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-large);
        background: var(--primary-color);
      "
      >
        <mm-typing-indicator style="color: var(--foreground-on-strong-color)"></mm-typing-indicator>
      </div>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </mm-page>
`

renderPage(main)
