import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import '@/components/overlay/popover/popover'

import { ICON_NAMES, type IconName } from '@/components/common'
import { getPreferredTheme, saveTheme, THEMES, type Theme } from '@/utils/theme'

// 아이콘은 트리거가 현재 테마를 보여줄 때만 쓰고, 패널 버튼은 레이블만 둬 패널 폭을 좁힌다.
const THEME_OPTIONS = THEMES.map(({ value, label }) => ({ value, label }))

/**
 * 테마와 모서리 모양을 바꾸는 설정 패널. 메뉴가 아니라 여러 컨트롤을 담은 disclosure이므로
 * 트리거는 aria-expanded만 갖고, 패널은 선택 후에도 열린 채로 남는다.
 */
@customElement('mm-theme-selector')
export class ThemeSelector extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `
  @property({ type: String }) value: Theme = 'light'

  render() {
    return html`
      <mm-popover placement="bottom-right">
        <mm-icon-button
          slot="trigger"
          variant="ghost"
          icon=${this.currentIcon}
          aria-label="테마 변경"
        ></mm-icon-button>
        <mm-toggle-button-group
          stretch
          aria-label="테마"
          .options=${THEME_OPTIONS}
          .value=${this.value}
          @change=${this.handleThemeChange}
        ></mm-toggle-button-group>
        <mm-radius-picker></mm-radius-picker>
      </mm-popover>
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
  private handleThemeChange(event: CustomEvent<{ value: string }>) {
    this.value = saveTheme(event.detail.value as Theme)
  }
}
