import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { PopoverPlacement } from '@/components/overlay/popover/popover'
import type { SelectVariant } from '@/components/overlay/select/select'

import { componentPropsOf, openStateMethods } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'popover.html', label: 'Popover' },
  { href: 'radio.html', label: 'Radio' },
  { href: 'toggle-button.html', label: 'Toggle Button' },
  { href: 'menu-item.html', label: 'Menu Item' },
]

const variants: SelectVariant[] = ['secondary', 'tertiary']
const placements: PopoverPlacement[] = ['bottom-start', 'bottom-end', 'top-start', 'top-end']
// 트리거에 현재 위치 이름이 보이도록 위치를 옵션 값으로 둔다.
const placementOptions = placements.map(placement => ({ value: placement, label: placement }))

const releaseChannelOptions = [
  { value: 'stable', label: 'Stable' },
  { value: 'beta', label: 'Beta' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-select'),
  ...openStateMethods,
  { name: 'change', type: 'CustomEvent detail: value', kind: 'event' },
  { name: 'toggle', type: 'CustomEvent<{ open: boolean }>', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '여러 옵션 중 하나만 선택할 수 있으며, 선택된 값은 트리거에 보입니다. 옵션을 고르면 목록이 닫히고 값이 바로 반영됩니다.',
  },
]

const variantCode = `<fff-select aria-label="릴리스 채널" variant="secondary" value="stable" .options=\${options}></fff-select>
<fff-select aria-label="릴리스 채널" variant="tertiary" value="stable" .options=\${options}></fff-select>`

const placementCode = `<fff-select aria-label="패널 위치" placement="bottom-start" value="bottom-start" .options=\${options}></fff-select>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Select"
      description="여러 옵션 중 하나를 고르는 접힌 목록입니다. 평소에는 선택된 값만 보여 주다가 누르면 옵션 목록이 펼쳐지므로, 사용자는 좁은 공간에서도 전체 선택지를 훑어보고 하나를 고를 수 있습니다."
    ></fff-page-header>

    <fff-component-aka .items=${['Dropdown', 'Picker']}></fff-component-aka>

    <fff-flex direction="column" gap="4">
      <fff-tab-list
        value="variant"
        variant="pill"
        .tabs=${[
          { value: 'variant', label: 'Variant' },
          { value: 'placement', label: 'Placement' },
        ]}
      ></fff-tab-list>
      <fff-tab-panel value="variant">
        <fff-component-example>
          <fff-button-group>
            ${variants.map(
              variant => html`
                <fff-select
                  aria-label="릴리스 채널"
                  variant=${variant}
                  value="stable"
                  .options=${releaseChannelOptions}
                ></fff-select>
              `,
            )}
          </fff-button-group>
        </fff-component-example>
        <fff-component-code .code=${variantCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="placement">
        <fff-component-example>
          <fff-button-group>
            ${placements.map(
              placement => html`
                <fff-select
                  aria-label="패널 위치"
                  placement=${placement}
                  value=${placement}
                  .options=${placementOptions}
                ></fff-select>
              `,
            )}
          </fff-button-group>
        </fff-component-example>
        <fff-component-code .code=${placementCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-content-section
        heading-level="3"
        heading="초기값은 무엇인가요?"
        description="value가 비어 있으면 첫 번째 활성 옵션이 초기값이 됩니다. 네이티브 select와 같은 동작으로 트리거가 빈 값으로 보이지 않게 하며, 비활성 옵션은 고를 수 없어 건너뜁니다."
      ></fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="시각보정이 필요해요"
        description="트리거 오른쪽의 화살표 아이콘 때문에 오른쪽 여백이 왼쪽보다 넓어 보입니다. 아이콘 쪽을 보정해 좌우 여백이 같아 보이게 합니다."
      >
        <fff-grid columns="2" gap="6">
          <fff-figure-card description="화살표를 바깥으로 4px 당겨 좌우 여백이 같아 보이게 한다">
            <fff-select
              slot="figure"
              aria-label="릴리스 채널"
              value="stable"
              .options=${releaseChannelOptions}
            ></fff-select>
            <fff-code-tag slot="tags" tone="green">Do</fff-code-tag>
          </fff-figure-card>
          <fff-figure-card description="보정 전에는 오른쪽 여백이 왼쪽보다 넓어 보인다">
            <fff-button slot="figure" variant="secondary">
              Stable
              <fff-expand-indicator></fff-expand-indicator>
            </fff-button>
            <fff-code-tag slot="tags" tone="red">Don't</fff-code-tag>
          </fff-figure-card>
        </fff-grid>
      </fff-content-section>

      <fff-text-block
        level="3"
        heading="좁은 화면에서는 어떻게 보이나요"
        description="좁은 화면에서는 목록이 화면 아래의 bottom sheet로 열립니다."
      ></fff-text-block>
    </fff-component-guide>

    <fff-component-section
      heading="SortSelector"
      description="목록 정렬 옵션은 group으로 펼치지 않습니다. 현재 정렬 상태만 요약해 보여주고, 정렬 목록은 접힌 메뉴로 제공합니다."
    >
      <fff-sort-selector></fff-sort-selector>
    </fff-component-section>
    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
