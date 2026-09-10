import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderPage } from '@/components/layouts/base-layouts'
import './tooltip.css'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'popover.html', label: 'Popover' },
  { href: 'notice.html', label: 'Notice' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'content', type: 'string' },
  { name: 'placement', type: "'left' | 'center' | 'right'", optional: true },
  { name: 'open', type: 'boolean = false', optional: true },
  { name: 'slot: trigger', type: 'HTMLElement' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'tooltip-max-width', default: '320px' },
  { name: 'tooltip-padding', default: '0.5rem var(--space-3)' },
  { name: 'tooltip-border-radius', default: 'var(--radius)' },
  { name: 'tooltip-background-color', default: 'var(--background-strong-color)' },
  { name: 'tooltip-text-color', default: 'var(--background-color)' },
  { name: 'tooltip-shadow', default: 'var(--surface-base-shadow)' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Disclosure',
    description:
      '설명이 필요 없는 플로우와 인터페이스를 우선하세요. 툴팁은 없을수록 좋으며, 접근성을 위한 최소한의 설명만 제공합니다. 작은 화면에서 바텀 시트나 팝오버로 제공하는 것이 좋다. 사용자가 반드시 숙지해야 하는 중요한 정보를 툴팁으로 제공하지 마세요.',
  },
]

const main = html`
  <mm-page>
    <mm-page-header
      heading="Tooltip"
      description="용어를 설명하거나 정보의 근거를 보충합니다."
    ></mm-page-header>

    <mm-component-aka .items=${['Coachmark']}></mm-component-aka>

    <mm-component-example>
      <mm-flex gap="2">
        <mm-tooltip content="로그인" placement="center">
          <mm-icon-button slot="trigger" icon="user"></mm-icon-button>
        </mm-tooltip>
        <mm-tooltip content="우측 정렬" placement="right">
          <mm-icon-button slot="trigger" icon="user"></mm-icon-button>
        </mm-tooltip>
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
      </mm-flex>
      <mm-separator></mm-separator>
      <span
        class="tooltip has-tooltip-fade"
        data-tooltip="Just like this one."
        style="display: inline; width: auto; position: relative"
      >
        Any element
      </span>
    </mm-component-example>
    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
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
        description="아이콘 버튼의 실질적인 이름을 대체하므로, 버튼의 aria-label 값과 툴팁 텍스트를 일치시키거나 aria-labelledby로 강하게 연결합니다."
      ></mm-text-block>
      <mm-text-block
        level="4"
        heading="정보 설명형"
        description="이미 존재하는 텍스트의 부가 설명이므로, aria-describedby를 사용해 참고용 설명임을 브라우저에 알립니다."
      ></mm-text-block>
    </mm-component-guide>

    <mm-component-section
      heading="GuideTip"
      description="arrow tooltip, tourtip, coachmark, 로딩 시점에 이미 열려 있다. doorhanger/pointing arrow."
    ></mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </mm-page>
`

renderPage(main)
