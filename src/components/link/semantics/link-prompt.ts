import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { IconName } from '@/components/icon-button/semantics/icon-names'

@customElement('mm-link-prompt')
export class LinkPrompt extends LitElement {
  static styles = css`
    .link-prompt {
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
  @property({ type: String, attribute: 'action-label' }) actionLabel = ''
  @property({ type: String }) href = ''
  @property({ type: String }) icon?: IconName
  @property({ type: Boolean }) external = false

  render() {
    return html`
      <span class="link-prompt">
        ${this.icon
          ? html`
              <mm-icon name=${this.icon}></mm-icon>
            `
          : nothing}
        <mm-paragraph>${this.message}</mm-paragraph>
        <mm-link href=${this.href} ?external=${this.external}>${this.actionLabel}</mm-link>
      </span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-link-prompt': LinkPrompt
  }
}
