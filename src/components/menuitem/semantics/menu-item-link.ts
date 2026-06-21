import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { ICON_NAMES, type IconName } from '../../icon-button/semantics/icon-names'
import { menuItemStyles } from '../menuitem.styles'
import { renderMenuItemContent } from '../menuitem.utils'

@customElement('mm-menu-item-link')
export class MenuItemLink extends LitElement {
  @property({ type: String, reflect: true }) size = 'medium'
  @property({ type: String, reflect: true }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String }) href = ''
  @property({ type: String }) target = '_blank'
  @property({ type: Boolean, attribute: 'hide-trailing' }) hideTrailing = false
  @property({ type: String, attribute: 'aria-current', reflect: true }) ariaCurrent = ''

  static styles = [menuItemStyles]

  private renderAction() {
    if (this.hideTrailing) return html``

    const trailingIcon = this.target === '_blank' ? ICON_NAMES.SHARE : ICON_NAMES.FORWARD

    return html`
      <span slot="trailing">
        <mm-icon name=${trailingIcon} size="small"></mm-icon>
      </span>
    `
  }

  render() {
    return html`
      <a
        href=${ifDefined(this.disabled ? undefined : this.href)}
        class="item"
        part="item"
        role="menuitem"
        data-interactive
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        aria-current=${ifDefined(this.ariaCurrent || undefined)}
        target=${ifDefined(this.target || undefined)}
        rel=${ifDefined(this.target === '_blank' ? 'noopener noreferrer' : undefined)}
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </a>
    `
  }
}
