import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import '../list-row/list-row'
import { menuItemStyles } from './menuitem.styles'

@customElement('mm-menu-item-row')
export class MenuItemRow extends LitElement {
  @property({ type: String }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-size' }) avatarSize = 'medium'
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'

  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String, attribute: 'role' }) override role = ''

  static styles = [menuItemStyles]

  protected get interactive(): boolean {
    return true
  }

  protected getRole(): string {
    return this.role || 'menuitem'
  }

  override updated() {
    if (this.hasAttribute('role')) this.removeAttribute('role')
  }

  protected getAriaChecked(): string | undefined {
    return undefined
  }

  protected renderAction() {
    return html`<slot name="action" slot="trailing"></slot>`
  }

  protected renderContent() {
    return html`
      <mm-list-row
        label=${this.label}
        description=${this.description}
        icon=${ifDefined(this.icon || undefined)}
        avatar-src=${ifDefined(this.avatarSrc || undefined)}
        avatar-size=${this.avatarSize}
        avatar-variant=${this.avatarVariant}
      >
        ${this.label ? nothing : html`<slot name="label"><slot></slot></slot>`}
        ${this.renderAction()}
      </mm-list-row>
    `
  }

  protected renderItem() {
    return html`
      <button
        type="button"
        class="item"
        role=${this.getRole()}
        data-tone=${ifDefined(this.tone || undefined)}
        ?data-interactive=${this.interactive}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        aria-checked=${ifDefined(this.getAriaChecked())}
      >
        ${this.renderContent()}
      </button>
    `
  }

  render() {
    return this.renderItem()
  }
}

export default MenuItemRow
