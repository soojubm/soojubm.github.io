import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { MenuItemRow } from './menu-item-row'

@customElement('mm-menu-item-link')
export class MenuItemLink extends MenuItemRow {
  @property({ type: String }) href = ''

  protected override renderItem() {
    return html`
      <a
        href=${ifDefined(this.disabled ? undefined : this.href)}
        class="item"
        role=${this.getRole()}
        data-tone=${this.tone}
        aria-disabled=${String(this.disabled)}
      >
        ${this.renderContent()}
      </a>
    `
  }
}
