import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { menuItemStyles } from '../menuitem.styles'
import { renderMenuItemContent } from '../menuitem.utils'

@customElement('mm-menu-item-radio')
export class MenuItemRadio extends LitElement {
  @property({ type: String, reflect: true }) size = 'medium'
  @property({ type: String, reflect: true }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon = ''
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, reflect: true }) checked = false
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''

  static styles = [menuItemStyles]

  private handleSelect() {
    if (this.disabled) return
    if (this.checked) return
    this.checked = true
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked, value: this.value, name: this.name },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private handleControlChange(e: Event) {
    e.stopPropagation()
    this.handleSelect()
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this.handleSelect)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this.handleSelect)
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
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        aria-checked=${String(this.checked)}
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </div>
    `
  }
}

export default MenuItemRadio
