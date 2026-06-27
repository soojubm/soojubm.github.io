import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { IconName } from '../../icon-button/semantics/icon-names'
import { menuItemStyles } from '../menuitem.styles'
import { renderMenuItemContent } from '../menuitem.utils'
import { emit } from '../../../utils/emit'

@customElement('mm-menu-item-radio')
export class MenuItemRadio extends LitElement {
  static styles = [menuItemStyles]

  @property({ type: String, reflect: true }) size = 'medium'
  @property({ type: String, reflect: true }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) checked = false
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''

  private handleSelect = () => {
    if (this.disabled) return
    if (this.checked) return
    this.checked = true
    emit(this, 'change', { checked: this.checked, value: this.value, name: this.name })
  }

  private handleControlChange = (e: Event) => {
    e.stopPropagation()
    this.handleSelect()
  }

  private renderAction() {
    return html`
      <mm-radio
        slot="trailing"
        .name=${this.name}
        .value=${this.value}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${this.handleControlChange}
      ></mm-radio>
    `
  }

  render() {
    return html`
      <div
        class="item"
        role="menuitemradio"
        data-interactive
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-checked=${String(this.checked)}
        @click=${this.handleSelect}
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </div>
    `
  }
}

export default MenuItemRadio
