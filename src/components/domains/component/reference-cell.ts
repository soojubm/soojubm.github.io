import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/icon/icon'
import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { focusRingStyles, resetStyles } from '@/stylesheets/shared.styles'

@customElement('mm-reference-cell')
export class ReferenceCell extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        border-right: var(--border);
        border-bottom: var(--border);
      }

      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-2);
        min-height: var(--size-48);
        padding: var(--space-3) var(--space-6);
        color: var(--foreground-color);
        font-family: var(--font-family-code);
        font-size: var(--font-size-14);
        text-transform: uppercase;
        transition: background-color var(--transition-duration) var(--transition-easing);
      }

      .text {
        display: flex;
        flex-direction: column;
      }

      a:hover {
        background: var(--background-subtle-color);
      }

      a:focus-visible {
        ${focusRingStyles};
      }
    `,
  ]
  @property({ type: String }) href = ''
  @property({ type: String }) brand = ''
  @property({ type: String }) page = ''

  render() {
    return html`
      <a href=${this.href} target="_blank" rel="noopener noreferrer">
        <span class="text">
          <span>${this.brand}</span>
          ${this.page
            ? html`
                <span>${this.page}</span>
              `
            : nothing}
        </span>
        <mm-icon name=${ICON_NAMES.EXTERNAL_LINK} aria-hidden="true"></mm-icon>
      </a>
    `
  }
}
