import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { menuItemStyles } from '../menuitem.styles'
import { renderMenuItemContent } from '../menuitem.utils'

@customElement('mm-menu-item-action')
export class MenuItemAction extends LitElement {
  @property({ type: String }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon = ''
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-size' }) avatarSize = 'medium'
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'
  @property({ type: Boolean, attribute: 'has-trailing-arrow' }) hasTrailingArrow = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String, attribute: 'role' }) override role = ''

  static styles = [menuItemStyles]

  override updated() {
    if (this.hasAttribute('role')) this.removeAttribute('role')
  }

  private renderAction() {
    if (!this.hasTrailingArrow) return html``

    return html`
      <span slot="trailing">
        <mm-icon name="arrow-right" size="small"></mm-icon>
      </span>
    `
  }

  render() {
    return html`
      <button
        type="button"
        class="item"
        role="menuitem"
        data-tone=${ifDefined(this.tone || undefined)}
        data-interactive
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </button>
    `
  }
}

export default MenuItemAction
