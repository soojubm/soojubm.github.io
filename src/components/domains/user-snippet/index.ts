import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { entityStyles } from './user-snippet.styles'

@customElement('mm-user-snippet')
class UserSnippet extends LitElement {
  @property({ type: String }) size = 'medium'
  @property({ type: String }) name = ''
  @property({ type: String }) phone = ''
  @property({ type: String }) email = ''
  @property({ type: String }) description = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-size' }) avatarSize = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'primary'
  @property({ type: String, attribute: 'tag-label' }) tagLabel = ''

  static styles = [entityStyles]

  render() {
    const avatarSize = this.avatarSize || this.size

    return html`
      <div class="entity">
        <mm-avatar
          size=${avatarSize}
          variant=${this.avatarVariant}
          src=${this.avatarSrc || ''}
        ></mm-avatar>
        ${this.tagLabel
          ? html`
              <mm-accent-tag class="entity-tag">${this.tagLabel}</mm-accent-tag>
            `
          : nothing}
        <div class="entity-content">
          <mm-paragraph size="large">${this.name}</mm-paragraph>
          ${this.description
            ? html`
                <mm-paragraph style="margin-top:-.125rem">${this.description}</mm-paragraph>
              `
            : nothing}
          <mm-text size="12">${this.email}</mm-text>
          <mm-text size="12">${this.phone}</mm-text>
        </div>
      </div>
    `
  }
}

export default UserSnippet
