import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { userSnippetStyles } from '@/components/common/avatar/domain/user-snippet.styles'
import '@/components/common/avatar/semantics/user-avatar'
import '@/components/common/tag/semantics/accent-tag'
import '@/components/common/text/semantics/paragraph'
import '@/components/common/text/text'

@customElement('fff-user-snippet')
export class UserSnippet extends LitElement {
  static styles = [userSnippetStyles]
  @property({ type: String }) name = ''
  @property({ type: String }) phone = ''
  @property({ type: String }) email = ''
  @property({ type: String }) description = ''
  @property({ attribute: false }) avatar?: { src?: string }
  @property({ type: String, attribute: 'tag-label' }) tagLabel = ''

  render() {
    return html`
      <fff-user-avatar
        size="80"
        name=${this.name}
        src=${ifDefined(this.avatar?.src || undefined)}
      ></fff-user-avatar>
      ${this.renderTag()}
      <div class="detail">
        <fff-text size="24">${this.name}</fff-text>
        ${this.renderDescription()}
        <fff-text size="12">${this.email}</fff-text>
        <fff-text size="12">${this.phone}</fff-text>
      </div>
    `
  }

  private renderTag() {
    if (!this.tagLabel) return nothing

    return html`
      <fff-accent-tag>${this.tagLabel}</fff-accent-tag>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <fff-paragraph>${this.description}</fff-paragraph>
    `
  }
}
