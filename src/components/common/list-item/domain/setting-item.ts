import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { AvatarVariant } from '@/components/common/avatar/avatar'
import type { IconName } from '@/components/common/icon/icon-names'

import '@/components/common/list-item/list-item'
import { disabledStyles } from '@/stylesheets/shared.styles'

type DisableableElement = HTMLElement & { disabled?: boolean }

@customElement('mm-setting-item')
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
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant: AvatarVariant = 'primary'
  @property({ type: Boolean, reflect: true }) disabled = false
  @queryAssignedElements({ slot: 'action', flatten: true })
  private actions!: DisableableElement[]

  render() {
    return html`
      <mm-list-item
        size=${this.description ? 'medium' : 'small'}
        icon=${this.icon || nothing}
        avatar-variant=${this.avatarVariant}
        label=${this.label}
        description=${this.description}
      >
        <slot name="action" slot="trailing" @slotchange=${this.handleActionSlotChange}></slot>
      </mm-list-item>
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
