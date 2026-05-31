import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { MenuItemRow } from './menu-item-row'

/**
 * 우측에 토글 스위치가 있는 메뉴 항목.
 * 설정·환경 토글처럼 즉시 on/off 되는 상태를 표현합니다.
 */
@customElement('mm-menu-item-switch')
export class MenuItemSwitch extends MenuItemRow {
  @property({ type: Boolean, reflect: true }) checked = false
  @property({ type: String }) value = ''

  protected override get interactive() {
    return true
  }

  protected override getRole() {
    return 'menuitemcheckbox'
  }

  protected override getAriaChecked(): string | undefined {
    return String(this.checked)
  }

  private commitChecked(checked: boolean) {
    if (this.disabled) return

    this.checked = checked

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          checked: this.checked,
          value: this.value,
        },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private handleRowClick() {
    this.commitChecked(!this.checked)
  }

  private handleControlChange(e: Event) {
    e.stopPropagation()
    const { checked } = (e as CustomEvent<{ checked: boolean }>).detail
    this.commitChecked(checked)
  }

  override connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this.handleRowClick)
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this.handleRowClick)
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
