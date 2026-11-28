import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/tag/tag-group'
import '@/components/common/tag/semantics/accent-tag'
import '@/components/common/tag/semantics/keyword-tag'

@customElement('fff-keyword-tag-group')
export class KeywordTagGroup extends LitElement {
  @property({ type: String }) heading = ''
  @property({ attribute: false }) keywords: string[] = []

  render() {
    if (!this.keywords.length) return nothing
    return html`
      <fff-tag-group>${this.renderHeading()} ${this.renderKeywords()}</fff-tag-group>
    `
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <fff-accent-tag>${this.heading}</fff-accent-tag>
    `
  }

  private renderKeywords() {
    return this.keywords.map(keyword => this.renderKeyword(keyword))
  }

  private renderKeyword(keyword: string) {
    return html`
      <fff-keyword-tag>${keyword}</fff-keyword-tag>
    `
  }
}
