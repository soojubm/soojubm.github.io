import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { MenuItemRow } from './menu-item-row'

@customElement('mm-menu-item-radio')
export class MenuItemRadio extends MenuItemRow {
  @property({ type: Boolean, reflect: true })
  checked = false

  @property({ type: String })
  value = ''

  @property({ type: String })
  name = ''

  protected override getRole() {
    return 'menuitemradio'
  }

  protected override getAriaChecked(): string | undefined {
    return String(this.checked)
  }

  private handleSelect() {
    if (this.disabled) return
    if (this.checked) return

    this.checked = true

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          checked: this.checked,
          value: this.value,
          name: this.name,
        },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private handleControlChange(e: Event) {
    e.stopPropagation()
    this.handleSelect()
  }

  override connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this.handleSelect)
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this.handleSelect)
  }

  protected override renderAction() {
    return html`
      <mm-radio
        .name=${this.name}
        .value=${this.value}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${this.handleControlChange}
      ></mm-radio>
    `
  }
}

export default MenuItemRadio
