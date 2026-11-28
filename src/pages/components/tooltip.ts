import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'popover.html', label: 'Popover' },
  { href: 'notice.html', label: 'Notice' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://carbondesignsystem.com/components/toggletip/usage/',
    label: 'Carbon - Toggletip',
  },
  {
    href: 'https://playbook.ebay.com/design-system/components/tooltip',
    label: 'eBay Playbook - Tooltip',
  },
  {
    href: 'https://playbook.ebay.com/design-system/components/tourtip',
    label: 'eBay Playbook - Tourtip',
  },
  {
    href: 'https://spectrum.adobe.com/page/coach-mark/',
    label: 'Spectrum - Coach mark',
  },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-tooltip'),
  { name: 'slot: trigger', type: 'HTMLElement' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Disclosure',
    description:
      '설명이 필요 없는 플로우와 인터페이스를 우선하세요. 툴팁은 없을수록 좋으며, 접근성을 위한 최소한의 설명만 제공합니다. 작은 화면에서 바텀 시트나 팝오버로 제공하는 것이 좋다. 사용자가 반드시 숙지해야 하는 중요한 정보를 툴팁으로 제공하지 마세요.',
  },
  {
    heading: 'Contextual',
    description: 'TODO',
  },
]

const defaultCode = `<fff-tooltip content="...">
  <fff-icon slot="trigger" name="help-circle" role="img" aria-label="해임건의 요건 도움말" tabindex="0"></fff-icon>
</fff-tooltip>`

const placementCode = `<fff-button-group>
  <fff-icon-button icon="user" aria-label="좌측 정렬" tooltip-placement="bottom-start"></fff-icon-button>
  <fff-icon-button icon="user" aria-label="가운데 정렬" tooltip-placement="bottom"></fff-icon-button>
  <fff-icon-button icon="user" aria-label="우측 정렬" tooltip-placement="bottom-end"></fff-icon-button>
</fff-button-group>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Tooltip"
      description="트리거 요소에 붙는 짧은 보조 설명입니다. 마우스를 올리거나 포커스가 닿을 때만 트리거 곁에 나타나고 벗어나면 사라지므로, 사용자는 화면을 어지럽히지 않은 채 필요한 순간에 용어의 뜻이나 정보의 근거를 확인할 수 있습니다."
    ></fff-page-header>

    <fff-component-aka .items=${['Coachmark']}></fff-component-aka>

    <fff-flex direction="column" gap="4">
      <fff-tab-list value="default" variant="pill">
        <fff-tab value="default">Default</fff-tab>
        <fff-tab value="placement">Placement</fff-tab>
      </fff-tab-list>
      <fff-tab-panel value="default">
        <fff-component-example>
          <fff-tooltip
            content="제1항의 해임건의는 국회재적의원 3분의 1 이상의 발의에 의하여 국회재적의원 과반수의 찬성이 있어야 한다."
          >
            <fff-icon
              slot="trigger"
              name="help-circle"
              role="img"
              aria-label="해임건의 요건 도움말"
              tabindex="0"
            ></fff-icon>
          </fff-tooltip>
        </fff-component-example>
        <fff-component-code .code=${defaultCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="placement">
        <fff-component-example>
          <fff-button-group>
            <fff-icon-button
              icon=${ICON_NAMES.USER}
              aria-label="좌측 정렬"
              tooltip-placement="bottom-start"
            ></fff-icon-button>
            <fff-icon-button
              icon=${ICON_NAMES.USER}
              aria-label="가운데 정렬"
              tooltip-placement="bottom"
            ></fff-icon-button>
            <fff-icon-button
              icon=${ICON_NAMES.USER}
              aria-label="우측 정렬"
              tooltip-placement="bottom-end"
            ></fff-icon-button>
          </fff-button-group>
        </fff-component-example>
        <fff-component-code .code=${placementCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>
    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-tooltip-bubble']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-text-list
        .texts=${[
          'hover뿐 아니라 키보드 포커스로도 열 수 있어야 한다.',
          '트리거를 가리키는 화살표는 두지 않는다. 사용자가 포인터나 손가락으로 직접 연 표면이라 어디에서 나왔는지 이미 분명하다. 화살표는 로딩 시점에 이미 열려 대상을 지목하는 GuideTip이 쓴다.',
          'short text, long form text. Material Design 3 rich tooltip(title, description, actions-link/button) / plain tooltip',
        ]}
      ></fff-text-list>

      <fff-content-section heading-level="3" heading="접근성">
        <fff-text-block
          level="4"
          heading="액션 보완형"
          description="아이콘 버튼의 이름을 보여주는 툴팁이라 따로 감싸지 않습니다. 이름과 같은 내용을 설명으로 다시 읽어 주지 않습니다."
        ></fff-text-block>
        <fff-text-block
          level="4"
          heading="정보 설명형"
          description="이미 이름이 있는 대상의 부가 설명이라, 보조기술에는 이름과 별개의 설명으로 전달됩니다."
        ></fff-text-block>
      </fff-content-section>
    </fff-component-guide>

    <fff-component-section
      heading="GuideTip"
      description="TODO arrow tooltip, tourtip, coachmark, 로딩 시점에 이미 열려 있다. doorhanger/pointing arrow."
    ></fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
