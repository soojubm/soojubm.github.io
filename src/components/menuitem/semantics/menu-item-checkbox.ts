import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { menuItemStyles } from '../menuitem.styles'
import { renderMenuItemContent } from '../menuitem.utils'

@customElement('mm-menu-item-checkbox')
export class MenuItemCheckbox extends LitElement {
  @property({ type: String }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon = ''
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-size' }) avatarSize = 'medium'
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, reflect: true }) checked = false
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
        data-tone=${ifDefined(this.tone || undefined)}
        data-interactive
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        aria-checked=${String(this.checked)}
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </div>
    `
  }
}

export default MenuItemCheckbox
