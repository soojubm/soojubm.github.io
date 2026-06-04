import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { MenuItemRow } from '../menu-item-row'
import { ToggleMixin } from '../menuitem.mixins'

@customElement('mm-menu-item-checkbox')
export class MenuItemCheckbox extends ToggleMixin(MenuItemRow) {
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
