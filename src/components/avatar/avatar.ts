import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/icon/icon'
import { avatarStyles } from '@/components/avatar/avatar.styles'
import { ICON_NAMES, type IconName } from '@/components/icon-button/semantics/icon-names'

export type AvatarVariant = 'primary' | 'secondary' | 'tertiary'
export type AvatarSize = 'huge' | 'large' | 'medium' | 'small'
export type AvatarShape = 'circle' | 'square'
export type AvatarIconSize = 'large' | 'medium'

@customElement('mm-avatar')
class Avatar extends LitElement {
  static styles = [avatarStyles]

  @property({ type: String, reflect: true, useDefault: true }) variant: AvatarVariant = 'primary'
  @property({ type: String, reflect: true, useDefault: true }) size: AvatarSize = 'medium'
  @property({ type: String, reflect: true, useDefault: true }) shape: AvatarShape = 'square'
  @property({ type: String }) src?: string
  @property({ type: String }) icon?: IconName
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  render() {
    return html`
      ${this.renderImage()} ${this.renderIcon()} ${this.renderFallback()}
    `
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('ariaLabel')) return

    if (this.ariaLabel) {
      this.setAttribute('role', 'img')
    } else {
      this.removeAttribute('role')
    }
  }

  private renderImage() {
    if (!this.src) return nothing

    return html`
      <img src=${this.src} alt="" />
    `
  }

  private renderIcon() {
    if (this.src || !this.icon) return nothing

    return html`
      <mm-icon name=${this.icon} size=${this.iconSize} aria-hidden="true"></mm-icon>
    `
  }

  private renderFallback() {
    if (this.src || this.icon) return nothing

    return html`
      <slot>
        <mm-icon name=${ICON_NAMES.PEOPLE_TAG} size=${this.iconSize} aria-hidden="true"></mm-icon>
      </slot>
    `
  }

  private get iconSize(): AvatarIconSize {
    return this.size === 'large' || this.size === 'huge' ? 'large' : 'medium'
  }
}

export default Avatar
