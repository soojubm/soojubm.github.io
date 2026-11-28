import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/tag/tag'

@customElement('fff-timeline-item')
export class TimelineItem extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    /* 행에 딸린 세부 목록은 행의 글자 자리에 맞춰 들여쓴다. */
    ::slotted(fff-text-list) {
      margin-left: calc(var(--size-40) + var(--space-2));
    }
  `
  @property({ type: String }) label = ''

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'listitem')
  }

  render() {
    return html`
      <fff-tag>${this.label}</fff-tag>
      <slot></slot>
    `
  }
}
