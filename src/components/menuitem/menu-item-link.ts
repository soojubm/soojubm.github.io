import { html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { MenuItemRow } from './menu-item-row'

@customElement('mm-menu-item-link')
export class MenuItemLink extends MenuItemRow {
  @property({ type: String }) href = ''
  @property({ type: String }) target = ''
  @property({ type: String }) rel = ''
  /** 명시적으로 외부 링크 아이콘을 표시. 미지정 시 target="_blank" 이면 자동 표시 */
  @property({ type: Boolean }) external = false

  private get _isExternal() {
    return this.external || this.target === '_blank'
  }

  protected override get interactive() {
    return true
  }

  protected override renderAction() {
    return html`
      <span class="link-trailing" slot="trailing">
        ${this._isExternal
          ? html`<mm-icon name="arrow-up-right" size="small"></mm-icon>`
          : nothing}
        <slot name="action"></slot>
      </span>
    `
  }

  protected override renderItem() {
    return html`
      <a
        href=${ifDefined(this.disabled ? undefined : this.href)}
        target=${ifDefined(this.target || undefined)}
        rel=${ifDefined(this.rel || this._isExternal ? 'noopener noreferrer' : undefined)}
        class="item"
        role=${this.getRole()}
        data-tone=${ifDefined(this.tone || undefined)}
        ?data-interactive=${this.interactive}
        aria-label=${ifDefined(this.ariaLabel || undefined)}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
      >
        ${this.renderContent()}
      </a>
    `
  }
}
