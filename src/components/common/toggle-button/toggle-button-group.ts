import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { Orientation } from '@/controllers/roving-focus-controller'
import type { OptionItem } from '@/types'

import { buttonBaseStyles, buttonSelectedStyles } from '@/components/common/button/button.styles'
import { RovingFocusController } from '@/controllers/roving-focus-controller'
import { SingleSelectionController } from '@/controllers/single-selection-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'
import '@/components/common/icon/icon'

// 누름 상태를 토글하는 버튼 묶음이므로 role="group" 컨테이너에 각 버튼은 aria-pressed로 표현한다.
// mm-toggle-button을 감싸 토큰으로 re-skin하지 않고, 공유 버튼 스타일 모듈(buttonBaseStyles·
// buttonSelectedStyles)을 조합해 자체 button을 렌더한다. 그래야 roving focus가 한 renderRoot의
// button을 바로 순회하고, 단일 선택 규칙도 shadow 경계 없이 그룹이 온전히 소유한다.
@customElement('mm-toggle-button-group')
export class ToggleButtonGroup extends LitElement {
  static styles = [
    resetStyles,
    buttonBaseStyles,
    buttonSelectedStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
      }

      button {
        --button-border-radius: 0;
      }

      button:first-child {
        --button-border-radius: var(--radius) 0 0 var(--radius);
      }

      button:last-child {
        --button-border-radius: 0 var(--radius) var(--radius) 0;
      }

      button:only-child {
        --button-border-radius: var(--radius);
      }

      :host([stretch]) {
        display: flex;
      }

      :host([stretch]) button {
        flex: 1;
      }
    `,
  ]
  @property({ attribute: false }) options: OptionItem[] = []
  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) stretch = false
  // 아이콘만 보일 때 label을 보이는 텍스트 대신 버튼의 접근성 이름으로 쓴다.
  @property({ type: Boolean, attribute: 'hidden-label' }) hiddenLabel = false
  @property({ type: String, reflect: true }) role = 'group'
  @property({ type: String }) orientation: Orientation = 'horizontal'
  private selection = new SingleSelectionController(this, {
    getValue: () => this.value,
    setValue: value => {
      this.value = value
    },
  })
  private rovingFocus = new RovingFocusController(this, {
    getItems: () => Array.from(this.renderRoot.querySelectorAll('button')),
    orientation: () => this.orientation,
    getActiveIndex: () => this.options.findIndex(option => this.selection.isOptionSelected(option)),
  })

  render() {
    return html`
      ${repeat(
        this.options,
        option => option.value,
        option => this.renderOption(option),
      )}
    `
  }

  private renderOption(option: OptionItem) {
    return html`
      <button
        type="button"
        aria-pressed=${this.selection.isOptionSelected(option) ? 'true' : 'false'}
        aria-label=${this.hiddenLabel ? option.label : nothing}
        ?disabled=${option.disabled}
        @click=${() => this.handleOptionClick(option)}
      >
        ${this.renderIcon(option.icon)}${this.hiddenLabel ? nothing : option.label}
      </button>
    `
  }

  private renderIcon(icon?: IconName) {
    if (!icon) return nothing

    return html`
      <mm-icon name=${icon}></mm-icon>
    `
  }

  private handleOptionClick(option: OptionItem) {
    if (option.disabled) return

    this.selection.select(option)
    emit(this, 'change', { value: this.value })
  }
}
