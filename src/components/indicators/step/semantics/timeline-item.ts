import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/tag/tag'

/**
 * <mm-timeline-item>
 * 시점을 태그로 앞세우고 그 아래 그 시점의 기록을 쌓는 이력 한 칸입니다.
 */
@customElement('mm-timeline-item')
export class TimelineItem extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    /* 행에 딸린 세부 목록은 행의 글자 자리에 맞춰 들여쓴다. */
    ::slotted(mm-text-list) {
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
      <mm-tag>${this.label}</mm-tag>
      <slot></slot>
    `
  }
}
