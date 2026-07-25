import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { Checkbox } from '@/components/checkbox/checkbox'
import type { AriaIdRef } from '@/types/aria'

import { checkboxStyles } from '@/components/checkbox/checkbox.styles'
import { uniqueId } from '@/utils/unique-id'

@customElement('mm-master-checkbox')
export class MasterCheckbox extends LitElement {
  static styles = [checkboxStyles]

  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null
  @property({ type: String, reflect: true }) size = 'large'
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean, reflect: true }) indeterminate = false

  private inputId = uniqueId('master-checkbox')

  private controlledElement?: HTMLElement | null

  render() {
    return html`
      <mm-surface variant="elevated">
        <div @pointerdown=${this.handleSurfacePointerdown}>
          <input
            type="checkbox"
            id=${this.inputId}
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            aria-controls=${this.ariaControls ?? nothing}
            @change=${this.handleCheckboxInputChange}
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

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('change', this.handleControlledCheckboxesChange)
  }

  disconnectedCallback() {
    document.removeEventListener('change', this.handleControlledCheckboxesChange)
    super.disconnectedCallback()
  }

  firstUpdated() {
    this.syncControlledElement()
  }

  updated(changed: Map<string, unknown>) {
    if (!changed.has('ariaControls')) return

    this.syncControlledElement()
  }

  private syncControlledElement() {
    this.controlledElement = this.ariaControls ? document.getElementById(this.ariaControls) : null
    this.handleControlledCheckboxesChange()
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

  private handleControlledCheckboxesChange = () => {
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

  private handleCheckboxInputChange = (event: Event) => {
    this.setChecked((event.target as HTMLInputElement).checked)
  }

  private handleSurfacePointerdown = (event: Event) => {
    event.preventDefault()
    this.setChecked(!this.checked)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-master-checkbox': MasterCheckbox
  }
}
