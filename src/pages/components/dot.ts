import { html } from 'lit'

import type { AvatarSize } from '@/components/common/avatar/avatar'
import type { ChartLegendItem } from '@/components/domains/chart/chart-legend'
import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import {
  dotSizes,
  dotToneColors,
  type DotSize,
  type DotTone,
} from '@/components/common/dot/dot.styles'
import { renderPage } from '@/components/layouts/base-layouts'
import { CATEGORIES } from '@/pages/mocks'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'tag.html', label: 'Tag' },
  { href: 'avatar.html', label: 'Avatar' },
]

const componentProps: ComponentPropItemData[] = [
  {
    name: 'tone',
    type: "'default' | 'gold' | 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'pink' | 'orange' | 'cyan' | 'gray' = 'default'",
  },
  { name: 'size', type: "'16' | '12' | '8' | '6' = '8'" },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: '색이 오는 곳으로 나뉩니다',
    description:
      '범례처럼 옆 라벨이 이름을 맡으면 mm-dot의 tone으로 색을 고르고, 색 자체가 상태를 뜻하면 mm-status-dot의 variant를 씁니다. 어느 쪽이든 색은 정해진 tone 안에서만 오고, 소비처가 값을 직접 넘기지 않습니다.',
  },
  {
    heading: '이름은 의미를 갖는 쪽만 말합니다',
    description:
      'mm-status-dot은 variant가 곧 의미라 role과 읽히는 이름을 스스로 갖습니다. mm-dot은 옆에 붙는 라벨이 이름을 맡으므로 보조 기술에 드러나지 않습니다.',
  },
]

const tones = Object.keys(dotToneColors) as DotTone[]

const dotSizeList = Object.keys(dotSizes) as DotSize[]

const statusVariants = ['live', 'online', 'new', 'unread'] as const

const userAvatarSizes: AvatarSize[] = ['80', '48', '40', '32']

const legendItems: ChartLegendItem[] = Object.values(CATEGORIES).map(({ label, tone }) => ({
  label,
  tone,
}))

const main = html`
  <mm-main>
    <mm-page-header
      heading="Dot"
      description="색 하나로 정보를 전하는 가장 작은 표시입니다. 글자를 쓰지 않아 행이나 아바타처럼 좁은 자리에 얹을 수 있고, 읽는 사람은 문장을 읽기 전에 색만으로 상태나 갈래를 알아챕니다."
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
      </mm-tab-panel>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-flex gap="4" align-items="end">
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
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-dot']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-section
      heading="StatusDot"
      description="색 자체가 상태를 뜻하는 점입니다. variant가 색과 읽히는 이름을 함께 정하므로 소비처가 aria-label을 따로 붙이지 않습니다. 사용자 아바타에 얹을 때는 아바타 크기에 맞춰 점 크기가 정해집니다."
    >
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
        <mm-flex gap="4" align-items="end">
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

    <mm-component-section
      heading="ProgressDot"
      description="작업이 어느 단계에 있는지 점과 라벨로 보입니다. 점의 색이 단계를 가르고, 이름은 라벨이 맡습니다."
    >
      <mm-flex gap="4" align-items="center">
        <mm-progress-dot variant="todo">시작 전</mm-progress-dot>
        <mm-progress-dot variant="in-progress">진행 중</mm-progress-dot>
        <mm-progress-dot variant="done">완료</mm-progress-dot>
        <mm-progress-dot variant="blocked">보류</mm-progress-dot>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="CurrentIndicator"
      description="여러 항목 가운데 지금 위치한 곳을 가리키는 점입니다. 현재라는 뜻은 항목의 aria-current가 전하므로 점은 현재 항목에만 놓여 화면에서 자리를 짚는 일만 맡습니다. 가로로 늘어선 항목은 아래 가운데에, 세로 목록은 행 끝에 둡니다."
    >
      <mm-pagination current-page="2" page-count="5"></mm-pagination>
    </mm-component-section>

    <mm-component-section
      heading="ChartLegend"
      description="차트가 그린 시리즈와 이름을 잇는 범례입니다. 점은 시리즈 색만 옮기고 이름은 옆의 라벨이 맡습니다."
    >
      <mm-chart-legend .items=${legendItems}></mm-chart-legend>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
