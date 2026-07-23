import { html } from 'lit'
import { renderDocumentLayout } from '../../../layouts/document-layout'

const main = html`
  <main class="page">
    <mm-page-header
      heading="Tooltip"
      description="용어를 설명하거나 정보의 근거를 보충합니다."
    ></mm-page-header>

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
    <style>
      [data-tooltip]:not([disabled]).has-tooltip-fade:before {
        transition: opacity 0.15s linear, visibility 0.15s linear;
      }
      [data-tooltip]:not([disabled]):hover:before {
        opacity: 1;
        visibility: visible;
      }
      [data-tooltip]:not([disabled]):before {
        display: inline-block;
        /* hyphens: auto; */
        content: attr(data-tooltip);
        opacity: 0;
        font-size: 12px;
        overflow: hidden;
        pointer-events: none;
        visibility: hidden;
        background: goldenrod;
        border-radius: var(--radius);
        padding: var(--space-1) var(--space-2);
        text-overflow: ellipsis;
        white-space: pre;
        position: absolute;
        right: auto;
        bottom: auto;
        left: 50%;
        top: 0;
        z-index: 35;
        margin-top: -5px;
        /* margin-bottom: auto; */
        -webkit-transform: translate(-50%, -100%);
        transform: translate(-50%, -100%);
      }
    </style>

    <mm-component-props>
      <mm-prop name="content" type="string"></mm-prop>
      <mm-prop name="placement" type="string" optional></mm-prop>
      <mm-prop name="slot: trigger" type="HTMLElement"></mm-prop>
    </mm-component-props>

    <mm-component-tokens>
      <mm-token name="tooltip-max-width" default="320px"></mm-token>
      <mm-token name="tooltip-padding" default="0.5rem var(--space-3)"></mm-token>
      <mm-token name="tooltip-border-radius" default="var(--radius)"></mm-token>
      <mm-token name="tooltip-background-color" default="var(--background-strong-color)"></mm-token>
      <mm-token name="tooltip-text-color" default="var(--foreground-color-on-solid)"></mm-token>
      <mm-token name="tooltip-shadow" default="var(--surface-base-shadow)"></mm-token>
    </mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list>
        <mm-feature
          heading="Supplementary"
          description="설명이 필요 없는 플로우와 인터페이스를 우선하세요. 툴팁은 없을수록 좋으며, 접근성을 위한 최소한의 설명만 제공합니다.작은 화면에서 바텀 시트나 팝오버로 제공하는 것이 좋다. 사용자가 반드시 숙지해야 하는 중요한 정보를 툴팁으로 제공하지 마세요."
        ></mm-feature>
        <mm-feature
          heading="Anchored"
          description="화면 좌표가 아니라 트리거 요소가 위치를 결정합니다. 방향과 정렬은 placement prop 하나로 지정합니다. useFloating"
        ></mm-feature>
      </mm-component-feature-list>
      <mm-text-list
        texts='[
        "내용은 보조기술이 읽을 수 있도록 대상 요소의 설명으로 연결하고, hover뿐 아니라 키보드 포커스로도 열 수 있어야 합니다.",
        "short text, long form text. MD3 rich tooltip(title, description, actions-link/button) / plain tooltip",
      ]'
      ></mm-text-list>

      <mm-heading level="3">접근성 팁</mm-heading>
      <mm-paragraph>
        액션 보완형: 아이콘 버튼의 실질적인 이름을 대체하므로, 버튼의 aria-label 값과 툴팁 텍스트를
        일치시키거나 aria-labelledby로 강하게 연결합니다.
      </mm-paragraph>
      <mm-paragraph>
        정보 설명형: 이미 존재하는 텍스트의 부가 설명이므로, aria-describedby를 사용해 참고용
        설명임을 브라우저에 알립니다.
      </mm-paragraph>
    </mm-component-guide>

    <mm-component-section
      heading="GuideTip"
      description="arrow tooltip, tourtip, coachmark, 로딩 시점에 이미 열려 있다. doorhanger/pointing arrow."
    ></mm-component-section>

    <mm-component-aka items='["Coachmark"]'></mm-component-aka>
    <mm-component-related>
      <mm-button-group>
        <mm-hashtag-link href="popover.html">Popover</mm-hashtag-link>
        <mm-hashtag-link href="notice.html">Notice</mm-hashtag-link>
      </mm-button-group>
    </mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
