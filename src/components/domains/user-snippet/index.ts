import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { entityStyles } from '@/components/domains/user-snippet/user-snippet.styles'
import '@/components/flex/flex'

@customElement('mm-user-snippet')
class UserSnippet extends LitElement {
  static styles = [entityStyles]

  @property({ type: String }) size = 'medium'
  @property({ type: String }) name = ''
  @property({ type: String }) phone = ''
  @property({ type: String }) email = ''
  @property({ type: String }) description = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-size' }) avatarSize = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'primary'
  @property({ type: String, attribute: 'tag-label' }) tagLabel = ''

  render() {
    const avatarSize = this.avatarSize || this.size

    return html`
      <mm-flex class="entity" direction="column" gap="2">
        <mm-avatar
          size=${avatarSize}
          variant=${this.avatarVariant}
          src=${this.avatarSrc || nothing}
        ></mm-avatar>
        ${this.tagLabel
          ? html`
              <mm-accent-tag class="entity-tag">${this.tagLabel}</mm-accent-tag>
            `
          : nothing}
        <mm-flex class="entity-content" direction="column">
          <mm-paragraph size="large">${this.name}</mm-paragraph>
          ${this.description
            ? html`
                <mm-paragraph class="entity-description">${this.description}</mm-paragraph>
              `
            : nothing}
          <mm-text size="12">${this.email}</mm-text>
          <mm-text size="12">${this.phone}</mm-text>
        </mm-flex>
      </mm-flex>
    `
  }
}

export default UserSnippet
