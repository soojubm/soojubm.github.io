import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { menuItemStyles } from './menuitem.styles'

@customElement('mm-menuitem')
class MenuItem extends LitElement {
  @property({ type: String }) alignment = ''
  @property({ type: String }) href = ''
  @property({ type: String }) icon = ''
  @property({ type: String }) tone = ''
  @property({ type: String }) description = ''
  @property({ type: String }) label = ''
  @property({ type: String }) current = ''
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [menuItemStyles]

  private renderContent() {
    return html`
      ${this.icon ? html`<mm-avatar variant="tertiary" icon="${this.icon}"></mm-avatar>` : ''}
      <slot name="avatar"></slot>
      <slot name="prefix"></slot>
      <span class="content">
        ${this.label ? html`<mm-text size="14">${this.label}</mm-text>` : html`<slot></slot>`}
        ${this.description
          ? html`<mm-text size="12" color="var(--color-foreground-light)"
              >${this.description}</mm-text
            >`
          : null}
      </span>
      <slot name="action"></slot>
    `
  }

  render() {
    const current = this.current || undefined
    const commonAttributes = {
      class: 'item',
      role: 'menuitem',
      'data-alignment': this.alignment,
      'data-tone': this.tone,
      'aria-current': current,
      'aria-disabled': String(this.disabled),
    }

    return this.href
      ? html`
          <a
            href=${ifDefined(this.disabled ? undefined : this.href)}
            class=${commonAttributes.class}
            role=${commonAttributes.role}
            data-alignment=${commonAttributes['data-alignment']}
            data-tone=${commonAttributes['data-tone']}
            aria-current=${ifDefined(commonAttributes['aria-current'])}
            aria-disabled=${commonAttributes['aria-disabled']}
          >
            ${this.renderContent()}
          </a>
        `
      : html`
      <div
        class="item"
        role="menuitem"
        data-alignment="${this.alignment}"
        data-tone="${this.tone}"
        aria-current=${ifDefined(current)}
        aria-disabled=${String(this.disabled)}
      >
        ${this.renderContent()}
      </div>
    `
  }
}

export default MenuItem
