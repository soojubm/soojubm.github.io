import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { PopoverPlacement } from '@/components/overlay/popover/popover'
import type { SelectVariant } from '@/components/overlay/select/select'

import { componentPropsOf, rule } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'popover.html', label: 'Popover' },
  { href: 'radio.html', label: 'Radio' },
  { href: 'toggle-button.html', label: 'Toggle Button' },
  { href: 'menu-item.html', label: 'Menu Item' },
]

const variants: SelectVariant[] = ['tertiary', 'ghost']
const placements: PopoverPlacement[] = ['bottom-start', 'bottom-end', 'top-start', 'top-end']
// 트리거에 현재 위치 이름이 보이도록 위치를 옵션 값으로 둔다.
const placementOptions = placements.map(placement => ({ value: placement, label: placement }))

const releaseChannelOptions = [
  { value: 'stable', label: 'Stable' },
  { value: 'beta', label: 'Beta' },
  { value: 'canary', label: 'Canary' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('mm-select'),
  { name: 'change', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '여러 옵션 중 하나만 선택할 수 있으며, 선택된 값은 트리거에 보입니다. 옵션을 고르면 목록이 닫히고 값이 바로 반영됩니다.',
  },
]

const variantCode = `<mm-select aria-label="릴리스 채널" variant="tertiary" value="stable" .options=\${options}></mm-select>
<mm-select aria-label="릴리스 채널" variant="ghost" value="stable" .options=\${options}></mm-select>`

const placementCode = `<mm-select aria-label="패널 위치" placement="bottom-start" value="bottom-start" .options=\${options}></mm-select>`

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
          <mm-button-group>
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
          </mm-button-group>
        </mm-component-example>
        <mm-component-code .code=${variantCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="placement">
        <mm-component-example>
          <mm-button-group>
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
          </mm-button-group>
        </mm-component-example>
        <mm-component-code .code=${placementCode}></mm-component-code>
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

      <mm-content-section heading-level="3" heading="초기값은 무엇인가요?">
        <mm-paragraph>
          value가 비어 있으면 첫 번째 활성 옵션이 초기값이 됩니다. 네이티브 select와 같은 동작으로
          트리거가 빈 값으로 보이지 않게 하며, 비활성 옵션은 고를 수 없어 건너뜁니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="화살표 아이콘도 시각보정이 필요한가요?">
        <mm-paragraph>
          트리거 오른쪽의 화살표 아이콘 때문에 오른쪽 여백이 왼쪽보다 넓어 보입니다. 아이콘 쪽을
          보정해 좌우 여백이 같아 보이게 합니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-text-list
        .texts=${[
          '좁은 화면에서는 목록이 화면 아래의 bottom sheet로 열린다.',
          '옵션 목록은 5개까지 보이고, 넘치면 안에서 스크롤된다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

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
