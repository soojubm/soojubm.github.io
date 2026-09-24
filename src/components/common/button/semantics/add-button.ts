import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/menu-item/semantics/menu-item-action'
import '@/components/common/surface'

@customElement('mm-add-button')
export class AddButton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) label = ''

  render() {
    return html`
      <mm-surface variant="elevated" density="compact">
        <mm-menu-item-action
          icon=${ICON_NAMES.ADD_CIRCLE}
          label=${this.label}
        ></mm-menu-item-action>
      </mm-surface>
    `
  }
}
