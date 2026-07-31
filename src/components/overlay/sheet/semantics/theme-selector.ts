import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import '@/components/common/icon-button/icon-button'
import '@/components/common/menu-item/semantics/menu-item-action'
import '@/components/common/menu-item/menu-item-group'
import '@/components/overlay/popover/popover'
import '@/components/common/radius-picker/radius-picker'
import '@/components/common/separator/separator'
import type Popover from '@/components/overlay/popover/popover'

import { ICON_NAMES, type IconName } from '@/components/common/icon-button/semantics/icon-names'
import { getPreferredTheme, saveTheme, THEMES, type Theme } from '@/utils'

@customElement('mm-theme-selector')
export class ThemeSelector extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    mm-popover {
      --surface-padding-block: var(--space-1);
      --surface-padding-inline: var(--space-1);
    }

    mm-menu-item-action[aria-current='true'] {
      color: var(--interaction-selected-foreground-color);
    }
  `

  @property({ type: String }) value: Theme = 'light'

  @query('mm-popover') private popoverEl?: Popover

  render() {
    return html`
      <mm-popover role="menu" placement="bottom-right">
        <mm-icon-button
          slot="trigger"
          variant="ghost"
          icon=${this.currentIcon}
          aria-label="테마 변경"
        ></mm-icon-button>
        <mm-menu-item-group>${this.renderThemeOptions()}</mm-menu-item-group>
        <mm-separator scope="element"></mm-separator>
        <mm-radius-picker></mm-radius-picker>
      </mm-popover>
    `
  }

  private renderThemeOptions() {
    return THEMES.map(theme => this.renderThemeOption(theme))
  }

  private renderThemeOption(theme: typeof THEMES[number]) {
    return html`
      <mm-menu-item-action
        icon=${theme.icon}
        aria-current=${ifDefined(theme.value === this.value ? 'true' : undefined)}
        @click=${() => this.handleThemeChange(theme.value)}
      >
        ${theme.label}
      </mm-menu-item-action>
    `
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.value = getPreferredTheme()
  }

  private get currentIcon(): IconName {
    return THEMES.find(theme => theme.value === this.value)?.icon ?? ICON_NAMES.LIGHT_MODE
  }

  // 선택 시 테마를 저장하고 현재 값을 동기화
  private handleThemeChange(theme: Theme) {
    this.value = saveTheme(theme)
    this.popoverEl?.close()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-theme-selector': ThemeSelector
  }
}
