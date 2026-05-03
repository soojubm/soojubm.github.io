import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { groupStyles } from './group.styles'

@customElement('mm-group')
class Group extends LitElement {
  @property({ type: String }) variant = ''
  @property({ type: String }) alignment = ''

  static styles = [groupStyles]

  render() {
    return html`
      <div
        class="group"
        role="group"
        data-variant="${this.variant}"
        data-alignment="${this.alignment}"
      >
        <slot></slot>
      </div>
    `
  }
}

export default Group
