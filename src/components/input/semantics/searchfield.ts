import { html, nothing } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Textfield } from './textfield'

@customElement('mm-searchfield')
class SearchField extends Textfield {
  protected override get fieldClasses() {
    return 'textfield searchfield'
  }

  protected override get fieldRole() {
    return 'search'
  }

  protected override get fieldAriaLabel() {
    return this.label || 'search'
  }

  protected override get inputType() {
    return 'search'
  }

  protected override get inputClasses() {
    return 'textfield-input searchfield-input'
  }

  protected override get showLeading() {
    return true
  }

  protected override get showTrailing() {
    return true
  }

  protected override renderLabel(): unknown {
    return nothing
  }

  protected override renderLeading(): unknown {
    return html`<mm-icon class="searchfield-leading" name="search"></mm-icon>`
  }

  protected override renderTrailing(): unknown {
    return html`
      <mm-clear-button
        class="searchfield-clear"
        label="clear"
        ?disabled=${this.disabled || !this.value}
        @click=${this.clear}
      ></mm-clear-button>
    `
  }

  private clear(event: Event) {
    event.stopPropagation()
    if (this.disabled || !this.value) return

    this.value = ''
    this.dispatchInputEvent(this.value)
  }
}

export default SearchField
