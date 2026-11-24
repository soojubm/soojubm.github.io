import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { Space, FlexDirection } from '@/stylesheets/shared.types'

import { scrollStyles } from '@/components/common/scroll/scroll.styles'
import '@/components/common/scroll/semantics/scroll-hint'

@customElement('mm-scroll')
export class Scroll extends LitElement {
  static styles = scrollStyles
  @property({ type: String, reflect: true }) direction: FlexDirection = 'row'
  @property({ type: String, reflect: true }) gap?: Space
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
}
