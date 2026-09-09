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
    if (this.emoji) {
      return html`
        <mm-avatar variant="secondary" size="48">
          <span class="feature-emoji" aria-hidden="true">${this.emoji}</span>
        </mm-avatar>
      `
    }
    if (!this.icon) return nothing

    return html`
      <mm-avatar variant="secondary" size="48">
        <mm-icon size="large" name=${this.icon}></mm-icon>
      </mm-avatar>
    `
  }
}
