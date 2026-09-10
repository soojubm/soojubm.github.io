import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { visuallyHiddenInputStyles } from '@/components/common/input/input.styles'
import { radioCardStyles, radioStyles } from '@/components/common/radio/radio.styles'
import { ToggleController } from '@/controllers/toggle-controller'
import { emit, uniqueId } from '@/utils'

/**
 * 레이블만으로 부족해 가격·배지·설명을 담아야 할 때 쓰는 라디오. 면 전체가 선택 영역이자
 * 선택 상태의 표시면이다. 인디케이터·선택·포커스 규칙은 mm-radio의 공유 스타일을 그대로 조합하고,
 * 그룹·단일 선택은 mm-radio-group이 함께 소유한다.
 */
@customElement('mm-radio-card')
export class RadioCard extends LitElement {
  static styles = [visuallyHiddenInputStyles, radioStyles, radioCardStyles]

  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean }) disabled = false

  // shadow 안에서만 쓰는 label 연결용 id라 호스트의 id와 섞지 않는다.
  private inputId = uniqueId('radio-card')
  private toggle = new ToggleController(this, 'checked')

  render() {
    return html`
      <input
        type="radio"
        id=${this.inputId}
        name=${ifDefined(this.name || undefined)}
        .value=${this.value || ''}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${this.handleInputChange}
      />
      <label for=${this.inputId}>
        <span class="indicator"></span>
        <slot></slot>
      </label>
    `
  }

  private handleInputChange(event: Event) {
    event.stopPropagation() // 네이티브 이벤트 전파 차단

    const target = event.target as HTMLInputElement
    if (!this.toggle.set(target.checked)) return

    emit(this, 'change', { checked: this.checked, value: this.value })
  }
}
