import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { CheckboxGroup } from '@/components/common/checkbox/checkbox-group'
import type { AriaIdRef } from '@/types'

import { checkboxStyles } from '@/components/common/checkbox/checkbox.styles'
import { uniqueId } from '@/utils'

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
        <!-- label 클릭은 라벨 자체 + 연결된 input으로 forwarding되는 클릭까지 두 번 버블링되어
             @click을 쓰면 두 번 토글된다. pointerdown 한 번만 잡아 기본 동작을 막고 직접 토글한다. -->
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

  private handleSurfacePointerdown = (event: Event) => {
    event.preventDefault()
    this.group?.toggleAll()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-master-checkbox': MasterCheckbox
  }
}
