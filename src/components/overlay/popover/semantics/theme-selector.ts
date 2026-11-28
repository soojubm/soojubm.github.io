import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import type { Popover } from '@/components/overlay/popover/popover'

import '@/components/common'
import '@/components/overlay/popover/popover'

import { ICON_NAMES, type IconName } from '@/components/common'
import { uniqueId } from '@/utils'
import { isLargeText, saveLargeText } from '@/utils/large-text'
import { getPreferredTheme, saveTheme, THEMES, type Theme } from '@/utils/theme'

@customElement('fff-theme-selector')
export class ThemeSelector extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `
  @property({ type: String }) value: Theme = 'light'
  @state() private largeText = isLargeText()
  // popover는 portal로 옮겨져 한 트리에 모이므로, 인스턴스가 여럿이어도 id가 겹치지 않게 한다.
  private readonly panelId = uniqueId('theme-panel')

  render() {
    return html`
      <fff-icon-button
        variant="ghost"
        icon=${this.currentIcon}
        aria-label="테마 변경"
        aria-controls=${this.panelId}
      ></fff-icon-button>
      <fff-popover id=${this.panelId} placement="bottom-end">
        <fff-menu-item-radio-group
          name="theme"
          value=${this.value}
          aria-label="테마 선택"
          .options=${THEMES}
          @change=${this.handleThemeChange}
        ></fff-menu-item-radio-group>
        <fff-separator></fff-separator>
        <fff-menu-item-group aria-label="글자 크기">
          <fff-menu-item-switch
            icon=${ICON_NAMES.TEXT_SIZE}
            label="큰글씨"
            ?checked=${this.largeText}
            @change=${this.handleLargeTextChange}
          ></fff-menu-item-switch>
        </fff-menu-item-group>
        <fff-separator></fff-separator>
        <fff-flex direction="column" gap="2">
          <fff-radius-picker></fff-radius-picker>
          <fff-color-picker></fff-color-picker>
        </fff-flex>
      </fff-popover>
    `
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
    ;(event.currentTarget as HTMLElement).closest<Popover>('fff-popover')?.close()
  }

  private handleLargeTextChange(event: CustomEvent<{ checked: boolean }>) {
    event.stopPropagation()
    this.largeText = saveLargeText(event.detail.checked)
  }
}
