import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { PropertyValues } from 'lit'

import { scrollStyles } from '@/components/common/scroll/scroll.styles'
import { resolveSpaceToken } from '@/utils'

type Direction = 'row' | 'column'

/**
 * 내용이 넘칠 때 스크롤되는 컨테이너.
 * flex·grid와 달리 내부 래퍼 없이 host 자체가 스크롤 컨테이너이므로,
 * scrollLeft·scrollTop 등 스크롤 API를 host에서 바로 사용할 수 있다.
 */
@customElement('mm-scroll')
export class Scroll extends LitElement {
  static styles = scrollStyles

  @property({ type: String, reflect: true }) direction: Direction = 'row'
  @property({ type: String }) gap = ''
  @property({ type: Boolean, reflect: true, attribute: 'hide-scrollbar' }) hideScrollbar = false

  render() {
    return html`
      <slot></slot>
    `
  }

  updated(changed: PropertyValues) {
    if (!changed.has('gap')) return

    const gap = resolveSpaceToken(this.gap)

    if (gap) this.style.setProperty('--scroll-gap', gap)
    else this.style.removeProperty('--scroll-gap')
  }
}
