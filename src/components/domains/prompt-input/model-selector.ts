import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/popover/semantics/select'
import '@/components/button/button'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'

@customElement('mm-model-selector')
export class ModelSelector extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    mm-button mm-icon {
      transition: transform 160ms ease;
    }

    mm-button[aria-expanded='true'] mm-icon {
      transform: rotate(180deg);
    }
  `

  @property({ type: String }) value = 'claude-sonnet'

  render() {
    return html`
      <mm-select .value=${this.value} placement="top-left">
        <mm-button
          slot="trigger"
          variant="tertiary"
          size="medium"
          icon=${ICON_NAMES.EXPAND}
          icon-position="trailing"
        >
          <slot></slot>
        </mm-button>
        <option value="claude-opus">Claude Opus</option>
        <option value="claude-sonnet" selected>Claude Sonnet</option>
        <option value="claude-haiku">Claude Haiku</option>
      </mm-select>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-model-selector': ModelSelector
  }
}
