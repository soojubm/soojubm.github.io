import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { categoryToneOf, tagToneStyles } from '@/components/common/tag/tag.styles'
import { renderPage } from '@/components/layouts/base-layouts'
import { CATEGORIES } from '@/pages/mocks'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'tag.html', label: 'Tag' },
  { href: 'avatar.html', label: 'Avatar' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'variant', type: "'live' | 'online' | 'new' | 'unread' = 'online'" },
  { name: 'aria-label', type: 'string', optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'dot-size' },
  { name: 'dot-background-color' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: '색이 오는 곳으로 나뉩니다',
    description:
      '시리즈 팔레트처럼 바깥에서 색이 오면 mm-dot에 --dot-background-color로 넘기고, 색 자체가 상태를 뜻하면 mm-status-dot의 variant를 씁니다. 같은 원을 그리지만 읽히는 방식이 반대입니다.',
  },
  {
    heading: '이름은 의미를 갖는 쪽만 말합니다',
    description:
      'mm-status-dot은 variant가 곧 의미라 role과 읽히는 이름을 스스로 갖습니다. mm-dot은 옆에 붙는 라벨이 이름을 맡으므로 보조 기술에 드러나지 않습니다.',
  },
]

const statusVariants = ['live', 'online', 'new', 'unread'] as const

const main = html`
  <mm-main>
    <mm-page-header
      heading="Dot"
      description="색 하나로 정보를 전하는 가장 작은 표시입니다. 글자를 쓰지 않아 행이나 아바타처럼 좁은 자리에 얹을 수 있고, 읽는 사람은 문장을 읽기 전에 색만으로 상태나 갈래를 알아챕니다."
    ></mm-page-header>

    <mm-component-aka
      .items=${['Indicator', 'Badge', 'Swatch', 'Legend marker', 'Presence']}
    ></mm-component-aka>

    <mm-component-example>
      <mm-flex direction="column" gap="2">
        ${CATEGORIES.map(
          (label, index) => html`
            <mm-flex gap="2" align-items="center">
              <mm-dot
                style="--dot-background-color: ${tagToneStyles[categoryToneOf(index + 1)]
                  .textColor}"
              ></mm-dot>
              <mm-text>${label}</mm-text>
            </mm-flex>
          `,
        )}
      </mm-flex>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-section
      heading="StatusDot"
      description="색 자체가 상태를 뜻하는 점입니다. variant가 색과 읽히는 이름을 함께 정하므로 소비처가 aria-label을 따로 붙이지 않습니다."
    >
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
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
