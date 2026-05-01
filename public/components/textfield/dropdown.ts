import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('mm-dropdown')
class Dropdown extends LitElement {
  @state() private isOpen = false
  @state() private selectedLabel = 'Select an option (this is web component)'
  @state() private options: { label: string; value: string }[] = []

  static styles = css`
    .dropdown {
      position: relative;
    }
    .dropdown-button {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 10px var(--space-3);
      border: var(--border-stronger);
      border-radius: var(--radius);
      background-color: var(--color-background);
      color: var(--color-foreground);
      cursor: pointer;
      text-align: left;
      font-family: inherit;
    }
    .dropdown-button[aria-pressed='true'] mm-icon {
      transform: rotate(180deg);
    }
    .dropdown-list {
      display: none;
      max-height: 200px;
      overflow-y: auto;
      padding: var(--space-1);
      border: var(--border-stronger);
      border-radius: var(--radius);
      border-top: none;
      background-color: var(--color-background);
      box-shadow: var(--shadow);
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 10;
    }
    .dropdown-list.open {
      display: block;
    }
  `

  connectedCallback(): void {
    super.connectedCallback()
    this.options = Array.from(this.querySelectorAll('option')).map(option => ({
      label: option.textContent || '',
      value: option.value,
    }))
  }

  private toggleOpen() {
    this.isOpen = !this.isOpen
  }

  private selectOption(option: { label: string; value: string }) {
    this.selectedLabel = option.label
    this.isOpen = false
    this.dispatchEvent(
      new CustomEvent('change', { detail: option.value, bubbles: true, composed: true }),
    )
  }

  render() {
    return html`
      <div>
        <button
          class="dropdown-button"
          haspopup="listbox"
          aria-pressed="${this.isOpen}"
          @click="${this.toggleOpen}"
        >
          ${this.selectedLabel}
          <mm-icon name="nav-arrow-down" size="small"></mm-icon>
        </button>
        <div class="dropdown-list ${this.isOpen ? 'open' : ''}">
          ${this.options.map(
            option =>
              html`<mm-menuitem
                label="${option.label}"
                @click="${() => this.selectOption(option)}"
              ></mm-menuitem>`,
          )}
        </div>
      </div>
    `
  }
}

export default Dropdown
