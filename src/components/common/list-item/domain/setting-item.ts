import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { ListItemAvatar } from '@/components/common/list-item/list-item'

import '@/components/common/list-item/list-item'
import { disabledStyles } from '@/stylesheets/shared.styles'

type DisableableElement = HTMLElement & { disabled?: boolean }

@customElement('fff-setting-item')
export class SettingItem extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    :host([disabled]) {
      ${disabledStyles};
      pointer-events: none;
    }
  `
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName
  @property({ attribute: false }) avatar?: Pick<ListItemAvatar, 'variant'>
  @property({ type: Boolean, reflect: true }) disabled = false
  @queryAssignedElements({ slot: 'action', flatten: true })
  private actions!: DisableableElement[]

  render() {
    return html`
      <fff-list-item
        size=${this.description ? 'medium' : 'small'}
        icon=${this.icon || nothing}
        .avatar=${this.avatar}
        label=${this.label}
        description=${this.description}
      >
        <slot name="action" slot="trailing" @slotchange=${this.handleActionSlotChange}></slot>
      </fff-list-item>
    `
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('disabled')) this.handleActionSlotChange()
  }

  private handleActionSlotChange() {
    this.actions.forEach(action => {
      if ('disabled' in action) action.disabled = this.disabled
    })
  }
}
