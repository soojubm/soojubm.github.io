import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { ListItemAvatar, ListItemSize } from '@/components/common/list-item/list-item'
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
  @property({ attribute: false }) avatar?: Omit<ListItemAvatar, 'shape'>

  render() {
    return html`
      <fff-list-item
        size=${this.size}
        label=${this.label}
        description=${this.description}
        icon=${this.icon}
        .avatar=${{ ...this.avatar, shape: 'circle' }}
      >
        <slot name="trailing" slot="trailing"></slot>
      </fff-list-item>
    `
  }
}
