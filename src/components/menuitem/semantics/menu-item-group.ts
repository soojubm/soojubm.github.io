import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-menu-item-group')
export class MenuItemGroup extends LitElement {
  /** 기본 menu, 다중 선택은 group, 단일 선택은 radiogroup */
  @property({ type: String, reflect: true }) role = 'menu'

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
      :host > div {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }
    `,
  ]

  render() {
    return html`
      <div>
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
