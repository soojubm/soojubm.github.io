// menu-item-row.ts

import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { menuItemStyles } from './menuitem.styles'

@customElement('mm-menu-item-row')
export class MenuItemRow extends LitElement {
  @property({ type: String }) tone = ''
  @property({ type: String }) icon = ''

  @property({ type: Boolean, reflect: true })
  disabled = false

  static styles = [menuItemStyles]

  protected getRole() {
    return 'menuitem'
  }

  protected getAriaChecked(): string | undefined {
    return undefined
  }

  protected renderAction() {
    return html` <slot name="action"></slot> `
  }

  render() {
    return html`
      <div
        class="item"
        role=${this.getRole()}
        data-tone=${this.tone}
        aria-disabled=${String(this.disabled)}
        aria-checked=${ifDefined(this.getAriaChecked())}
      >
        ${this.icon ? html`<mm-avatar variant="tertiary" icon="${this.icon}"></mm-avatar>` : ''}
        <div class="label">
          <slot></slot>
        </div>
        ${this.renderAction()}
      </div>
    `
  }
}

export default MenuItemRow
