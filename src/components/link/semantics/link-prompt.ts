import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

@customElement('mm-link-prompt')
export class LinkPrompt extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-1);
    }
  `

  @property({ type: String }) icon?: IconName
  @property({ type: String }) message = ''
  @property({ type: String, attribute: 'link-label' }) linkLabel = ''
  @property({ type: String }) href = ''
  @property({ type: Boolean }) external = false

  render() {
    return html`
      ${this.renderIcon()}
      <mm-paragraph>
        ${this.message}
        <mm-link href=${this.href} ?external=${this.external}>${this.linkLabel}</mm-link>
      </mm-paragraph>
    `
  }

  private renderIcon() {
    if (!this.icon) return nothing

    return html`
      <mm-icon name=${this.icon} aria-hidden="true"></mm-icon>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-link-prompt': LinkPrompt
  }
}
