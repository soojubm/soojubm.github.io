import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-option-row')
class OptionRow extends LitElement {
  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String, attribute: 'primarytext' }) primaryText = ''
  @property({ type: String, attribute: 'secondarytext' }) secondaryText = ''

  static styles = css`
    :host {
      display: block;
    }
    :host([disabled]) button {
      cursor: default;
      opacity: 0.5;
    }
    button {
      all: unset;
      display: block;
      width: 100%;
      cursor: pointer;
    }
    .indicator {
      width: 16px;
      height: 16px;
      border-radius: 999px;
      border: 1.5px solid rgba(0, 0, 0, 0.35);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: transparent;
    }
    :host([selected]) .indicator {
      border-color: currentColor;
    }
    :host([selected]) .dot {
      background: currentColor;
    }
  `

  private toggleSelection() {
    if (this.disabled) return
    this.selected = !this.selected
    this.dispatchEvent(
      new CustomEvent('mm-change', {
        detail: { selected: this.selected },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <button
        role="option"
        aria-selected="${String(this.selected)}"
        ?disabled="${this.disabled}"
        @click="${this.toggleSelection}"
      >
        <mm-list-row primarytext="${this.primaryText}" secondarytext="${this.secondaryText}">
          <slot name="avatar" slot="avatar"></slot>
          <span slot="action" class="indicator"><span class="dot"></span></span>
        </mm-list-row>
      </button>
    `
  }
}

export default OptionRow
