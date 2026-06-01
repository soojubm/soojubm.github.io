import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { MenuItemToggle } from '../menu-item-toggle'

@customElement('mm-menu-item-checkbox')
export class MenuItemCheckbox extends MenuItemToggle {
  protected override getRole() {
    return 'menuitemcheckbox'
  }

  protected override renderAction() {
    return html`
      <mm-checkbox
        slot="trailing"
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${this.handleControlChange}
      ></mm-checkbox>
    `
  }
}

export default MenuItemCheckbox
