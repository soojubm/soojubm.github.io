import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AriaCurrent } from '@/types'

import '@/components/common/dot/semantics/current-indicator'
import { dotBelowStyles } from '@/components/common/dot/dot.styles'
import {
  iconButtonStyles,
  iconButtonVariantSkin,
} from '@/components/common/icon-button/icon-button.styles'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('fff-page-button')
export class PageButton extends LitElement {
  static styles = [
    resetStyles,
    iconButtonStyles,
    css`
      :host {
        ${iconButtonVariantSkin('ghost')}
      }

      button[aria-current='page'] {
        border-color: var(--interaction-selected-border-color);
        color: var(--interaction-selected-foreground-color);
        position: relative;
      }

      fff-current-indicator {
        ${dotBelowStyles};
      }
    `,
  ]
  @property({ type: Number }) page = 1
  @property({ type: String, attribute: 'aria-current', reflect: true }) ariaCurrent: AriaCurrent =
    null
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  render() {
    return html`
      <button
        type="button"
        aria-label=${this.ariaLabel || `${this.page} 페이지로 이동`}
        aria-current=${ifDefined(this.ariaCurrent ?? undefined)}
        ?disabled=${this.disabled}
      >
        ${this.page} ${this.renderCurrentIndicator()}
      </button>
    `
  }

  private renderCurrentIndicator() {
    if (this.ariaCurrent !== 'page') return nothing

    return html`
      <fff-current-indicator></fff-current-indicator>
    `
  }
}
