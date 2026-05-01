import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tooltipStyles } from './tooltip.styles'

@customElement('mm-tooltip')
class Tooltip extends LitElement {
  @property({ type: String }) content = ''
  @property({ type: String }) align = ''

  static styles = [tooltipStyles]

  render() {
    return html`
      <div class="tooltip" data-align="${this.align}">
        <slot class="tooltip-trigger" name="trigger"></slot>
        <div class="tooltip-content" role="tooltip">${this.content}</div>
      </div>
    `
  }
}

export default Tooltip
