import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { entityStyles } from './entity.styles'

@customElement('mm-entity')
class Entity extends LitElement {
  @property({ type: String }) size = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) description2 = ''
  @property({ type: String }) description3 = ''
  @property({ type: String }) alignment = ''

  static styles = [entityStyles]

  render() {
    return html`
      <div class="entity" data-alignment="${this.alignment}" data-size="${this.size}">
        <slot name="avatar"></slot>
        <slot name="tag"></slot>

        ${this.label ? html`<mm-text class="entity-label" variant="subhead">${this.label}</mm-text>` : ''}
        ${this.description ? html`<mm-text variant="caption">${this.description}</mm-text>` : ''}
        ${this.description2 ? html`<mm-text variant="caption">${this.description2}</mm-text>` : ''}
        ${this.description3 ? html`<mm-text variant="caption">${this.description3}</mm-text>` : ''}
      </div>
    `
  }
}

export default Entity
