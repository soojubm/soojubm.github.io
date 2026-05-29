import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { entityStyles } from './user-snippet.styles'

@customElement('mm-user-snippet')
class UserSnippet extends LitElement {
  @property({ type: String }) size = ''
  @property({ type: String }) avatar = ''
  @property({ type: String }) name = ''
  @property({ type: String }) phone = ''
  @property({ type: String }) email = ''

  static styles = [entityStyles]

  render() {
    return html`
      <div class="entity" data-size="${this.size}">
        <slot name="avatar"></slot>
        <slot name="tag"></slot>
        <mm-text class="entity-label" size="18">${this.name}</mm-text>
        <mm-text size="12">${this.email}</mm-text>
        <mm-text size="12">${this.phone}</mm-text>
      </div>
    `
  }
}

export default UserSnippet
