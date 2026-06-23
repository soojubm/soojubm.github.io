import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { switchStyles } from './switch.styles'

@customElement('mm-switch')
export class Switch extends LitElement {
  @property({ type: String }) name = ''
  @property({ type: String }) size = ''
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean }) disabled = false

  static styles = [switchStyles]

  private inputId = `switch-${crypto.randomUUID()}`

  private _onChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.checked = target.checked

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked },
      }),
    )
  }

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
          @change=${this._onChange}
        />
        <label for=${this.inputId}><slot></slot></label>
      </div>
    `
  }
}

export default Switch
