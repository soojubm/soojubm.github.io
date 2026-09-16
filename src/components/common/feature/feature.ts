import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { featureStyles } from '@/components/common/feature/feature.styles'
import { type IconName } from '@/components/common/icon/icon-names'
import '@/components/common/text/semantics/text-block'
import '@/components/common/avatar'
import '@/components/common/icon'

@customElement('mm-feature')
export class Feature extends LitElement {
  static styles = [featureStyles]
  @property({ type: String }) icon?: IconName
  @property({ type: String }) emoji = ''
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      ${this.renderVisual()}

      <mm-text-block
        level="3"
        ?centered=${this.centered}
        .heading=${this.heading}
        .description=${this.description}
      ></mm-text-block>

      <slot></slot>
    `
  }

  private renderVisual() {
    if (!this.emoji && !this.icon) return nothing

    return html`
      <mm-avatar variant="secondary" size="48">${this.renderGlyph()}</mm-avatar>
    `
  }

  // 제품 의미를 갖는 기호는 icon, 콘텐츠로 고른 글자는 emoji로 받고, 둘이 함께 오면 emoji를 우선한다.
  private renderGlyph() {
    if (this.emoji) {
      return html`
        <span class="feature-emoji" aria-hidden="true">${this.emoji}</span>
      `
    }

    return html`
      <mm-icon size="large" name=${this.icon}></mm-icon>
    `
  }
}
