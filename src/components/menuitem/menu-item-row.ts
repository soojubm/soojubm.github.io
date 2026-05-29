import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { menuItemStyles } from './menuitem.styles'

@customElement('mm-menu-item-row')
export class MenuItemRow extends LitElement {
  @property({ type: String }) tone = ''
  @property({ type: String }) icon = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''

  @property({ type: Boolean, reflect: true })
  disabled = false

  static styles = [menuItemStyles]

  protected getRole() {
    return 'menuitem'
  }

  protected getAriaChecked(): string | undefined {
    return undefined
  }

  protected renderAction() {
    return html` <slot name="action"></slot> `
  }

  protected renderContent() {
    const label = this.label
      ? html`<mm-text size="14">${this.label}</mm-text>`
      : html`<slot name="label"><slot></slot></slot>`

    return html`
      ${this.icon ? html`<mm-avatar variant="tertiary" icon="${this.icon}"></mm-avatar>` : ''}
      <slot name="avatar"></slot>
      <slot name="prefix"></slot>
      <span class="content">
        ${label}
        ${this.description
          ? html`<mm-text size="12" color="var(--color-foreground-light)"
              >${this.description}</mm-text
            >`
          : null}
      </span>
      ${this.renderAction()}
    `
  }

  protected renderItem() {
    return html`
      <div
        class="item"
        role=${this.getRole()}
        data-tone=${this.tone}
        aria-disabled=${String(this.disabled)}
        aria-checked=${ifDefined(this.getAriaChecked())}
      >
        ${this.renderContent()}
      </div>
    `
  }

  render() {
    return this.renderItem()
  }
}

export default MenuItemRow
