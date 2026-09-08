import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { visuallyHiddenInputStyles } from '@/components/common/input/input.styles'
import { radioStyles } from '@/components/common/radio/radio.styles'
import { ToggleController } from '@/controllers/toggle-controller'
import { emit, uniqueId } from '@/utils'
import '@/components/common/text/semantics/paragraph'

@customElement('mm-radio')
export class Radio extends LitElement {
  static styles = [visuallyHiddenInputStyles, radioStyles]

  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean }) disabled = false

  // shadow 안에서만 쓰는 label 연결용 id라 호스트의 id와 섞지 않는다.
  private inputId = uniqueId('radio')
  private toggle = new ToggleController(this, {
    getValue: () => this.checked,
    setValue: checked => {
      this.checked = checked
    },
    isDisabled: () => this.disabled,
  })

  render() {
    return html`
      <div>
        <input
          type="radio"
          id=${this.inputId}
          name=${ifDefined(this.name || undefined)}
          .value=${this.value || ''}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.handleInputChange}
        />
        <label for=${this.inputId}>
          <span class="indicator"></span>
          <mm-paragraph>
            <slot></slot>
          </mm-paragraph>
        </label>
      </div>
    `
  }

  private handleInputChange(event: Event) {
    event.stopPropagation() // 네이티브 이벤트 전파 차단

    const target = event.target as HTMLInputElement
    if (!this.toggle.set(target.checked)) return

    emit(this, 'change', { checked: this.checked, value: this.value })
  }
}

export default Radio
