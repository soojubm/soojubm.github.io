import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AvatarVariant } from '@/components/avatar/avatar'
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
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant: AvatarVariant = 'primary'
  @property({ type: String, attribute: 'tag-label' }) tagLabel = ''

  render() {
    return html`
      <mm-flex class="entity" direction="column" gap="2">
        <mm-avatar
          size="80"
          variant=${this.avatarVariant}
          src=${ifDefined(this.avatarSrc || undefined)}
        ></mm-avatar>
        ${this.renderTag()}
        <mm-flex direction="column">
          <mm-paragraph size="large">${this.name}</mm-paragraph>
          ${this.renderDescription()}
          <mm-text size="12">${this.email}</mm-text>
          <mm-text size="12">${this.phone}</mm-text>
        </mm-flex>
      </mm-flex>
    `
  }

  private renderTag() {
    if (!this.tagLabel) return nothing

    return html`
      <mm-accent-tag class="entity-tag">${this.tagLabel}</mm-accent-tag>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <mm-paragraph>${this.description}</mm-paragraph>
    `
  }
}

export default UserSnippet
