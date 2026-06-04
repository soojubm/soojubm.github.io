import { css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Textfield } from './textfield'

@customElement('mm-passwordfield')
class PasswordField extends Textfield {
  @state() private revealed = false

  static override styles = [...Textfield.styles]

  protected override get fieldClasses() {
    return 'textfield passwordfield'
  }

  protected override get inputType() {
    return this.revealed ? 'text' : 'password'
  }

  protected override get inputClasses() {
    return 'textfield-input passwordfield-input'
  }

  protected override get showSuffix() {
    return true
  }

  protected override renderSuffix(): unknown {
    return html`
      <mm-reveal-button
        class="passwordfield-reveal"
        .revealed=${this.revealed}
        ?disabled=${this.disabled}
        @reveal-toggle=${this.handleReveal}
      ></mm-reveal-button>
    `
  }

  private handleReveal(event: CustomEvent<{ revealed: boolean }>) {
    event.stopPropagation()
    this.revealed = event.detail.revealed
  }
}

export default PasswordField
