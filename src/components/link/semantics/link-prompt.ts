import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

@customElement('mm-link-prompt')
export class LinkPrompt extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      color: var(--color-foreground);
    }

    mm-icon {
      flex: 0 0 auto;
    }
  `

  @property({ type: String }) message = ''
  @property({ type: String, attribute: 'link-label' }) linkLabel = ''
  @property({ type: String }) href = ''
  @property({ type: String }) icon?: IconName
  @property({ type: Boolean }) external = false

  render() {
    const hasIcon = Boolean(this.icon)

    return html`
      ${hasIcon
        ? html`
            <mm-icon name=${this.icon} aria-hidden="true"></mm-icon>
          `
        : nothing}

      <mm-paragraph>${this.message}</mm-paragraph>

      <mm-link href=${this.href} ?external=${this.external}>${this.linkLabel}</mm-link>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-link-prompt': LinkPrompt
  }
}
