import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { switchStyles } from '@/components/common/switch/switch.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit, uniqueId } from '@/utils'

@customElement('mm-switch')
export class Switch extends LitElement {
  static styles = [resetStyles, switchStyles]
  @property({ type: String }) name = ''
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean }) disabled = false
  private inputId = uniqueId('switch')

  render() {
    return html`
      <div>
        <input
          id=${this.inputId}
          name=${ifDefined(this.name || undefined)}
          type="checkbox"
          role="switch"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.handleInputChange}
        />
        <label for=${this.inputId}><slot></slot></label>
      </div>
    `
  }

  private handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.checked = target.checked
    emit(this, 'change', { checked: this.checked })
  }
}
