import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'dialog.html', label: 'Dialog' },
  { href: 'result.html', label: 'Result' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'role', type: "string = 'note'", optional: true },
  { name: 'heading', type: 'string', optional: true },
  { name: 'description', type: 'string', optional: true },
  { name: 'variant', type: "'success' | 'warning' | 'danger'", optional: true },
  { name: 'dismissible', type: 'boolean', optional: true },
  { name: 'dismiss', type: 'CustomEvent', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'notice-padding', default: 'var(--space-3)' },
  { name: 'notice-border-radius', default: 'var(--radius)' },
  { name: 'notice-border-width', default: 'var(--border-width)' },
  { name: 'notice-text-color', default: 'var(--foreground-color)', prop: 'variant' },
  { name: 'notice-background-color', default: 'transparent' },
  { name: 'notice-border-color', default: 'var(--border-color)' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Statusful',
    description:
      '성공·경고·오류·정보 등 의미 상태를 variant 톤으로 전달합니다. 색상만으로 의미를 전달하지 않고 아이콘·텍스트를 함께 제공합니다.',
  },
]

const main = html`
  <mm-page>
    <mm-page-header
      heading="Notice"
      description="시스템 상태나 사용자 행동에 대한 피드백을 인라인으로 전달합니다."
    ></mm-page-header>

    <mm-component-aka
      .items=${['Alert', 'Callout', 'Banner', 'Inline message', 'Feedback']}
    ></mm-component-aka>

    <mm-component-example>
      <div style="max-width: 480px">
        <mm-flex direction="column">
          <mm-notice
            heading="헤딩"
            description="배너. 히어로와 콜아웃의 차이."
            dismissible
          ></mm-notice>

          <mm-notice variant="success" description="좋아요 표시한 동영상에 추가됨"></mm-notice>
          <mm-notice
            variant="warning"
            description="바시니의 작품은 페라라 부르주아사회의 유대인 박해라는 깊은 상처에 기인한다는 점에서 정치적이다."
          ></mm-notice>
          <mm-notice variant="danger" description="인터넷에 연결되어 있지 않습니다."></mm-notice>
        </mm-flex>
      </div>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
      <mm-text-list
        .texts=${[
          'role="alert" 속성이 있는 요소는 브라우저가 즉시 사용자에게 읽습니다. 긴급도가 낮은 알림에는 role="status"를 사용하세요.',
          '사용자 귀책이 아닌 경우 단순 "오류" 대신 "시스템 오류"처럼 책임 소재를 명확히 해 사용자가 위축되지 않도록 합니다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </mm-page>
`

renderPage(main)
