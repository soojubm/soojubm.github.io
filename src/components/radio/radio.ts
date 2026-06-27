import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { radioStyles } from '@/components/radio/radio.styles'
import { emit } from '@/utils/emit'
import { uniqueId } from '@/utils/unique-id'
import '@/components/text/text'

@customElement('mm-radio')
export class Radio extends LitElement {
  static styles = [radioStyles]

  // 인스턴스 전역 내장 프로퍼티인 id 오버라이드 데코레이터 제거
  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean }) disabled = false

  // 인스턴스 생성 시 단 한 번만 고유 ID 발급
  private generatedId = uniqueId('radio')

  render() {
    // 외부에서 지정한 id가 있으면 쓰고, 없으면 자동 생성된 고유 ID 사용
    const inputId = this.id || this.generatedId

    return html`
      <div>
        <input
          type="radio"
          id=${inputId}
          name=${this.name || nothing}
          .value=${this.value || ''}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.onChange}
        />
        <label for=${inputId}>
          <span></span>
          <mm-text><slot></slot></mm-text>
        </label>
      </div>
    `
  }

  private onChange(event: Event) {
    event.stopPropagation() // 네이티브 이벤트 전파 차단

    this.checked = (event.target as HTMLInputElement).checked

    emit(this, 'change', { checked: this.checked, value: this.value })
  }
}

export default Radio
