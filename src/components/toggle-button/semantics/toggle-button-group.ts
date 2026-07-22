import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { Orientation } from '@/controllers/roving-focus-controller'

import { buttonBaseStyles, buttonSelectedStyles } from '@/components/button/button.styles'
import { RovingFocusController } from '@/controllers/roving-focus-controller'
import { emit } from '@/utils/emit'
import { arrayAttributeConverter } from '@/utils/property-converters'
import '@/components/icon/icon'
import '@/components/toggle-button/semantics/view-mode-switcher'

export interface OptionItem {
  value: string

  label?: string
  icon?: IconName

  ariaLabel?: string
  disabled?: boolean
}

// 누름 상태를 토글하는 버튼 묶음이므로 role="group" 컨테이너에 각 버튼은 aria-pressed로 표현한다.
// mm-toggle-button을 감싸 토큰으로 re-skin하지 않고, 공유 버튼 스타일 모듈(buttonBaseStyles·
// buttonSelectedStyles)을 조합해 자체 button을 렌더한다. 그래야 roving focus가 한 renderRoot의
// button을 바로 순회하고, 단일 선택 규칙도 shadow 경계 없이 그룹이 온전히 소유한다.
@customElement('mm-toggle-button-group')
export class ToggleButtonGroup extends LitElement {
  static styles = [
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

  @property({
    attribute: 'options',
    converter: arrayAttributeConverter<OptionItem>(),
  })
  options: OptionItem[] = []
  @property({ type: Boolean, reflect: true }) stretch = false
  @property({ type: Number, attribute: 'selected-index' }) selectedIndex = 0
  @property({ type: String, reflect: true }) role = 'group'
  @property({ type: String }) orientation: Orientation = 'horizontal'

  private rovingFocus = new RovingFocusController(this, {
    getItems: () => Array.from(this.renderRoot.querySelectorAll('button')),
    orientation: () => this.orientation,
    getActiveIndex: () => this.selectedIndex,
  })

  render() {
    return html`
      ${repeat(
        this.options,
        option => option.value,
        (option, index) => this.renderOption(option, index),
      )}
    `
  }

  private renderOption(option: OptionItem, index: number) {
    return html`
      <button
        type="button"
        aria-pressed=${index === this.selectedIndex ? 'true' : 'false'}
        aria-label=${option.ariaLabel ?? option.label ?? ''}
        ?disabled=${option.disabled}
        @click=${() => this.selectOption(index, option)}
      >
        ${this.renderIcon(option.icon)}${option.label ?? ''}
      </button>
    `
  }

  private renderIcon(icon?: IconName) {
    if (!icon) return nothing

    return html`
      <mm-icon name=${icon}></mm-icon>
    `
  }

  private selectOption(index: number, option: OptionItem) {
    if (option.disabled) return

    this.selectedIndex = index

    emit(this, 'change', {
      index,
      value: option.value,
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toggle-button-group': ToggleButtonGroup
  }
}
