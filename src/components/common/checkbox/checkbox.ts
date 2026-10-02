import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { checkboxStyles } from '@/components/common/checkbox/checkbox.styles'
import { visuallyHiddenInputStyles } from '@/components/common/input/input.styles'
import { ToggleController } from '@/controllers/toggle-controller'
import { resetStyles, type ComponentSize } from '@/stylesheets/shared.styles'
import { uniqueId } from '@/utils'
import '@/components/common/text/semantics/paragraph'

export type CheckboxSize = Extract<ComponentSize, 'medium' | 'large'>

@customElement('mm-checkbox')
export class Checkbox extends LitElement {
  static styles = [resetStyles, visuallyHiddenInputStyles, checkboxStyles]
  @property({ type: String })
  name?: string
  @property({ type: String })
  value?: string
  @property({ type: String, reflect: true })
  size: CheckboxSize = 'medium'
  @property({ type: Boolean })
  checked = false
  @property({ type: Boolean, reflect: true })
  disabled = false
  @property({ type: Boolean })
  indeterminate = false
  // SSR 환경 및 crypto가 없는 구형 환경에서도 터지지 않도록 고유 ID 생성을 보장합니다.
  private inputId = uniqueId('checkbox')
  private toggle: ToggleController<'checked'> = new ToggleController(this, 'checked')

  render() {
    // 가독성을 위한 구조 분해 할당
    const { name, value, checked, disabled, indeterminate, inputId } = this

    return html`
      <div>
        <input
          type="checkbox"
          id=${inputId}
          name=${ifDefined(name)}
          .value=${value || ''}
          .checked=${checked}
          .indeterminate=${indeterminate}
          ?disabled=${disabled}
          @change=${this.handleCheckboxChange}
        />

        <label for=${inputId}>
          <span class="indicator"></span>
          <mm-paragraph>
            <slot></slot>
          </mm-paragraph>
        </label>
      </div>
    `
  }

  private handleCheckboxChange = (event: Event) => {
    const target = event.target as HTMLInputElement

    // 네이티브 체크박스처럼 누르면 indeterminate가 먼저 풀린 뒤 change가 나간다.
    this.indeterminate = false
    this.toggle.set(target.checked)
  }
}
