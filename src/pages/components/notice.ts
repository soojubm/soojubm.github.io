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
  ...componentPropsOf('fff-notice'),
  { name: 'dismiss', type: 'CustomEvent', kind: 'event' },
]

const primaryAction: ActionConfig = { label: '갱신하기', onClick: () => {} }
const secondaryAction: ActionConfig = { label: '나중에', onClick: () => {} }

const variantCode = `<fff-notice variant="info" description="새 기능이 추가되었습니다."></fff-notice>
<fff-notice variant="warning" description="바시니의 작품은 페라라 부르주아사회의 유대인 박해라는 깊은 상처에 기인한다는 점에서 정치적이다."></fff-notice>
<fff-notice variant="error" description="인터넷에 연결되어 있지 않습니다."></fff-notice>`

const actionCode = `<fff-notice
  variant="warning"
  description="구독이 곧 만료됩니다. 결제 수단을 확인해 주세요."
  .primaryAction=\${primaryAction}
  .secondaryAction=\${secondaryAction}
  @dismiss=\${handleDismiss}
></fff-notice>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Notice"
      description="콘텐츠 흐름 안에 자리 잡고 상태를 알리는 인라인 메시지입니다. 관련 내용 곁에 머무르며 성공·경고·오류 같은 의미를 색상·아이콘·문구로 함께 전달하므로, 사용자는 하던 일을 멈추지 않고 주의할 점을 확인한 뒤 작업을 이어갈 수 있습니다."
    ></fff-page-header>

    <fff-component-aka
      .items=${['Alert', 'Callout', 'Banner', 'Inline message', 'Feedback']}
    ></fff-component-aka>

    <fff-flex direction="column" gap="4">
      <fff-tab-list value="variant" variant="pill">
        <fff-tab value="variant">Variant</fff-tab>
        <fff-tab value="action">Action</fff-tab>
      </fff-tab-list>
      <fff-tab-panel value="variant">
        <fff-component-example>
          <fff-flex direction="column" gap="2">
            <fff-notice variant="info" description="새 기능이 추가되었습니다."></fff-notice>
            <fff-notice
              variant="warning"
              description="바시니의 작품은 페라라 부르주아사회의 유대인 박해라는 깊은 상처에 기인한다는 점에서 정치적이다."
            ></fff-notice>
            <fff-notice variant="error" description="인터넷에 연결되어 있지 않습니다."></fff-notice>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${variantCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="action">
        <fff-component-example>
          <fff-flex direction="column" gap="2">
            <fff-notice
              variant="warning"
              description="구독이 곧 만료됩니다. 결제 수단을 확인해 주세요."
              .primaryAction=${primaryAction}
              .secondaryAction=${secondaryAction}
              @dismiss=${() => {}}
            ></fff-notice>
            <fff-notice
              variant="info"
              description="새 기능이 추가되었습니다."
              @dismiss=${() => {}}
            ></fff-notice>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${actionCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-notice']}></fff-component-tokens>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
