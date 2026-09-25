import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { ActionConfig } from '@/types'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'dialog.html', label: 'Dialog' },
  { href: 'result.html', label: 'Result' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'role', type: "'alert' | 'note' | 'status' = 'note'", optional: true },
  { name: 'heading', type: 'string', optional: true },
  { name: 'description', type: 'string', optional: true },
  { name: 'variant', type: "'info' | 'success' | 'warning' | 'error' = 'info'", optional: true },
  { name: 'primaryAction', type: 'ActionConfig', optional: true },
  { name: 'secondaryAction', type: 'ActionConfig', optional: true },
  { name: 'dismiss', type: 'CustomEvent', kind: 'event' },
]

const primaryAction: ActionConfig = { label: '갱신하기', onClick: () => {} }
const secondaryAction: ActionConfig = { label: '나중에', onClick: () => {} }

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Statusful',
    description:
      '성공·경고·오류·정보 등 의미 상태를 variant 톤으로 전달합니다. 색상만으로 의미를 전달하지 않고 아이콘·텍스트를 함께 제공합니다.',
  },
]

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
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="2">
              <mm-notice variant="info" description="새 기능이 추가되었습니다."></mm-notice>
              <mm-notice variant="success" description="좋아요 표시한 동영상에 추가됨"></mm-notice>
              <mm-notice
                variant="warning"
                description="바시니의 작품은 페라라 부르주아사회의 유대인 박해라는 깊은 상처에 기인한다는 점에서 정치적이다."
              ></mm-notice>
              <mm-notice variant="error" description="인터넷에 연결되어 있지 않습니다."></mm-notice>
            </mm-flex>
            <mm-paragraph>
              variant마다 아이콘과 글자색이 함께 바뀌어 색상만으로 의미를 전달하지 않습니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="heading">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-notice
              variant="info"
              heading="헤딩"
              description="배너. 히어로와 콜아웃의 차이."
            ></mm-notice>
            <mm-paragraph>
              헤딩은 설명 첫 줄 앞에 붙고, 넘치는 줄은 헤딩 아래로 흐릅니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
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
            <mm-paragraph>
              액션 버튼과 닫기 버튼은 우측에 놓이며, primaryAction·secondaryAction을 넘기거나
              dismiss 이벤트를 구독한 것만 나타납니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-notice']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          'role="alert" 속성이 있는 요소는 브라우저가 즉시 사용자에게 읽습니다. 긴급도가 낮은 알림에는 role="status"를 사용하세요.',
          '시스템 오류로 실패하면 단순 "오류" 대신 무엇이 잘못됐는지 명확히 설명해, 사용자가 입력을 고칠지 다시 시도할지 알 수 있게 합니다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-notice
    variant="warning"
    heading="구독이 곧 만료됩니다."
    description="결제 수단을 확인해 주세요."
    .primaryAction=\${{ label: '갱신하기', onClick: handleRenew }}
    .secondaryAction=\${{ label: '나중에', onClick: handleLater }}
    @dismiss=\${handleDismiss}
></mm-notice>`}
    ></mm-component-anatomy>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
