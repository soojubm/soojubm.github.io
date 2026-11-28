import { html } from 'lit'

import type { AvatarSize } from '@/components/common/avatar/avatar'
import type { ChartLegendItem } from '@/components/domains/chart/chart-legend'
import type {
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import {
  dotSizes,
  dotToneColors,
  type DotSize,
  type DotTone,
} from '@/components/common/dot/dot.styles'
import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'
import { CATEGORIES } from '@/pages/mocks'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'tag.html', label: 'Tag' },
  { href: 'avatar.html', label: 'Avatar' },
]

const componentProps: ComponentPropItemData[] = [...componentPropsOf('fff-dot')]

const tones = Object.keys(dotToneColors) as DotTone[]

const dotSizeList = Object.keys(dotSizes) as DotSize[]

const statusVariants = ['live', 'online', 'new', 'unread'] as const

const userAvatarSizes: AvatarSize[] = ['80', '48', '40', '32']

const legendItems: ChartLegendItem[] = Object.values(CATEGORIES).map(({ label, tone }) => ({
  label,
  tone,
}))

const toneCode = `<fff-dot tone="blue"></fff-dot>
<fff-dot tone="green"></fff-dot>
<fff-dot tone="gray"></fff-dot>`

const sizeCode = `<fff-dot tone="blue" size="16"></fff-dot>
<fff-dot tone="blue" size="12"></fff-dot>
<fff-dot tone="blue" size="8"></fff-dot>
<fff-dot tone="blue" size="6"></fff-dot>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Dot"
      description="색 하나로 정보를 전하는 가장 작은 표시입니다. 글자를 쓰지 않아 행이나 아바타처럼 좁은 자리에 얹을 수 있습니다."
    ></fff-page-header>

    <fff-component-aka
      .items=${['Indicator', 'Badge', 'Swatch', 'Legend marker', 'Presence']}
    ></fff-component-aka>

    <fff-flex direction="column" gap="4">
      <fff-tab-list
        value="tone"
        variant="pill"
        .tabs=${[
          { value: 'tone', label: 'Tone' },
          { value: 'size', label: 'Size' },
        ]}
      ></fff-tab-list>
      <fff-tab-panel value="tone">
        <fff-component-example>
          <fff-flex gap="2" align-items="center">
            ${tones.map(
              tone => html`
                <fff-dot tone=${tone}></fff-dot>
              `,
            )}
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${toneCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="size">
        <fff-component-example>
          <fff-flex gap="4" align-items="flex-end">
            ${dotSizeList.map(
              size => html`
                <fff-flex direction="column" gap="2" align-items="center">
                  <fff-dot tone="blue" size=${size}></fff-dot>
                  <fff-caption>${size}</fff-caption>
                </fff-flex>
              `,
            )}
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${sizeCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-dot']}></fff-component-tokens>

    <fff-component-section heading="StatusDot" description="항목의 상태를 알립니다.">
      <fff-flex direction="column" gap="6">
        <fff-flex gap="4" align-items="center">
          ${statusVariants.map(
            variant => html`
              <fff-flex gap="1" align-items="center">
                <fff-status-dot variant=${variant}></fff-status-dot>
                <fff-caption>${variant}</fff-caption>
              </fff-flex>
            `,
          )}
        </fff-flex>
        <fff-flex gap="4" align-items="flex-end">
          ${userAvatarSizes.map(
            size => html`
              <fff-flex direction="column" gap="2" align-items="center">
                <fff-user-avatar
                  size=${size}
                  name="수줍이"
                  src="/src/images/soojubm.png"
                  online
                ></fff-user-avatar>
                <fff-caption>${size}</fff-caption>
              </fff-flex>
            `,
          )}
        </fff-flex>
      </fff-flex>
    </fff-component-section>

    <fff-component-section heading="ProgressDot" description="작업의 진행 단계를 알립니다.">
      <fff-flex gap="4" align-items="center">
        <fff-progress-dot variant="todo">시작 전</fff-progress-dot>
        <fff-progress-dot variant="in-progress">진행 중</fff-progress-dot>
        <fff-progress-dot variant="done">완료</fff-progress-dot>
        <fff-progress-dot variant="blocked">보류</fff-progress-dot>
      </fff-flex>
    </fff-component-section>

    <fff-component-section heading="CurrentIndicator" description="현재 항목을 가리킵니다.">
      <fff-pagination current-page="2" page-count="5"></fff-pagination>
    </fff-component-section>

    <fff-component-section heading="ChartLegend" description="차트의 시리즈가 무엇인지 알립니다.">
      <fff-chart-legend .items=${legendItems}></fff-chart-legend>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
