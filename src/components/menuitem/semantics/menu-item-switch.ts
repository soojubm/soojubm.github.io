import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { MenuItemToggle } from '../menu-item-toggle'

/**
 * 우측에 토글 스위치가 있는 메뉴 항목.
 * 설정·환경 토글처럼 즉시 on/off 되는 상태를 표현합니다.
 */
@customElement('mm-menu-item-switch')
export class MenuItemSwitch extends MenuItemToggle {
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
