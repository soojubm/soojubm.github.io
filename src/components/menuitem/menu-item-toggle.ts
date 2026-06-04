import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { MenuItemRow } from './menu-item-row'

/**
 * 체크박스·스위치처럼 on/off 상태를 가지는 메뉴 항목의 공통 베이스.
 * checked/value 토글 로직과 이벤트 바인딩을 여기서 관리하고
 * 서브클래스는 renderAction()과 getRole()만 구현하면 됩니다.
 */
export abstract class MenuItemToggle extends MenuItemRow {
  @property({ type: Boolean, reflect: true }) checked = false
  @property({ type: String }) value = ''

  protected override get interactive() {
    return true
  }

  protected override getAriaChecked(): string | undefined {
    return String(this.checked)
  }

  protected commitChecked(checked: boolean) {
    if (this.disabled) return
    this.checked = checked
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _handleRowClick = () => {
    this.commitChecked(!this.checked)
  }

  protected handleControlChange = (e: Event) => {
    e.stopPropagation()
    const { checked } = (e as CustomEvent<{ checked: boolean }>).detail
    this.commitChecked(checked)
  }

  // inner 컨트롤(checkbox·switch)과 이중 tab stop 방지 — host click 리스너로 키보드 대응
  protected override renderItem() {
    return html`
      <div
        class="item"
        role=${this.getRole()}
        data-tone=${ifDefined(this.tone || undefined)}
        ?data-interactive=${this.interactive}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        aria-checked=${ifDefined(this.getAriaChecked())}
      >
        ${this.renderContent()}
      </div>
    `
  }

  override connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this._handleRowClick)
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this._handleRowClick)
  }
}
