import { LitElement, html, css, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'
import { MenuItemRadio } from '@/components/menuitem/semantics/menu-item-radio'
import '@/components/menuitem/semantics/menu-item-group'
import { emit } from '@/utils/emit'

@customElement('mm-menu-item-radio-group')
export class MenuItemRadioGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  @queryAssignedElements({ selector: 'mm-menu-item-radio', flatten: true })
  private radios!: MenuItemRadio[]

  // 하위 mm-menu-item-radio에서 올라오는 이벤트를 가로챕니다.
  private handleRadioChange(e: Event) {
    const target = e.target as HTMLElement
    if (target.tagName.toLowerCase() !== 'mm-menu-item-radio') return

    e.stopPropagation() // 개별 아이템 이벤트 전파 중단

    const detail = (e as CustomEvent).detail
    this.value = detail.value

    // 그룹 내의 모든 라디오 버튼을 찾아 현재 선택된 것 외에는 전부 체크 해제합니다.
    this.radios.forEach(radio => {
      if (radio !== target) {
        radio.checked = false
      }
    })

    // 최종적으로 그룹 차원의 change 이벤트를 외부에 발생시킵니다.
    emit(this, 'change', { value: this.value, name: this.name })
  }

  // 처음에 마크업으로 들어온 자식 노드들에게 name 속성과 초기 checked 값을 동기화합니다.
  private handleSlotChange() {
    this.radios.forEach(radio => {
      if (this.name) radio.name = this.name
      if (this.value && radio.value === this.value) {
        radio.checked = true
      }
    })
  }

  render() {
    return html`
      <mm-menu-item-group
        role="radiogroup"
        aria-label=${this.ariaLabel || nothing}
        @change=${this.handleRadioChange}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </mm-menu-item-group>
    `
  }
}

export default MenuItemRadioGroup
