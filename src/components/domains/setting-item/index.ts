import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import '@/components/list-item/list-item'

type DisableableElement = HTMLElement & { disabled?: boolean }

/**
 * <mm-setting-item icon="bell" label="알림" description="...">
 *   <mm-switch slot="action"></mm-switch>
 * </mm-setting-item>
 */
@customElement('mm-setting-item')
export class SettingItem extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
  `

  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName

  @property({ type: Boolean, reflect: true }) disabled = false

  @queryAssignedElements({ slot: 'action', flatten: true })
  private actions!: DisableableElement[]

  render() {
    return html`
      <mm-list-item
        size="40"
        icon=${this.icon || nothing}
        label=${this.label}
        description=${this.description}
      >
        <slot name="action" slot="trailing" @slotchange=${this.syncActions}></slot>
      </mm-list-item>
    `
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('disabled')) this.syncActions()
  }

  private syncActions() {
    this.actions.forEach(action => {
      if ('disabled' in action) action.disabled = this.disabled
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-setting-item': SettingItem
  }
}
