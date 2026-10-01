import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { Popover } from '@/components/overlay/popover/popover'

import '@/components/common'
import '@/components/overlay/popover/popover'

import { ICON_NAMES, type IconName } from '@/components/common'
import { uniqueId } from '@/utils'
import { getPreferredTheme, saveTheme, THEMES, type Theme } from '@/utils/theme'

@customElement('mm-theme-selector')
export class ThemeSelector extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `
  @property({ type: String }) value: Theme = 'light'
  // popover는 portal로 옮겨져 한 트리에 모이므로, 인스턴스가 여럿이어도 id가 겹치지 않게 한다.
  private readonly panelId = uniqueId('theme-panel')

  render() {
    return html`
      <mm-icon-button
        variant="ghost"
        icon=${this.currentIcon}
        aria-label="테마 변경"
        aria-controls=${this.panelId}
      ></mm-icon-button>
      <mm-popover id=${this.panelId} placement="bottom-end">
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

  // 선택 시 테마를 저장하고 현재 값을 동기화. popover는 portal로 옮겨져 이 shadow에서 찾을 수 없어 이벤트가 닿은 자리에서 찾는다.
  private handleThemeChange(event: CustomEvent<{ value: string }>) {
    this.value = saveTheme(event.detail.value as Theme)
    ;(event.currentTarget as HTMLElement).closest<Popover>('mm-popover')?.close()
  }
}
