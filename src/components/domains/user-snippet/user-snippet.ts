import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { userSnippetStyles } from '@/components/domains/user-snippet/user-snippet.styles'
import '@/components/common'

@customElement('mm-user-snippet')
export class UserSnippet extends LitElement {
  static styles = [userSnippetStyles]
  @property({ type: String }) name = ''
  @property({ type: String }) phone = ''
  @property({ type: String }) email = ''
  @property({ type: String }) description = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'tag-label' }) tagLabel = ''

  render() {
    return html`
      <mm-user-avatar
        size="80"
        name=${this.name}
        src=${ifDefined(this.avatarSrc || undefined)}
      ></mm-user-avatar>
      ${this.renderTag()}
      <div class="detail">
        <mm-text as="h2" size="24">${this.name}</mm-text>
        ${this.renderDescription()}
        <mm-text size="12">${this.email}</mm-text>
        <mm-text size="12">${this.phone}</mm-text>
      </div>
    `
  }

  private renderTag() {
    if (!this.tagLabel) return nothing

    return html`
      <mm-accent-tag>${this.tagLabel}</mm-accent-tag>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <mm-paragraph>${this.description}</mm-paragraph>
    `
  }
}
