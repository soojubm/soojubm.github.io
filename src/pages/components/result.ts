import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { ActionConfig } from '@/types'

import { ICON_NAMES } from '@/components/common'
import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'notice.html', label: 'Notice' },
  { href: 'loading.html', label: 'Loading' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-result'),
  { name: 'slot: default', type: 'HTMLElement', optional: true },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Feedback',
    description: '완료·오류·빈 상태처럼 사용자 행동이나 시스템 상태의 결과를 명확하게 전달합니다.',
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

const exampleCode = `<fff-result
  avatar-icon="clipboard-check"
  heading="주문을 확인해주세요."
  description="..."
  .primaryAction=\${primaryAction}
  .secondaryAction=\${secondaryAction}
>
  <fff-meta-item-group
    direction="column"
    gap="2"
    .items=\${[
      { label: '주문일자', value: '2019.08.10.', layout: 'horizontal' },
      { label: '결제금액', value: '₩ 54,000', layout: 'horizontal' },
    ]}
  ></fff-meta-item-group>
</fff-result>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Result"
      description="작업이 끝난 뒤 그 결과를 보여 주는 섹션 또는 페이지 단위의 화면입니다. 완료·오류·빈 상태를 아이콘과 메시지로 알리고 다음 행동을 버튼으로 제시하므로, 사용자는 결과를 확인한 자리에서 곧바로 다음 단계를 고를 수 있습니다."
    ></fff-page-header>

    <fff-component-aka .items=${['EmptyState', 'Blankslate']}></fff-component-aka>

    <fff-component-example width="narrow">
      <fff-result
        avatar-icon=${ICON_NAMES.DOCUMENT_CHECK}
        heading="주문을 확인해주세요."
        description="헌법재판소 재판관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다."
        .primaryAction=${primaryAction}
        .secondaryAction=${secondaryAction}
      >
        <fff-meta-item-group
          direction="column"
          gap="2"
          .items=${[
            { label: '주문일자', value: '2019.08.10.', layout: 'horizontal' },
            { label: '결제금액', value: '₩ 54,000', layout: 'horizontal' },
          ]}
        ></fff-meta-item-group>
      </fff-result>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-text-block
        level="3"
        heading="언제 사용하나요"
        description="주문 완료·예약 확정·가입 완료·결제 성공처럼 작업의 결과를 알릴 때, 그리고 빈 콘텐츠나 오류처럼 화면이 비어 결과를 대신 설명해야 할 때 사용합니다."
      ></fff-text-block>
    </fff-component-guide>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
