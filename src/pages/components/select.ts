import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'popover.html', label: 'Popover' },
  { href: 'radio.html', label: 'Radio' },
  { href: 'toggle-button.html', label: 'Toggle Button' },
  { href: 'menu-item.html', label: 'menuItem' },
]

const componentProps: ComponentPropItemData[] = [
  {
    name: 'options',
    type: '{ value: string; label: string; icon?: IconName; disabled?: boolean }[] = []',
  },
  { name: 'value', type: 'string', optional: true },
  {
    name: 'placement',
    type: "'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-left'",
  },
  { name: 'width', type: "string = 'auto'" },
  { name: 'aria-label', type: 'string', optional: true },
  { name: 'change', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = []

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Select"
        description="여러 옵션 중 하나를 고르는 접힌 목록입니다. 평소에는 선택된 값만 보여 주다가 누르면 트리거 아래로 옵션 목록이 펼쳐지므로, 사용자는 좁은 공간에서도 전체 선택지를 훑어보고 하나를 고를 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-component-aka .items=${['Dropdown', 'Picker']}></mm-component-aka>

    <mm-component-example>
      <mm-select
        aria-label="릴리스 채널"
        width="200px"
        value="stable"
        .options=${[
          { value: 'stable', label: 'Stable' },
          { value: 'beta', label: 'Beta' },
          { value: 'canary', label: 'Canary' },
        ]}
      ></mm-select>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          '트리거·옵션 목록·선택 상태는 select가 소유하고, 목록 표면과 열림 상태는 popover에 맡긴다.',
          'value가 비어 있으면 네이티브 select처럼 첫 번째 활성 옵션으로 채운다.',
          '보이는 레이블이 없으면 aria-label로 컨트롤 이름을 준다. 트리거는 이름과 현재 값을 함께 읽고, 목록은 이름만 읽는다. form field 안에서는 필드 레이블이 이름을 맡는다.',
          '폭은 기본적으로 트리거 콘텐츠를 따르며, 폼 필드 안에서 늘려야 할 때 width="100%"를 준다.',
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
