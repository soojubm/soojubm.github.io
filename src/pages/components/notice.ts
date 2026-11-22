import { html } from 'lit'

import type {
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { ActionConfig } from '@/types'

import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'dialog.html', label: 'Dialog' },
  { href: 'result.html', label: 'Result' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('mm-notice'),
  { name: 'dismiss', type: 'CustomEvent', kind: 'event' },
]

const primaryAction: ActionConfig = { label: '갱신하기', onClick: () => {} }
const secondaryAction: ActionConfig = { label: '나중에', onClick: () => {} }

const variantCode = `<mm-notice variant="info" description="새 기능이 추가되었습니다."></mm-notice>
<mm-notice variant="warning" description="바시니의 작품은 페라라 부르주아사회의 유대인 박해라는 깊은 상처에 기인한다는 점에서 정치적이다."></mm-notice>
<mm-notice variant="error" description="인터넷에 연결되어 있지 않습니다."></mm-notice>`

const headingCode = `<mm-notice variant="info" heading="헤딩" description="TODO 배너. 히어로와 콜아웃의 차이."></mm-notice>`

const actionCode = `<mm-notice
  variant="warning"
  heading="구독이 곧 만료됩니다."
  description="결제 수단을 확인해 주세요."
  .primaryAction=\${primaryAction}
  .secondaryAction=\${secondaryAction}
  @dismiss=\${handleDismiss}
></mm-notice>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Notice"
      description="콘텐츠 흐름 안에 자리 잡고 상태를 알리는 인라인 메시지입니다. 관련 내용 곁에 머무르며 성공·경고·오류 같은 의미를 색상·아이콘·문구로 함께 전달하므로, 사용자는 하던 일을 멈추지 않고 주의할 점을 확인한 뒤 작업을 이어갈 수 있습니다."
    ></mm-page-header>

    <mm-component-aka
      .items=${['Alert', 'Callout', 'Banner', 'Inline message', 'Feedback']}
    ></mm-component-aka>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="variant" variant="pill">
        <mm-tab value="variant">Variant</mm-tab>
        <mm-tab value="heading">Heading</mm-tab>
        <mm-tab value="action">Action</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="variant">
        <mm-component-example>
          <mm-flex direction="column" gap="2">
            <mm-notice variant="info" description="새 기능이 추가되었습니다."></mm-notice>
            <mm-notice
              variant="warning"
              description="바시니의 작품은 페라라 부르주아사회의 유대인 박해라는 깊은 상처에 기인한다는 점에서 정치적이다."
            ></mm-notice>
            <mm-notice variant="error" description="인터넷에 연결되어 있지 않습니다."></mm-notice>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${variantCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="heading">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-notice
              variant="info"
              heading="헤딩"
              description="TODO 배너. 히어로와 콜아웃의 차이."
            ></mm-notice>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${headingCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="action">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="2">
              <mm-notice
                variant="warning"
                heading="구독이 곧 만료됩니다."
                description="결제 수단을 확인해 주세요."
                .primaryAction=${primaryAction}
                .secondaryAction=${secondaryAction}
                @dismiss=${() => {}}
              ></mm-notice>
              <mm-notice
                variant="info"
                description="새 기능이 추가되었습니다."
                @dismiss=${() => {}}
              ></mm-notice>
            </mm-flex>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${actionCode}></mm-component-code>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-notice']}></mm-component-tokens>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
