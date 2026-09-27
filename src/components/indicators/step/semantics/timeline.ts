import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/indicators/step/semantics/timeline-item'

/**
 * <mm-timeline>
 * 지나간 이력을 최근 것부터 한 선 위에 세우는 목록입니다.
 * 항목을 잇는 세로 선은 항목의 leading 아바타 가운데를 지납니다.
 */
@customElement('mm-timeline')
export class Timeline extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      position: relative;
      isolation: isolate;
    }

    :host::before {
      content: '';
      width: 1px;
      background: var(--border-color);
      position: absolute;
      top: 0;
      bottom: 0;
      left: calc(var(--size-40) / 2);
    }

    /* 선은 항목 뒤로 지나가야 하므로 항목을 선 위로 올린다. */
    ::slotted(*) {
      position: relative;
      z-index: var(--material-zindex-elevated);
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'list')
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
