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
    // 라디오 버튼은 이미 체크되어 있다면 클릭해도 해제되지 않습니다.
    if (this.checked) return

    this.checked = true

    // 부모 그룹으로 변경 이벤트를 보냅니다.
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

  private handleRadioClick(e: Event) {
    e.stopPropagation()
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
      <input
        type="radio"
        .name=${this.name}
        .value=${this.value}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @click=${this.handleRadioClick}
        @change=${this.handleSelect}
      />
    `
  }
}

export default MenuItemRadio
