import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { IconName } from '../../icon-button/semantics/icon-names'
import { menuItemStyles } from '../menuitem.styles'
import { renderMenuItemContent } from '../menuitem.utils'
import { emit } from '../../../utils/emit'

@customElement('mm-menu-item-checkbox')
export class MenuItemCheckbox extends LitElement {
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

  private commitChecked(checked: boolean) {
    if (this.disabled) return
    this.checked = checked
    emit(this, 'change', { checked: this.checked, value: this.value })
  }

  private handleRowClick = () => {
    this.commitChecked(!this.checked)
  }

  protected handleControlChange = (e: Event) => {
    e.stopPropagation()
    const { checked } = (e as CustomEvent<{ checked: boolean }>).detail
    this.commitChecked(checked)
  }

  private renderAction() {
    return html`
      <mm-checkbox
        slot="trailing"
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${this.handleControlChange}
      ></mm-checkbox>
    `
  }

  render() {
    return html`
      <div
        class="item"
        role="menuitemcheckbox"
        data-interactive
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-checked=${String(this.checked)}
        @click=${this.handleRowClick}
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </div>
    `
  }
}

export default MenuItemCheckbox
