import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { PropertyValues } from 'lit'

import { scrollStyles } from '@/components/common/scroll/scroll.styles'
import { resolveSpaceToken } from '@/utils'
import '@/components/common/scroll/semantics/scroll-hint'

type Direction = 'row' | 'column'

/**
 * 내용이 넘칠 때 스크롤되는 컨테이너.
 * flex·grid와 달리 내부 래퍼 없이 host 자체가 스크롤 컨테이너이므로,
 * scrollLeft·scrollTop 등 스크롤 API를 host에서 바로 사용할 수 있다.
 * 가로 스크롤(row)은 양 끝에 mm-scroll-hint를 두어, 가려진 쪽을 흐림과 넘김 버튼으로 알린다.
 */
@customElement('mm-scroll')
export class Scroll extends LitElement {
  static styles = scrollStyles
  @property({ type: String, reflect: true }) direction: Direction = 'row'
  @property({ type: String }) gap = ''
  @property({ type: Boolean, reflect: true, attribute: 'hide-scrollbar' }) hideScrollbar = false

  render() {
    if (this.direction === 'column') {
      return html`
        <slot></slot>
      `
    }

    return html`
      <mm-scroll-hint placement="start"></mm-scroll-hint>
      <slot></slot>
      <mm-scroll-hint placement="end"></mm-scroll-hint>
    `
  }

  updated(changed: PropertyValues) {
    if (!changed.has('gap')) return

    const gap = resolveSpaceToken(this.gap)

    if (gap) this.style.setProperty('--scroll-gap', gap)
    else this.style.removeProperty('--scroll-gap')
  }
}
