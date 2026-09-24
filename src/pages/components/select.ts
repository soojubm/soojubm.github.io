import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { PopoverPlacement } from '@/components/overlay/popover/popover'
import type { SelectVariant } from '@/components/overlay/select/select'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'popover.html', label: 'Popover' },
  { href: 'radio.html', label: 'Radio' },
  { href: 'toggle-button.html', label: 'Toggle Button' },
  { href: 'menu-item.html', label: 'Menu Item' },
]

const variants: SelectVariant[] = ['tertiary', 'ghost']
const placements: PopoverPlacement[] = ['bottom-left', 'bottom-right', 'top-left', 'top-right']
// 트리거에 현재 위치 이름이 보이도록 위치를 옵션 값으로 둔다.
const placementOptions = placements.map(placement => ({ value: placement, label: placement }))

const releaseChannelOptions = [
  { value: 'stable', label: 'Stable' },
  { value: 'beta', label: 'Beta' },
  { value: 'canary', label: 'Canary' },
]

const componentProps: ComponentPropItemData[] = [
  {
    name: 'options',
    type: '{ value: string; label: string; icon?: IconName; disabled?: boolean }[] = []',
  },
  { name: 'value', type: 'string', optional: true },
  { name: 'variant', type: "'tertiary' | 'ghost' = 'tertiary'" },
  {
    name: 'placement',
    type: "'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-left'",
  },
  { name: 'aria-label', type: 'string', optional: true },
  { name: 'change', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '여러 옵션 중 하나만 선택할 수 있으며, 선택된 값은 트리거에, 선택 여부는 목록 안 옵션의 aria-selected 상태로 드러납니다. 옵션을 고르면 목록이 닫히고 값이 바로 반영됩니다.',
  },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Select"
      description="여러 옵션 중 하나를 고르는 접힌 목록입니다. 평소에는 선택된 값만 보여 주다가 누르면 옵션 목록이 펼쳐지므로, 사용자는 좁은 공간에서도 전체 선택지를 훑어보고 하나를 고를 수 있습니다."
    ></mm-page-header>

    <mm-component-aka .items=${['Dropdown', 'Picker']}></mm-component-aka>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="variant" variant="pill">
        <mm-tab value="variant">Variant</mm-tab>
        <mm-tab value="placement">Placement</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="variant">
        <mm-component-example>
          <mm-flex gap="4">
            ${variants.map(
              variant => html`
                <mm-select
                  aria-label="릴리스 채널"
                  variant=${variant}
                  value="stable"
                  .options=${releaseChannelOptions}
                ></mm-select>
              `,
            )}
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="placement">
        <mm-component-example>
          <mm-flex gap="4" wrap="wrap">
            ${placements.map(
              placement => html`
                <mm-select
                  aria-label="패널 위치"
                  placement=${placement}
                  value=${placement}
                  .options=${placementOptions}
                ></mm-select>
              `,
            )}
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-guide .features=${componentFeatures}>
      <mm-paragraph-group>
        <mm-heading level="3">언제 사용하나요</mm-heading>
        <mm-paragraph>
          주로 목록의 정렬 기준을 고를 때 사용합니다. select는 선택지를 접어 두고 현재 값 하나만
          보여 주므로, 선택에 따라 보이는 데이터가 달라지는 필터는 옵션을 펼쳐 나열하는 것이
          정론입니다. 이때는
          <mm-code>mm-filter-button-group</mm-code>
          을 사용하세요.
        </mm-paragraph>
      </mm-paragraph-group>

      <mm-content-section heading-level="3" heading="초기값">
        <mm-text-list
          variant="check"
          .texts=${[
            html`
              <span>
                <mm-text weight="bold">value가 비어 있으면 첫 번째 활성 옵션으로 채운다</mm-text>
                네이티브 select와 같은 동작으로, 트리거가 빈 값으로 보이지 않게 한다. 비활성 옵션은
                고를 수 없는 값이라 건너뛴다
              </span>
            `,
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="시각보정">
        <mm-paragraph>
          트리거 끝의
          <mm-code>mm-expand-indicator</mm-code>
          는 아이콘보다 큰 박스를 가져, 박스 안 여백이 버튼 padding에 더해지면 오른쪽 여백이
          왼쪽보다 넓어 보입니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            html`
              <span>
                <mm-text weight="bold">
                  indicator 박스 안 여백만큼 음수 margin으로 바깥에 흘린다
                </mm-text>
                아이콘 끝이 버튼 padding 경계에 닿아 좌우 여백이 같아 보인다. 버튼 padding은 버튼이
                소유하므로 줄이지 않고, 트리거를 조립하는 select가 indicator 쪽에서 보정한다
              </span>
            `,
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-text-list
        .texts=${[
          '트리거·옵션 목록·선택 상태와 열림 상태는 select가 소유하고, 목록을 담는 표면만 popover와 sheet에 맡긴다.',
          '좁은 화면에서는 목록을 트리거에 앵커하지 않고 bottom sheet로 올린다. 트리거 아래 남는 자리가 작고, 손이 닿는 화면 아래에서 고르는 편이 편하기 때문이다.',
          '보이는 레이블 없이 쓰므로 aria-label로 컨트롤 이름을 준다. 트리거는 이름과 현재 값을 함께 읽고, 목록은 이름만 읽는다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-select
    aria-label="릴리스 채널"
    value="stable"
    .options=\${[
        { value: 'stable', label: 'Stable' },
        { value: 'beta', label: 'Beta' },
    ]}
></mm-select>`}
    ></mm-component-anatomy>

    <mm-component-section
      heading="SortSelector"
      description="목록 정렬 옵션은 group으로 펼치지 않습니다. 현재 정렬 상태만 요약해 보여주고, 정렬 목록은 접힌 메뉴로 제공합니다."
    >
      <mm-sort-selector></mm-sort-selector>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
