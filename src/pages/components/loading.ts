import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'result.html', label: 'Result' },
  { href: 'step.html', label: 'Step' },
]

const componentProps: ComponentPropItemData[] = [...componentPropsOf('fff-spinner')]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Feedback',
    description:
      '작업이 진행 중이며 시스템이 응답하고 있음을 알립니다. 결과를 기다리는 동안 사용자의 불확실성을 줄입니다.',
  },
]

const exampleCode = `<fff-button variant="primary" disabled>
  <fff-spinner label="저장 중"></fff-spinner>
  저장
</fff-button>
<fff-spinner variant="section" label="불러오는 중"></fff-spinner>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Loading"
      description="작업이 끝나기를 기다리는 동안 보여 주는 진행 표시입니다. 요소 안에서는 아이콘 크기로, 영역 안에서는 레이블과 함께 회전하며 시스템이 응답하고 있음을 알리므로, 사용자는 결과를 기다리는 동안 불확실성 없이 머무를 수 있습니다."
    ></fff-page-header>

    <fff-component-example>
      <fff-button-group>
        <fff-button variant="primary" disabled>
          <fff-spinner label="저장 중"></fff-spinner>
          저장
        </fff-button>
        <fff-button disabled>
          <fff-spinner label="불러오는 중"></fff-spinner>
          불러오기
        </fff-button>
      </fff-button-group>
      <fff-separator variant="section"></fff-separator>
      <fff-spinner variant="section" label="불러오는 중"></fff-spinner>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-section
      heading="ProcessStatus"
      description="진행률을 알 수 없는 작업의 현재 상태를 한 줄로 알립니다. 채울 막대가 없으므로 시도 횟수나 경과 시간처럼 기다릴지 판단할 근거를 글로 줍니다."
    >
      <fff-flex direction="column" gap="3">
        <fff-process-status label="업로드 중" .meta=${['3/12개', '1m 04s']}></fff-process-status>
        <fff-process-status
          variant="warning"
          label="요청 실패"
          .meta=${['재시도 중 (7/10)', '2m 11s']}
        ></fff-process-status>
        <fff-process-status
          variant="success"
          label="동기화 완료"
          .meta=${['12,480건']}
        ></fff-process-status>
        <fff-process-status
          variant="error"
          label="업로드 실패"
          .meta=${['재시도 10회 초과']}
        ></fff-process-status>
      </fff-flex>
    </fff-component-section>

    <fff-component-section
      heading="ProcessStatusList"
      description="여러 단계로 이어지는 작업의 과정을 ProcessStatus로 나열합니다. 지나온 단계는 완료로, 지금 단계는 진행 중으로, 남은 단계는 대기로 표시해 사용자가 어디까지 왔는지 한눈에 가늠합니다."
    >
      <fff-process-status-list>
        <fff-process-status variant="success" label="요청을 확인함"></fff-process-status>
        <fff-process-status variant="success" label="관련 자료를 탐색함"></fff-process-status>
        <fff-process-status label="핵심 구조 정리 중"></fff-process-status>
        <fff-process-status variant="pending" label="답변 문장 다듬기"></fff-process-status>
      </fff-process-status-list>
    </fff-component-section>

    <fff-component-section
      heading="TypingIndicator"
      description="입력 중·응답 대기 등 진행 상태를 알립니다. 채팅 입력 표시에 사용합니다."
    >
      <fff-flex>
        <fff-typing-indicator></fff-typing-indicator>
      </fff-flex>
      <fff-separator></fff-separator>
      <!-- 어두운 버블 위 색상 반전 예시 -->
      <div
        style="
        display: inline-flex;
        padding: var(--space-3) var(--space-4);
        border-radius: var(--border-radius-large);
        background: var(--primary-color);
      "
      >
        <fff-typing-indicator
          style="color: var(--foreground-on-strong-color)"
        ></fff-typing-indicator>
      </div>
    </fff-component-section>
    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
