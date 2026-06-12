import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../../dropdown/dropdown'
import '../../button/button'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'

@customElement('mm-model-selector')
export class ModelSelector extends LitElement {
  @property({ type: String, reflect: true }) value = 'claude-sonnet'

  static styles = css`
    :host {
      display: contents;
    }

    mm-dropdown::part(dropdown) {
      width: auto;
    }

    mm-dropdown::part(list) {
      top: auto;
      bottom: calc(100% + 4px);
      left: 0;
      right: auto;
      transform-origin: bottom center;
    }

    mm-button {
      --button-icon-gap: var(--space-1);
    }

    mm-button mm-icon {
      transition: transform 160ms ease;
    }

    mm-button[aria-expanded='true'] mm-icon {
      transform: rotate(180deg);
    }
  `

  render() {
    return html`
      <mm-dropdown .value=${this.value}>
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
      </mm-dropdown>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-model-selector': ModelSelector
  }
}
