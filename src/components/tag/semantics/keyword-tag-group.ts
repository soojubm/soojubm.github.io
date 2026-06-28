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
      <mm-tag-group>${this.renderContent()}</mm-tag-group>
    `
  }

  private renderContent() {
    return [this.renderHeading(), this.renderKeywords()]
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <mm-accent-tag>${this.heading}</mm-accent-tag>
    `
  }

  private renderKeywords() {
    return this.keywords.map(keyword => this.renderKeyword(keyword))
  }

  private renderKeyword(keyword: string) {
    return html`
      <mm-keyword-tag>${keyword}</mm-keyword-tag>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-keyword-tag-group': KeywordTagGroup
  }
}
