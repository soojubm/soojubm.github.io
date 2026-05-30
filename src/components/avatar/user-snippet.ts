import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { entityStyles } from './user-snippet.styles'

@customElement('mm-user-snippet')
class UserSnippet extends LitElement {
  @property({ type: String }) size = ''
  @property({ type: String }) name = ''
  @property({ type: String }) phone = ''
  @property({ type: String }) email = ''
  @property({ type: String }) description = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-size' }) avatarSize = 'medium'
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'primary'
  @property({ type: String, attribute: 'tag-label' }) tagLabel = ''

  static styles = [entityStyles]

  render() {
    return html`
      <div class="entity" data-size="${this.size}">
        <mm-avatar
          size=${this.avatarSize}
          variant=${this.avatarVariant}
          src=${this.avatarSrc || ''}
        ></mm-avatar>
        ${this.tagLabel
          ? html`<mm-accent-tag class="entity-tag">${this.tagLabel}</mm-tag>`
          : nothing}
        <div class="entity-content">
          <mm-text size="18" weight="bold">${this.name}</mm-text>
          ${this.description
            ? html`<mm-text size="14" style="margin-top:-.125rem">${this.description}</mm-text>`
            : nothing}
          <mm-text size="12" style="margin-block:-.25rem;">${this.email}</mm-text>
          <mm-text size="12">${this.phone}</mm-text>
        </div>
      </div>
    `
  }
}

export default UserSnippet
