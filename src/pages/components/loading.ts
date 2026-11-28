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
      '작업이 진행 중이며 시스템이 응답하고 있음을 보여 줍니다. 결과를 기다리는 동안 사용자의 불확실성을 줄입니다.',
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
      <fff-separator level="section"></fff-separator>
      <fff-spinner variant="section" label="불러오는 중"></fff-spinner>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-section
      heading="ProcessStatus"
      description="진행률을 알 수 없는 작업의 상태를 항목마다 한 줄로 나열합니다. 채울 막대가 없으므로 경과 시간처럼 기다릴지 판단할 근거를 글로 주고, 여러 단계가 이어지면 지나온 단계·지금 단계·남은 단계를 한 목록에 두어 어디까지 왔는지 가늠하게 합니다."
    >
      <fff-process-status
        .items=${[
          { label: '업로드 중', time: '1m 04s' },
          { variant: 'success', label: '동기화 완료', time: '3m 20s' },
          { variant: 'error', label: '업로드 실패' },
        ]}
      ></fff-process-status>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
