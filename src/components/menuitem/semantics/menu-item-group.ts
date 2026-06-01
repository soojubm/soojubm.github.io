import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-menu-item-group')
export class MenuItemGroup extends LitElement {
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }
    `,
  ]

  render() {
    return html`
      <div role="menu" aria-label=${ifDefined(this.ariaLabel || undefined)}>
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-menu-item-group': MenuItemGroup
  }
}
