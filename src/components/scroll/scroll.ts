import { LitElement, html } from 'lit'
import type { PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { scrollStyles } from './scroll.styles'

type Direction = 'row' | 'column'

/**
 * 내용이 넘칠 때 스크롤되는 컨테이너.
 * flex·grid와 달리 내부 래퍼 없이 host 자체가 스크롤 컨테이너이므로,
 * scrollLeft·scrollTop 등 스크롤 API를 host에서 바로 사용할 수 있다.
 */
@customElement('mm-scroll')
export class Scroll extends LitElement {
  @property({ type: String, reflect: true }) direction: Direction = 'row'
  @property({ type: String }) gap = ''
  @property({ type: Boolean, reflect: true, attribute: 'hide-scrollbar' }) hideScrollbar = false

  static styles = scrollStyles

  updated(changed: PropertyValues) {
    if (changed.has('gap')) {
      this.style.gap = this.gap
        ? /^\d+$/.test(this.gap)
          ? `var(--space-${this.gap})`
          : this.gap
        : ''
    }
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-scroll': Scroll
  }
}
