import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { AvatarShape, AvatarSize, AvatarVariant } from '@/components/avatar/avatar'
import '@/components/list-item/list-item'

/**
 * avatar를 leading으로 가지는 표현 전용 행.
 */
@customElement('mm-user-row')
export class UserRow extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ]

  @property({ type: String }) size: AvatarSize = '40'
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant: AvatarVariant = 'tertiary'
  @property({ type: String, attribute: 'avatar-shape' }) avatarShape: AvatarShape = 'square'

  render() {
    return html`
      <mm-list-item
        size=${this.size}
        label=${this.label}
        description=${this.description}
        icon=${this.icon}
        avatar-src=${this.avatarSrc}
        avatar-variant=${this.avatarVariant}
        avatar-shape=${this.avatarShape}
      >
        <slot></slot>
        <slot name="trailing" slot="trailing"></slot>
      </mm-list-item>
    `
  }
}

export default UserRow
