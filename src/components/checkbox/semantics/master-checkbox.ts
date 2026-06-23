import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { checkboxStyles } from '../checkbox.styles'
import type { Checkbox } from '../checkbox'

@customElement('mm-master-checkbox')
export class MasterCheckbox extends LitElement {
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: string | null = null
  @property({ type: String, reflect: true }) size = 'large'
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean, reflect: true }) indeterminate = false

  static styles = [checkboxStyles]

  private _inputId = `master-checkbox-${
    crypto?.randomUUID?.() || Math.random().toString(36).substring(2, 9)
  }`

  private _controlledElement?: HTMLElement | null

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('change', this._syncFromControlledCheckboxes)
  }

  disconnectedCallback() {
    document.removeEventListener('change', this._syncFromControlledCheckboxes)
    super.disconnectedCallback()
  }

  firstUpdated() {
    this._controlledElement = this.ariaControls ? document.getElementById(this.ariaControls) : null
    this._syncFromControlledCheckboxes()
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('ariaControls')) {
      this._controlledElement = this.ariaControls
        ? document.getElementById(this.ariaControls)
        : null
      this._syncFromControlledCheckboxes()
    }
  }

  private get _controlledCheckboxes() {
    if (!this._controlledElement) return []

    return Array.from(this._controlledElement.querySelectorAll<Checkbox>('mm-checkbox')).filter(
      checkbox => !checkbox.disabled,
    )
  }

  private _setControlledCheckboxes(checked: boolean) {
    this._controlledCheckboxes.forEach(checkbox => {
      checkbox.checked = checked
      checkbox.indeterminate = false
    })
  }

  private _syncFromControlledCheckboxes = () => {
    const checkboxes = this._controlledCheckboxes
    const checkedCount = checkboxes.filter(checkbox => checkbox.checked).length

    this.checked = checkboxes.length > 0 && checkedCount === checkboxes.length
    this.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length
  }

  private _setChecked(checked: boolean) {
    this.checked = checked
    this.indeterminate = false
    this._setControlledCheckboxes(checked)
  }

  private _onInputChange = (event: Event) => {
    this._setChecked((event.target as HTMLInputElement).checked)
  }

  private _onPointerDown = (event: Event) => {
    event.preventDefault()
    this._setChecked(!this.checked)
  }

  render() {
    return html`
      <mm-surface variant="elevated" size="medium">
        <div @pointerdown=${this._onPointerDown}>
          <input
            type="checkbox"
            id=${this._inputId}
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            aria-controls=${this.ariaControls ?? nothing}
            @change=${this._onInputChange}
          />

          <label for=${this._inputId}>
            <span class="indicator"></span>
            <slot>
              <mm-paragraph>모두 동의합니다 (선택동의 포함)</mm-paragraph>
            </slot>
          </label>
        </div>
      </mm-surface>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-master-checkbox': MasterCheckbox
  }
}
