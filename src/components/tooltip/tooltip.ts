import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tooltipStyles } from './tooltip.styles'

@customElement('mm-tooltip')
class Tooltip extends LitElement {
  @property({ type: String }) content = ''
  @property({ type: String }) align = ''
  @property({ type: Boolean, reflect: true }) open = false

  static styles = [tooltipStyles]

  private show() {
    this.open = true
  }

  private hide() {
    this.open = false
  }

  render() {
    return html`
      <div
        class="tooltip"
        data-align="${this.align}"
        data-open="${this.open ? 'true' : 'false'}"
        @mouseover="${this.show}"
        @mouseout="${this.hide}"
        @focusin="${this.show}"
        @focusout="${this.hide}"
      >
        <slot class="tooltip-trigger" name="trigger"></slot>
        <div class="tooltip-content" role="tooltip">${this.content}</div>
      </div>
    `
  }
}

export default Tooltip
