import { LitElement, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'
import { checkboxGroupStyles } from '../checkbox.styles'

import type { Checkbox } from '../checkbox'
import { emit } from '../../../utils/emit'

type CheckboxChangeDetail = {
  checked: boolean
  value?: string
}

@customElement('mm-checkbox-group')
export class CheckboxGroup extends LitElement {
  @property({ type: String })
  name?: string

  @property({ type: String })
  legend?: string

  @property({ type: Array })
  value: string[] = []

  static styles = [checkboxGroupStyles]

  @queryAssignedElements({ selector: 'mm-checkbox' })
  private _checkboxes!: Checkbox[]

  private _isInitialized = false

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('change', this._onCheckboxChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('change', this._onCheckboxChange)
  }

  updated(changed: Map<string, unknown>) {
    // [수정] 최초 렌더링 시점(초기화 전)에는 외부 value가 자식 상태를 덮어쓰지 않도록
    // _isInitialized가 true일 때만 실행되게 제어합니다.
    if (this._isInitialized && (changed.has('value') || changed.has('name'))) {
      this._syncCheckboxes()
    }
  }

  private _onSlotChange() {
    // 첫 로드 시점에 그룹의 value가 비어있다면 자식들의 초기 checked 상태를 수집합니다.
    if (!this._isInitialized && this.value.length === 0) {
      const initialCheckedValues = this._checkboxes
        .filter(checkbox => {
          // [안정성 보완] 컴포넌트가 미처 업그레이드되지 않았을 때를 대비해 하이브리드로 체크 상태를 확인합니다.
          return checkbox.checked || checkbox.hasAttribute('checked')
        })
        .map(checkbox => {
          // [안정성 보완] value 프로퍼티가 없으면 attribute에서 읽어옵니다.
          return checkbox.value || checkbox.getAttribute('value') || ''
        })

      if (initialCheckedValues.length > 0) {
        this.value = initialCheckedValues
      }
    }

    this._isInitialized = true
    this._syncCheckboxes()
  }

  private _syncCheckboxes() {
    if (!this._checkboxes) return

    this._checkboxes.forEach(checkbox => {
      // 동기화 시점에도 안전하게 프로퍼티와 어트리뷰트를 모두 지원합니다.
      const value = checkbox.value || checkbox.getAttribute('value') || ''

      if (this.name) {
        checkbox.name = this.name
      }

      checkbox.checked = this.value.includes(value)
    })
  }

  private _onCheckboxChange = (event: Event) => {
    const target = event.target

    if (!(target instanceof HTMLElement) || target.tagName !== 'MM-CHECKBOX') return

    const customEvent = event as CustomEvent<CheckboxChangeDetail>
    customEvent.stopPropagation()

    const { checked, value } = customEvent.detail

    if (!value) return

    if (checked) {
      if (!this.value.includes(value)) {
        this.value = [...this.value, value]
      }
    } else {
      this.value = this.value.filter(item => item !== value)
    }

    this._dispatchValueChange()
  }

  private _dispatchValueChange() {
    emit(this, 'change', {
      values: this.value,
    })
  }

  render() {
    return html`
      <fieldset>
        ${this.legend
          ? html`
              <legend>
                <mm-text size="12" color="light">${this.legend}</mm-text>
              </legend>
            `
          : nothing}
        <slot @slotchange=${this._onSlotChange}></slot>
      </fieldset>
    `
  }
}

export default CheckboxGroup
