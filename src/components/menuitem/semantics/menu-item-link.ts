import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import { MenuItemRow } from '../menu-item-row'

@customElement('mm-menu-item-link')
export class MenuItemLink extends MenuItemRow {
  @property({ type: String }) href = ''

  protected override renderAction() {
    return html`
      <span slot="trailing">
        <mm-icon name=${ICON_NAMES.SHARE} size="small"></mm-icon>
      </span>
    `
  }

  protected override renderItem() {
    return html`
      <a
        href=${ifDefined(this.disabled ? undefined : this.href)}
        class="item"
        role=${this.getRole()}
        data-tone=${ifDefined(this.tone || undefined)}
        ?data-interactive=${this.interactive}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
      >
        ${this.renderContent()}
      </a>
    `
  }
}
