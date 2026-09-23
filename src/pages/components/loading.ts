import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'result.html', label: 'Result' },
  { href: 'step.html', label: 'Step' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'variant', type: "'element' | 'section' = 'element'" },
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
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Loading"
        description="작업이 끝나기를 기다리는 동안 보여 주는 진행 표시입니다. 요소 안에서는 아이콘 크기로, 영역 안에서는 레이블과 함께 회전하며 시스템이 응답하고 있음을 알리므로, 사용자는 결과를 기다리는 동안 불확실성 없이 머무를 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-component-example>
      <mm-button-group>
        <mm-button variant="primary" disabled>
          <mm-spinner label="저장 중"></mm-spinner>
          저장
        </mm-button>
        <mm-button disabled>
          <mm-spinner label="불러오는 중"></mm-spinner>
          불러오기
        </mm-button>
      </mm-button-group>
      <mm-separator variant="section"></mm-separator>
      <mm-spinner variant="section" label="불러오는 중"></mm-spinner>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-anatomy
      .code=${'<mm-spinner variant="section" label="불러오는 중"></mm-spinner>'}
    ></mm-component-anatomy>

    <mm-component-section
      heading="TaskStatus"
      description="진행률을 알 수 없는 작업의 현재 상태를 한 줄로 알립니다. 채울 막대가 없으므로 시도 횟수나 경과 시간처럼 기다릴지 판단할 근거를 글로 주고, 값이 바뀌면 스스로 갱신합니다."
    >
      <mm-flex direction="column" gap="3">
        <mm-task-status label="업로드 중" .meta=${['3/12개', '1m 04s']}></mm-task-status>
        <mm-task-status
          variant="warning"
          label="요청 실패"
          .meta=${['재시도 중 (7/10)', '2m 11s']}
        ></mm-task-status>
        <mm-task-status
          variant="success"
          label="동기화 완료"
          .meta=${['12,480건']}
        ></mm-task-status>
        <mm-task-status
          variant="error"
          label="업로드 실패"
          .meta=${['재시도 10회 초과']}
        ></mm-task-status>
      </mm-flex>
    </mm-component-section>

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

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
