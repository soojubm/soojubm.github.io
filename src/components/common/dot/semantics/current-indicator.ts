import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/dot/dot'
import '@/components/overlay/tooltip'

@customElement('mm-current-indicator')
export class CurrentIndicator extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }

    /* 툴팁은 트리거 위에서 열리므로, 점이 아니라 24 영역 전체를 트리거로 잡고 점은 가운데 둔다. */
    [slot='trigger'] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--size-24);
      height: var(--size-24);
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-hidden', 'true')
  }

  render() {
    return html`
      <mm-tooltip content="현재 위치" placement="bottom">
        <span slot="trigger">
          <mm-dot tone="gray" size="6"></mm-dot>
        </span>
      </mm-tooltip>
    `
  }
}
