import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { spaceTokens } from '@/stylesheets/shared.styles'
import type { Space } from '@/stylesheets/shared.types'
import { buildAttributeRules } from '@/utils'

/**
 * 문서·예제에서 실제 UI가 들어갈 자리를 대신하는 장식용 박스.
 * 높이·배경·모서리는 소비처가 CSS custom property로 직접 설정한다.
 * 슬롯에는 치수 같은 짧은 안내 텍스트를 넣으며, 가운데에 앉는다.
 * `space`를 주면 박스 대신 그 간격만큼의 높이를 막대로 그려 간격의 크기를 드러낸다.
 */
@customElement('mm-ui-placeholder')
export class UiPlaceholder extends LitElement {
  static styles = css`
    :host {
      --ui-placeholder-height: var(--size-80);
      --ui-placeholder-background-color: var(--primary-subtle-color);
      --ui-placeholder-border-radius: var(--border-radius-large);

      display: block;
    }

    ${unsafeCSS(buildAttributeRules('space', spaceTokens('--ui-placeholder-height')))}

    :host([space]) .placeholder {
      gap: var(--space-2);
      background: transparent;
    }

    :host([space]) .placeholder::before {
      content: '';
      align-self: stretch;
      width: var(--space-1);
      background: var(--primary-color);
    }

    .placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: var(--ui-placeholder-height);
      box-sizing: border-box;
      border: var(--border-transparent);
      border-radius: var(--ui-placeholder-border-radius);
      background: var(--ui-placeholder-background-color);
    }
  `

  /** 박스 대신 그릴 간격 단계. 레이아웃 컴포넌트의 gap과 같은 단계를 쓴다. */
  @property({ type: String, reflect: true }) space?: Space

  render() {
    return html`
      <div class="placeholder" aria-hidden="true"><slot></slot></div>
    `
  }
}
