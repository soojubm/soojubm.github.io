import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { AvatarVariant } from '@/components/common/avatar/avatar'
import type { IconName } from '@/components/common/icon/icon-names'
import type { ListItemSize } from '@/components/common/list-item/list-item'
import '@/components/common/list-item/list-item'

@customElement('fff-user-item')
export class UserItem extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ]
  @property({ type: String }) size: ListItemSize = 'small'
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant: AvatarVariant = 'primary'

  render() {
    return html`
      <fff-list-item
        size=${this.size}
        label=${this.label}
        description=${this.description}
        icon=${this.icon}
        avatar-variant=${this.avatarVariant}
        avatar-src=${this.avatarSrc}
        avatar-shape="circle"
      >
        <slot name="trailing" slot="trailing"></slot>
      </fff-list-item>
    `
  }
}
