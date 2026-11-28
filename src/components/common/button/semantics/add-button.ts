import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/menu-item/semantics/menu-item-action'
import {
  surfaceBaseStyles,
  surfaceElevatedStyles,
} from '@/components/common/surface/surface.styles'

@customElement('fff-add-button')
export class AddButton extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      ${surfaceElevatedStyles};
      --surface-padding: var(--space-2);
    }
  `
  @property({ type: String }) label = ''

  render() {
    return html`
      <fff-menu-item-action
        icon=${ICON_NAMES.ADD_CIRCLE}
        label=${this.label}
      ></fff-menu-item-action>
    `
  }
}
