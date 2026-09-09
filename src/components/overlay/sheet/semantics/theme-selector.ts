import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import type { Popover } from '@/components/overlay/popover/popover'

import '@/components/common/icon-button/icon-button'
import '@/components/common/menu-item/semantics/menu-item-radio-group'
import '@/components/common/menu-item/semantics/menu-item-radio'
import '@/components/overlay/popover/popover'
import '@/components/common/radius-picker/radius-picker'
import '@/components/common/separator/separator'

import { ICON_NAMES, type IconName } from '@/components/common/icon/icon-names'
import { getPreferredTheme, saveTheme, THEMES, type Theme } from '@/utils/theme'

@customElement('mm-theme-selector')
export class ThemeSelector extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property({ type: String }) value: Theme = 'light'

  @query('mm-popover') private popoverEl?: Popover

  render() {
    return html`
      <mm-popover placement="bottom-right">
        <mm-icon-button
          slot="trigger"
          variant="ghost"
          icon=${this.currentIcon}
          aria-label="테마 변경"
        ></mm-icon-button>
        <mm-menu-item-radio-group
          name="theme"
          value=${this.value}
          aria-label="테마 선택"
          @change=${this.handleThemeChange}
        >
          ${this.renderThemeOptions()}
        </mm-menu-item-radio-group>
        <mm-separator></mm-separator>
        <mm-radius-picker></mm-radius-picker>
      </mm-popover>
    `
  }

  private renderThemeOptions() {
    return THEMES.map(
      theme => html`
        <mm-menu-item-radio
          value=${theme.value}
          icon=${theme.icon}
          label=${theme.label}
        ></mm-menu-item-radio>
      `,
    )
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.value = getPreferredTheme()
  }

  private get currentIcon(): IconName {
    return THEMES.find(theme => theme.value === this.value)?.icon ?? ICON_NAMES.LIGHT_MODE
  }

  // 선택 시 테마를 저장하고 현재 값을 동기화
  private handleThemeChange(event: CustomEvent<{ value: string }>) {
    this.value = saveTheme(event.detail.value as Theme)
    this.popoverEl?.close()
  }
}
