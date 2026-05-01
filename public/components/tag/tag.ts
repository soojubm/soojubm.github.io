import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tagStyles } from './tag.styles'

@customElement('mm-tag')
class Tag extends LitElement {
  @property({ type: String }) variant = ''
  @property({ type: String }) datetime = ''

  static styles = [tagStyles]

  render() {
    if (this.datetime) {
      return html`
        <time data-variant="${this.variant}" datetime="${this.datetime}">
          <slot name="icon"></slot>
          <slot></slot>
        </time>
      `
    }

    return html`
      <span data-variant="${this.variant}">
        <slot name="icon"></slot>
        <slot></slot>
      </span>
    `
  }
}

export default Tag
