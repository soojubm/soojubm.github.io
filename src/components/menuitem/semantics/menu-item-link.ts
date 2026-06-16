import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import { menuItemStyles } from '../menuitem.styles'
import { renderMenuItemContent } from '../menuitem.utils'

@customElement('mm-menu-item-link')
export class MenuItemLink extends LitElement {
  @property({ type: String, reflect: true }) size = 'medium'
  @property({ type: String }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon = ''
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String }) href = ''

  static styles = [menuItemStyles]

  private renderAction() {
    return html`
      <span slot="trailing">
        <mm-icon name=${ICON_NAMES.SHARE} size="small"></mm-icon>
      </span>
    `
  }

  render() {
    return html`
      <a
        href=${ifDefined(this.disabled ? undefined : this.href)}
        class="item"
        role="menuitem"
        data-tone=${ifDefined(this.tone || undefined)}
        data-interactive
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        target="_blank"
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </a>
    `
  }
}
