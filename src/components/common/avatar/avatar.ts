import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/icon/icon'
import type { IconSize } from '@/components/common/icon/icon.styles'

import { avatarStyles } from '@/components/common/avatar/avatar.styles'
import { ICON_NAMES, type IconName } from '@/components/common/icon/icon-names'
import { resetStyles } from '@/stylesheets/shared.styles'
import type { ComponentVariant } from '@/stylesheets/shared.types'

export const AVATAR_VARIANTS = [
  'primary',
  'secondary',
  'tertiary',
] as const satisfies readonly ComponentVariant[]
export type AvatarVariant = (typeof AVATAR_VARIANTS)[number]
export const AVATAR_SIZES = ['80', '48', '40', '32'] as const
export type AvatarSize = (typeof AVATAR_SIZES)[number]
export const AVATAR_SHAPES = ['square', 'circle'] as const
export type AvatarShape = (typeof AVATAR_SHAPES)[number]
@customElement('fff-avatar')
export class Avatar extends LitElement {
  static styles = [resetStyles, avatarStyles]
  @property({ type: String, reflect: true, useDefault: true }) variant: AvatarVariant = 'primary'
  @property({ type: String, reflect: true, useDefault: true }) size: AvatarSize = '40'
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

    if (this.ariaLabel) this.setAttribute('role', 'img')
    else this.removeAttribute('role')
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
      <fff-icon name=${this.icon} size=${this.iconSize} aria-hidden="true"></fff-icon>
    `
  }

  private renderFallback() {
    if (this.src || this.icon) return nothing

    return html`
      <slot>
        <fff-icon name=${ICON_NAMES.PROFILE} size=${this.iconSize} aria-hidden="true"></fff-icon>
      </slot>
    `
  }

  private get iconSize(): IconSize {
    return this.size === '48' || this.size === '80' ? 'large' : 'medium'
  }
}
