import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { checkboxStyles } from '@/components/checkbox/checkbox.styles'
import type { Checkbox } from '@/components/checkbox/checkbox'
import { uniqueId } from '@/utils/unique-id'
import type { AriaIdRef } from '@/types/aria'

@customElement('mm-master-checkbox')
export class MasterCheckbox extends LitElement {
  static styles = [checkboxStyles]

  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null
  @property({ type: String, reflect: true }) size = 'large'
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean, reflect: true }) indeterminate = false

  private inputId = uniqueId('master-checkbox')

  private controlledElement?: HTMLElement | null

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('change', this.syncFromControlledCheckboxes)
  }

  disconnectedCallback() {
    document.removeEventListener('change', this.syncFromControlledCheckboxes)
    super.disconnectedCallback()
  }

  firstUpdated() {
    this.controlledElement = this.ariaControls ? document.getElementById(this.ariaControls) : null
    this.syncFromControlledCheckboxes()
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('ariaControls')) {
      this.controlledElement = this.ariaControls ? document.getElementById(this.ariaControls) : null
      this.syncFromControlledCheckboxes()
    }
  }

  private get controlledCheckboxes() {
    if (!this.controlledElement) return []

    return Array.from(this.controlledElement.querySelectorAll<Checkbox>('mm-checkbox')).filter(
      checkbox => !checkbox.disabled,
    )
  }

  private setControlledCheckboxes(checked: boolean) {
    this.controlledCheckboxes.forEach(checkbox => {
      checkbox.checked = checked
      checkbox.indeterminate = false
    })
  }

  private syncFromControlledCheckboxes = () => {
    const checkboxes = this.controlledCheckboxes
    const checkedCount = checkboxes.filter(checkbox => checkbox.checked).length

    this.checked = checkboxes.length > 0 && checkedCount === checkboxes.length
    this.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length
  }

  private setChecked(checked: boolean) {
    this.checked = checked
    this.indeterminate = false
    this.setControlledCheckboxes(checked)
  }

  private onInputChange = (event: Event) => {
    this.setChecked((event.target as HTMLInputElement).checked)
  }

  private onPointerDown = (event: Event) => {
    event.preventDefault()
    this.setChecked(!this.checked)
  }

  render() {
    return html`
      <mm-surface variant="elevated" size="medium">
        <div @pointerdown=${this.onPointerDown}>
          <input
            type="checkbox"
            id=${this.inputId}
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            aria-controls=${this.ariaControls ?? nothing}
            @change=${this.onInputChange}
          />

          <label for=${this.inputId}>
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
