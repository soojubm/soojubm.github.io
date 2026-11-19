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

const componentProps: ComponentPropItemData[] = [...componentPropsOf('mm-dot')]

const tones = Object.keys(dotToneColors) as DotTone[]

const dotSizeList = Object.keys(dotSizes) as DotSize[]

const statusVariants = ['live', 'online', 'new', 'unread'] as const

const userAvatarSizes: AvatarSize[] = ['80', '48', '40', '32']

const legendItems: ChartLegendItem[] = Object.values(CATEGORIES).map(({ label, tone }) => ({
  label,
  tone,
}))

const toneCode = `<mm-dot tone="blue"></mm-dot>
<mm-dot tone="green"></mm-dot>
<mm-dot tone="gray"></mm-dot>`

const sizeCode = `<mm-dot tone="blue" size="16"></mm-dot>
<mm-dot tone="blue" size="12"></mm-dot>
<mm-dot tone="blue" size="8"></mm-dot>
<mm-dot tone="blue" size="6"></mm-dot>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Dot"
      description="색 하나로 정보를 전하는 가장 작은 표시입니다. 글자를 쓰지 않아 행이나 아바타처럼 좁은 자리에 얹을 수 있습니다."
    ></mm-page-header>

    <mm-component-aka
      .items=${['Indicator', 'Badge', 'Swatch', 'Legend marker', 'Presence']}
    ></mm-component-aka>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="tone" variant="pill">
        <mm-tab value="tone">Tone</mm-tab>
        <mm-tab value="size">Size</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="tone">
        <mm-component-example>
          <mm-flex gap="2" align-items="center">
            ${tones.map(
              tone => html`
                <mm-dot tone=${tone}></mm-dot>
              `,
            )}
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${toneCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-flex gap="4" align-items="flex-end">
            ${dotSizeList.map(
              size => html`
                <mm-flex direction="column" gap="2" align-items="center">
                  <mm-dot tone="blue" size=${size}></mm-dot>
                  <mm-caption>${size}</mm-caption>
                </mm-flex>
              `,
            )}
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${sizeCode}></mm-component-code>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-dot']}></mm-component-tokens>

    <mm-component-section heading="StatusDot" description="항목의 상태를 알립니다.">
      <mm-flex direction="column" gap="6">
        <mm-flex gap="4" align-items="center">
          ${statusVariants.map(
            variant => html`
              <mm-flex gap="1" align-items="center">
                <mm-status-dot variant=${variant}></mm-status-dot>
                <mm-caption>${variant}</mm-caption>
              </mm-flex>
            `,
          )}
        </mm-flex>
        <mm-flex gap="4" align-items="flex-end">
          ${userAvatarSizes.map(
            size => html`
              <mm-flex direction="column" gap="2" align-items="center">
                <mm-user-avatar
                  size=${size}
                  name="수줍이"
                  src="/src/images/soojubm.png"
                  online
                ></mm-user-avatar>
                <mm-caption>${size}</mm-caption>
              </mm-flex>
            `,
          )}
        </mm-flex>
      </mm-flex>
    </mm-component-section>

    <mm-component-section heading="ProgressDot" description="작업의 진행 단계를 알립니다.">
      <mm-flex gap="4" align-items="center">
        <mm-progress-dot variant="todo">시작 전</mm-progress-dot>
        <mm-progress-dot variant="in-progress">진행 중</mm-progress-dot>
        <mm-progress-dot variant="done">완료</mm-progress-dot>
        <mm-progress-dot variant="blocked">보류</mm-progress-dot>
      </mm-flex>
    </mm-component-section>

    <mm-component-section heading="CurrentIndicator" description="현재 항목을 가리킵니다.">
      <mm-pagination current-page="2" page-count="5"></mm-pagination>
    </mm-component-section>

    <mm-component-section heading="ChartLegend" description="차트의 시리즈가 무엇인지 알립니다.">
      <mm-chart-legend .items=${legendItems}></mm-chart-legend>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
