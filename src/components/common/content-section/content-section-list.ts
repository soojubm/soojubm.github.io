import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * <mm-content-section-list>
 * 여러 mm-content-section을 세로로 쌓고 구획 사이 간격만 책임지는 그룹 컨테이너입니다.
 * 간격은 내부에서 고정하며, 소비처는 자식으로 mm-content-section만 넣습니다.
 */
@customElement('mm-content-section-list')
export class ContentSectionList extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-8);
      }
    `,
  ]

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-content-section-list': ContentSectionList
  }
}
