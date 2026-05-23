import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { MenuItemRow } from './menu-item-row'

@customElement('mm-menu-item-checkbox')
export class MenuItemCheckbox extends MenuItemRow {
  @property({ type: Boolean, reflect: true })
  checked = false

  protected override getRole() {
    return 'menuitemcheckbox'
  }

  protected override getAriaChecked(): string | undefined {
    return String(this.checked)
  }

  private handleToggle() {
    if (this.disabled) return

    this.checked = !this.checked

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          checked: this.checked,
        },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private handleCheckboxClick(e: Event) {
    e.stopPropagation()
  }

  override connectedCallback() {
    super.connectedCallback()

    this.addEventListener('click', this.handleToggle)
  }

  override disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener('click', this.handleToggle)
  }

  protected override renderAction() {
    return html`
      <input
        type="checkbox"
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @click=${this.handleCheckboxClick}
      />
    `
  }
}

export default MenuItemCheckbox
