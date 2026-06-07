import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { MenuItemBase } from '../menu-item-base'
import { ToggleMixin } from '../menuitem.mixins'

@customElement('mm-menu-item-switch')
export class MenuItemSwitch extends ToggleMixin(MenuItemBase) {
  protected override getRole() {
    return 'menuitemcheckbox'
  }

  protected override renderAction() {
    return html`
      <mm-switch
        slot="trailing"
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${this.handleControlChange}
      ></mm-switch>
    `
  }
}

export default MenuItemSwitch
