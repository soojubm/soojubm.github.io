import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-keyword-tag-group')
export class KeywordTagGroup extends LitElement {
  @property({ type: String }) title = ''

  @property({
    type: Array,
    converter: value => {
      if (!value) return []
      try {
        return JSON.parse(value)
      } catch {
        return []
      }
    },
  })
  keywords: string[] = []

  static styles = [resetStyles]

  render() {
    if (!this.keywords.length) return nothing
    return html`
      <mm-flex gap="1" wrap>
        ${this.title ? html`<mm-accent-tag>${this.title}</mm-accent-tag>` : nothing}
        ${this.keywords.map(k => html`<mm-keyword-tag>${k}</mm-keyword-tag>`)}
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-keyword-tag-group': KeywordTagGroup
  }
}
