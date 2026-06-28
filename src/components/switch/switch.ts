import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { switchStyles } from '@/components/switch/switch.styles'
import { emit } from '@/utils/emit'
import { uniqueId } from '@/utils/unique-id'

@customElement('mm-switch')
export class Switch extends LitElement {
  static styles = [switchStyles]

  @property({ type: String }) name = ''
  @property({ type: String }) size = ''
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean }) disabled = false

  private inputId = uniqueId('switch')

  render() {
    return html`
      <div>
        <input
          id=${this.inputId}
          name=${this.name || nothing}
          type="checkbox"
          role="switch"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.onChange}
        />
        <label for=${this.inputId}><slot></slot></label>
      </div>
    `
  }

  private onChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.checked = target.checked

    emit(this, 'change', { checked: this.checked })
  }
}

export default Switch
