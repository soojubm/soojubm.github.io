import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { ActionConfig } from '@/types'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'notice.html', label: 'Notice' },
  { href: 'loading.html', label: 'Loading' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'role', type: "'alert' | 'status' = 'status'", optional: true },
  { name: 'avatar-icon', type: 'IconName', optional: true },
  { name: 'heading', type: 'string' },
  { name: 'description', type: 'string', optional: true },
  { name: 'primaryAction', type: 'ActionConfig', optional: true },
  { name: 'secondaryAction', type: 'ActionConfig', optional: true },
  { name: 'slot: default', type: 'HTMLElement', optional: true },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Feedback',
    description: '완료·오류·빈 상태처럼 사용자 행동이나 시스템 상태의 결과를 명확하게 전달합니다.',
  },
  {
    heading: 'Statusful',
    description:
      '완료·오류·빈 상태 등 결과의 의미를 톤으로 구분합니다. 색상에만 의존하지 않고 아이콘과 메시지를 함께 제공합니다.',
  },
]

const primaryAction: ActionConfig = {
  label: '주문내역 보기',
  onClick: () => {},
}

const secondaryAction: ActionConfig = {
  label: '홈으로',
  onClick: () => {},
}

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Result"
        description="작업이 끝난 뒤 그 결과를 보여 주는 섹션 또는 페이지 단위의 화면입니다. 완료·오류·빈 상태를 아이콘과 메시지로 알리고 다음 행동을 버튼으로 제시하므로, 사용자는 결과를 확인한 자리에서 곧바로 다음 단계를 고를 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-component-aka .items=${['EmptyState', 'Blankslate']}></mm-component-aka>

    <mm-component-example>
      <mm-result
        avatar-icon=${ICON_NAMES.DOCUMENT_CHECK}
        heading="주문을 확인해주세요."
        description="헌법재판소 재판관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다."
        .primaryAction=${primaryAction}
        .secondaryAction=${secondaryAction}
      >
        <mm-meta-item-group direction="column" gap="2" style="width:100%">
          <mm-meta-item layout="horizontal" label="주문일자" value="2019.08.10."></mm-meta-item>
          <mm-meta-item layout="horizontal" label="결제금액" value="₩ 54,000"></mm-meta-item>
        </mm-meta-item-group>
      </mm-result>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-guide .features=${componentFeatures}>
      <mm-paragraph-group>
        <mm-paragraph>You're done!</mm-paragraph>
        <mm-paragraph>
          empty content, error feedback, Order Completed, Booking Confirmed, Registration Complete,
          Submission Successful, Payment Successful
        </mm-paragraph>
        <mm-paragraph>텍스트 모듈</mm-paragraph>
        <mm-paragraph>
          <del>
            왼쪽 정렬의 기본적인 텍스트 모듈과 대비를 위해 가운데 정렬합니다. foundation:: 콘텐츠
            모듈로 콘텐츠 간의 맥락 전환을 시각화하는 것이 . 보류
          </del>
        </mm-paragraph>
      </mm-paragraph-group>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-result
    avatar-icon="clipboard-check"
    heading="주문을 확인해주세요."
    description="주문 내역은 마이페이지에서 다시 볼 수 있습니다."
    .primaryAction=\${primaryAction}
>
    <mm-meta-item layout="horizontal" label="결제금액" value="₩ 54,000"></mm-meta-item>
</mm-result>`}
    ></mm-component-anatomy>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
