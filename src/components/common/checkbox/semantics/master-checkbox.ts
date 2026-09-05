import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { CheckboxGroup } from '@/components/common/checkbox/checkbox-group'
import type { AriaIdRef } from '@/types'

import { checkboxStyles } from '@/components/common/checkbox/checkbox.styles'
import { uniqueId } from '@/utils'
import '@/components/common/surface'
import '@/components/common/text/semantics/paragraph'

@customElement('mm-master-checkbox')
export class MasterCheckbox extends LitElement {
  static styles = [checkboxStyles]

  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null
  @property({ type: String, reflect: true }) size = 'large'

  private inputId = uniqueId('master-checkbox')
  private group: CheckboxGroup | null = null

  render() {
    return html`
      <mm-surface variant="elevated">
        <div>
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

  disconnectedCallback() {
    this.group?.removeEventListener('change', this.handleGroupChange)
    super.disconnectedCallback()
  }

  firstUpdated() {
    this.syncGroup()
  }

  updated(changed: Map<string, unknown>) {
    if (!changed.has('ariaControls')) return

    this.syncGroup()
  }

  private get checked() {
    return this.group?.checked ?? false
  }

  private get indeterminate() {
    return this.group?.indeterminate ?? false
  }

  private syncGroup() {
    this.group?.removeEventListener('change', this.handleGroupChange)

    this.group = this.ariaControls
      ? (document.getElementById(this.ariaControls) as CheckboxGroup | null)
      : null

    this.group?.addEventListener('change', this.handleGroupChange)
    this.requestUpdate()
  }

  private handleGroupChange = () => {
    this.requestUpdate()
  }

  private handleCheckboxInputChange = () => {
    this.group?.toggleAll()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-master-checkbox': MasterCheckbox
  }
}
