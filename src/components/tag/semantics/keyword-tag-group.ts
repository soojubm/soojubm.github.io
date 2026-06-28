import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { arrayAttributeConverter } from '@/utils/property-converters'

@customElement('mm-keyword-tag-group')
export class KeywordTagGroup extends LitElement {
  static styles = [resetStyles]

  @property({ type: String }) heading = ''

  @property({
    attribute: 'keywords',
    converter: arrayAttributeConverter<string>(),
  })
  keywords: string[] = []

  render() {
    if (!this.keywords.length) return nothing
    return html`
      <mm-tag-group>
        ${this.heading
          ? html`
              <mm-accent-tag>${this.heading}</mm-accent-tag>
            `
          : nothing}
        ${this.keywords.map(
          k =>
            html`
              <mm-keyword-tag>${k}</mm-keyword-tag>
            `,
        )}
      </mm-tag-group>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-keyword-tag-group': KeywordTagGroup
  }
}
