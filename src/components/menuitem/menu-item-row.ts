import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { menuItemStyles } from './menuitem.styles'

@customElement('mm-menu-item-row')
export class MenuItemRow extends LitElement {
  @property({ type: String }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel = ''

  /** 아이콘 (mm-avatar variant=tertiary로 렌더) */
  @property({ type: String }) icon = ''
  /** 아바타 이미지 URL */
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  /** 아바타 크기 (icon 또는 avatar-src 지정 시 유효) */
  @property({ type: String, attribute: 'avatar-size' }) avatarSize = 'medium'
  /** 아바타 변형 (icon 또는 avatar-src 지정 시 유효) */
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'

  @property({ type: Boolean, reflect: true }) disabled = false
  /** role 직접 지정 (미지정 시 컴포넌트 기본 role 사용) */
  @property({ type: String, attribute: 'role' }) override role = ''

  static styles = [menuItemStyles]

  protected getRole(): string {
    return this.role || 'menuitem'
  }

  override updated() {
    // role은 내부 .item 으로만 전달하고 host에서는 제거 (중복 방지)
    if (this.hasAttribute('role')) this.removeAttribute('role')
  }

  protected getAriaChecked(): string | undefined {
    return undefined
  }

  protected renderAction() {
    return html`<slot name="action"></slot>`
  }

  protected renderAvatar() {
    if (this.icon || this.avatarSrc) {
      return html`
        <mm-avatar
          variant=${this.avatarVariant}
          size=${this.avatarSize}
          icon=${ifDefined(this.icon || undefined)}
          src=${ifDefined(this.avatarSrc || undefined)}
        ></mm-avatar>
      `
    }
    return html`<slot name="avatar"></slot>`
  }

  protected renderContent() {
    const label = this.label
      ? html`<mm-text size="14">${this.label}</mm-text>`
      : html`<slot name="label"><slot></slot></slot>`

    return html`
      ${this.renderAvatar()}
      <slot name="prefix"></slot>
      <span class="content">
        <mm-text size="14">${label}</mm-text>
        ${this.description
          ? html`<mm-text
              size="14"
              color="var(--color-foreground-light)"
              style="margin-top: var(--space-1-minus)"
              >${this.description}</mm-text
            >`
          : nothing}
      </span>
      ${this.renderAction()}
    `
  }

  protected renderItem() {
    return html`
      <div
        class="item"
        role=${this.getRole()}
        data-tone=${ifDefined(this.tone || undefined)}
        aria-label=${ifDefined(this.ariaLabel || undefined)}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
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
