import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/tag/tag-group'
import '@/components/common/tag/semantics/accent-tag'
import '@/components/common/tag/semantics/keyword-tag'

@customElement('mm-keyword-tag-group')
export class KeywordTagGroup extends LitElement {
  static styles = [resetStyles]

  @property({ type: String }) heading = ''

  @property({ attribute: false }) keywords: string[] = []

  render() {
    if (!this.keywords.length) return nothing
    return html`
      <mm-tag-group>${this.renderHeading()} ${this.renderKeywords()}</mm-tag-group>
    `
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
