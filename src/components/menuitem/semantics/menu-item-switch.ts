import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { IconName } from '../../icon-button/semantics/icon-names'
import { menuItemStyles } from '../menuitem.styles'
import { renderMenuItemContent } from '../menuitem.utils'

@customElement('mm-menu-item-switch')
export class MenuItemSwitch extends LitElement {
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

  static styles = [menuItemStyles]

  private commitChecked(checked: boolean) {
    if (this.disabled) return
    this.checked = checked
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _handleRowClick = () => {
    this.commitChecked(!this.checked)
  }

  protected handleControlChange = (e: Event) => {
    e.stopPropagation()
    const { checked } = (e as CustomEvent<{ checked: boolean }>).detail
    this.commitChecked(checked)
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this._handleRowClick)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this._handleRowClick)
  }

  private renderAction() {
    return html`
      <mm-switch
        slot="trailing"
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${this.handleControlChange}
      ></mm-switch>
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
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </div>
    `
  }
}

export default MenuItemSwitch
