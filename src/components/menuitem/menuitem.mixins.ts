import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { MenuItemRow } from './menu-item-row'

type GConstructor<T = {}> = new (...args: any[]) => T

export const ToggleMixin = <T extends GConstructor<MenuItemRow>>(Base: T) => {
  class Toggle extends Base {
    @property({ type: Boolean, reflect: true }) checked = false
    @property({ type: String }) value = ''

    protected override get interactive() {
      return true
    }

    protected override getAriaChecked(): string | undefined {
      return String(this.checked)
    }

    // inner 컨트롤(checkbox·switch)과 이중 tab stop 방지
    protected override renderItem() {
      return html`
        <div
          class="item"
          role=${this.getRole()}
          data-tone=${ifDefined(this.tone || undefined)}
          ?data-interactive=${this.interactive}
          aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
          aria-checked=${ifDefined(this.getAriaChecked())}
        >
          ${this.renderContent()}
        </div>
      `
    }

    protected commitChecked(checked: boolean) {
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

    override connectedCallback() {
      super.connectedCallback()
      this.addEventListener('click', this._handleRowClick)
    }

    override disconnectedCallback() {
      super.disconnectedCallback()
      this.removeEventListener('click', this._handleRowClick)
    }
  }
  return Toggle
}
