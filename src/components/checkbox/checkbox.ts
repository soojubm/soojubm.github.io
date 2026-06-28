import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { checkboxStyles } from '@/components/checkbox/checkbox.styles'
import { emit } from '@/utils/emit'
import { uniqueId } from '@/utils/unique-id'

@customElement('mm-checkbox')
export class Checkbox extends LitElement {
  static styles = [checkboxStyles]

  @property({ type: String })
  name?: string

  @property({ type: String })
  value?: string

  @property({ type: String, reflect: true })
  size?: string

  @property({ type: Boolean, reflect: true })
  checked = false

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: Boolean, reflect: true })
  indeterminate = false

  // SSR 환경 및 crypto가 없는 구형 환경에서도 터지지 않도록 고유 ID 생성을 보장합니다.
  private inputId = uniqueId('checkbox')

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
          @change=${this.onChange}
        />

        <label for=${inputId} @click=${this.onLabelClick}>
          <span class="indicator"></span>
          <mm-paragraph>
            <slot></slot>
          </mm-paragraph>
        </label>
      </div>
    `
  }

  private commitChecked(checked: boolean) {
    this.checked = checked
    this.indeterminate = false

    emit(this, 'change', {
      checked: this.checked,
      value: this.value || '', // 부모 컴포넌트와의 타입 동기화를 위해 항상 string을 보장합니다.
    })
  }

  private onChange = (event: Event) => {
    const target = event.target as HTMLInputElement

    this.commitChecked(target.checked)
  }

  private onLabelClick = (event: Event) => {
    event.preventDefault()

    if (this.disabled) return

    this.commitChecked(!this.checked)
  }
}

export default Checkbox
