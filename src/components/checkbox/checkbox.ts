import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { checkboxStyles } from './checkbox.styles'

@customElement('mm-checkbox')
export class Checkbox extends LitElement {
  @property({ type: String })
  name?: string

  @property({ type: String })
  value?: string

  @property({ type: String })
  size?: string

  @property({ type: Boolean, reflect: true })
  checked = false

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: Boolean, reflect: true })
  indeterminate = false

  static styles = [checkboxStyles]

  // SSR 환경 및 crypto가 없는 구형 환경에서도 터지지 않도록 고유 ID 생성을 보장합니다.
  private _inputId = `checkbox-${
    crypto?.randomUUID?.() || Math.random().toString(36).substring(2, 9)
  }`

  private _onChange = (event: Event) => {
    const target = event.target as HTMLInputElement

    this.checked = target.checked
    this.indeterminate = false

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          checked: this.checked,
          value: this.value || '', // 부모 컴포넌트와의 타입 동기화를 위해 항상 string을 보장합니다.
        },
      }),
    )
  }

  render() {
    // 가독성을 위한 구조 분해 할당
    const { name, value, size, checked, disabled, indeterminate, _inputId } = this

    return html`
      <div class="checkbox" data-size=${size || nothing}>
        <input
          type="checkbox"
          id=${_inputId}
          name=${name || nothing}
          .value=${value || ''}
          .checked=${checked}
          .indeterminate=${indeterminate}
          ?disabled=${disabled}
          @change=${this._onChange}
        />

        <label for=${_inputId}>
          <span class="indicator"></span>
          <mm-text size="14">
            <slot></slot>
          </mm-text>
        </label>
      </div>
    `
  }
}

export default Checkbox
