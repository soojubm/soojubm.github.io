import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'dialog.html', label: 'Dialog' },
  { href: 'result.html', label: 'Result' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'role', type: "'alert' | 'note' | 'status' = 'note'", optional: true },
  { name: 'heading', type: 'string', optional: true },
  { name: 'description', type: 'string', optional: true },
  { name: 'variant', type: "'success' | 'warning' | 'danger'", optional: true },
  { name: 'dismiss', type: 'CustomEvent', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'notice-padding' },
  { name: 'notice-border-radius' },
  { name: 'notice-border-width' },
  { name: 'notice-text-color' },
  { name: 'notice-background-color' },
  { name: 'notice-border-color' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Statusful',
    description:
      '성공·경고·오류·정보 등 의미 상태를 variant 톤으로 전달합니다. 색상만으로 의미를 전달하지 않고 아이콘·텍스트를 함께 제공합니다.',
  },
]

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Notice"
        description="콘텐츠 흐름 안에 자리 잡고 상태를 알리는 인라인 메시지입니다. 관련 내용 곁에 머무르며 성공·경고·오류 같은 의미를 색상·아이콘·문구로 함께 전달하므로, 사용자는 하던 일을 멈추지 않고 주의할 점을 확인한 뒤 작업을 이어갈 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-component-aka
      .items=${['Alert', 'Callout', 'Banner', 'Inline message', 'Feedback']}
    ></mm-component-aka>

    <mm-component-example>
      <mm-flex direction="column" gap="2">
        <mm-notice
          heading="헤딩"
          description="배너. 히어로와 콜아웃의 차이."
          @dismiss=${() => {}}
        ></mm-notice>

        <mm-notice variant="success" description="좋아요 표시한 동영상에 추가됨"></mm-notice>
        <mm-notice
          variant="warning"
          description="바시니의 작품은 페라라 부르주아사회의 유대인 박해라는 깊은 상처에 기인한다는 점에서 정치적이다."
        ></mm-notice>
        <mm-notice variant="danger" description="인터넷에 연결되어 있지 않습니다."></mm-notice>
      </mm-flex>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          'role="alert" 속성이 있는 요소는 브라우저가 즉시 사용자에게 읽습니다. 긴급도가 낮은 알림에는 role="status"를 사용하세요.',
          '시스템 오류로 실패하면 단순 "오류" 대신 무엇이 잘못됐는지 명확히 설명해, 사용자가 입력을 고칠지 다시 시도할지 알 수 있게 합니다.',
          '닫기 버튼은 dismiss 이벤트를 구독할 때만 나타납니다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-notice
    variant="warning"
    heading="구독이 곧 만료됩니다."
    description="결제 수단을 확인해 주세요."
    @dismiss=\${handleDismiss}
></mm-notice>`}
    ></mm-component-anatomy>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
