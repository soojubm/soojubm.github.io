import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { Space, FlexDirection } from '@/stylesheets/shared.types'

import { scrollStyles } from '@/components/common/scroll/scroll.styles'
import '@/components/common/scroll/semantics/scroll-hint'
import { MEDIA_QUERY } from '@/constants'
import { MediaQueryController } from '@/controllers/media-query-controller'

@customElement('fff-scroll')
export class Scroll extends LitElement {
  static styles = scrollStyles
  @property({ type: String, reflect: true }) direction: FlexDirection = 'row'
  @property({ type: String, reflect: true }) gap?: Space
  @property({ type: Boolean, reflect: true, attribute: 'hide-scrollbar' }) hideScrollbar = false

  // 좁은 화면은 터치 스와이프로 넘기므로 prev·next 버튼을 렌더하지 않는다.
  private compactQuery = new MediaQueryController(this, MEDIA_QUERY.compact)

  render() {
    if (this.direction === 'column' || this.compactQuery.matches) {
      return html`
        <slot></slot>
      `
    }

    return html`
      <fff-scroll-hint placement="start"></fff-scroll-hint>
      <slot></slot>
      <fff-scroll-hint placement="end"></fff-scroll-hint>
    `
  }
}
