import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'popover.html', label: 'Popover' },
  { href: 'notice.html', label: 'Notice' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://carbondesignsystem.com/components/toggletip/usage/',
    label: 'Carbon - Toggletip',
    external: true,
  },
  {
    href: 'https://playbook.ebay.com/design-system/components/tooltip',
    label: 'eBay Playbook - Tooltip',
    external: true,
  },
  {
    href: 'https://playbook.ebay.com/design-system/components/tourtip',
    label: 'eBay Playbook - Tourtip',
    external: true,
  },
  {
    href: 'https://spectrum.adobe.com/page/coach-mark/',
    label: 'Spectrum - Coach mark',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'content', type: 'string' },
  { name: 'placement', type: "'left' | 'center' | 'right'", optional: true },
  { name: 'open', type: 'boolean = false', optional: true },
  { name: 'slot: trigger', type: 'HTMLElement' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'tooltip-max-width' },
  { name: 'tooltip-padding' },
  { name: 'tooltip-border-radius' },
  { name: 'tooltip-background-color' },
  { name: 'tooltip-text-color' },
  { name: 'tooltip-shadow' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Disclosure',
    description:
      '설명이 필요 없는 플로우와 인터페이스를 우선하세요. 툴팁은 없을수록 좋으며, 접근성을 위한 최소한의 설명만 제공합니다. 작은 화면에서 바텀 시트나 팝오버로 제공하는 것이 좋다. 사용자가 반드시 숙지해야 하는 중요한 정보를 툴팁으로 제공하지 마세요.',
  },
]

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Tooltip"
        description="트리거 요소에 붙는 짧은 보조 설명입니다. 마우스를 올리거나 포커스가 닿을 때만 트리거 곁에 나타나고 벗어나면 사라지므로, 사용자는 화면을 어지럽히지 않은 채 필요한 순간에 용어의 뜻이나 정보의 근거를 확인할 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-component-aka .items=${['Coachmark']}></mm-component-aka>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="default" variant="pill">
        <mm-tab value="default">Default</mm-tab>
        <mm-tab value="placement">Placement</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="default">
        <mm-component-example>
          <mm-tooltip
            content="제1항의 해임건의는 국회재적의원 3분의 1 이상의 발의에 의하여 국회재적의원 과반수의 찬성이 있어야 한다."
          >
            <mm-icon
              slot="trigger"
              name="help-circle"
              role="img"
              aria-label="해임건의 요건 도움말"
              tabindex="0"
            ></mm-icon>
          </mm-tooltip>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="placement">
        <mm-component-example>
          <mm-button-group>
            <mm-icon-button
              icon=${ICON_NAMES.USER}
              aria-label="좌측 정렬"
              tooltip-placement="left"
            ></mm-icon-button>
            <mm-icon-button
              icon=${ICON_NAMES.USER}
              aria-label="가운데 정렬"
              tooltip-placement="center"
            ></mm-icon-button>
            <mm-icon-button
              icon=${ICON_NAMES.USER}
              aria-label="우측 정렬"
              tooltip-placement="right"
            ></mm-icon-button>
          </mm-button-group>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>
    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          '내용은 보조기술이 읽을 수 있도록 대상 요소의 설명으로 연결하고, hover뿐 아니라 키보드 포커스로도 열 수 있어야 합니다.',
          '트리거를 가리키는 화살표는 두지 않는다. 사용자가 포인터나 손가락으로 직접 연 표면이라 어디에서 나왔는지 이미 분명하다. 화살표는 로딩 시점에 스스로 떠서 대상을 지목하는 GuideTip이 쓴다.',
          'short text, long form text. MD3 rich tooltip(title, description, actions-link/button) / plain tooltip',
        ]}
      ></mm-text-list>

      <mm-heading level="3">접근성</mm-heading>
      <mm-text-block
        level="4"
        heading="액션 보완형"
        description="아이콘 버튼의 이름을 보여주는 툴팁이므로 따로 감싸지 않고, 버튼의 aria-label을 그대로 툴팁으로 씁니다. 이름과 같은 내용은 설명으로 다시 연결하지 않습니다."
      ></mm-text-block>
      <mm-text-block
        level="4"
        heading="정보 설명형"
        description="이미 존재하는 이름의 부가 설명이므로, 대상 요소의 설명(aria-description)으로 연결합니다."
      ></mm-text-block>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-tooltip content="해임건의 요건">
    <mm-icon slot="trigger" name="help-circle" role="img" aria-label="도움말" tabindex="0"></mm-icon>
</mm-tooltip>`}
    ></mm-component-anatomy>

    <mm-component-section
      heading="GuideTip"
      description="arrow tooltip, tourtip, coachmark, 로딩 시점에 이미 열려 있다. doorhanger/pointing arrow."
    ></mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
