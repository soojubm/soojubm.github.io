import { LitElement, html, css, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import { MenuItemRadio } from '@/components/menuitem/semantics/menu-item-radio'
import '@/components/menuitem/semantics/menu-item-group'
import { SelectionController } from '@/controllers/selection-controller'
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

  private selection = new SelectionController(this, {
    getMode: () => 'single',
    getValues: () => (this.value ? [this.value] : []),
    setValues: values => {
      this.value = values[0] ?? ''
    },
    getOptions: () => this.radios?.map(radio => ({ value: radio.value })) ?? [],
  })

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value') || changedProperties.has('name')) this.syncRadios()
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

  // 하위 mm-menu-item-radio에서 올라오는 이벤트를 가로챕니다.
  private handleRadioChange(e: Event) {
    const target = e.target as HTMLElement
    if (target.tagName.toLowerCase() !== 'mm-menu-item-radio') return

    e.stopPropagation() // 개별 아이템 이벤트 전파 중단

    const detail = (e as CustomEvent).detail
    this.selection.setSelected({ value: detail.value }, true)
    this.syncRadios()

    // 최종적으로 그룹 차원의 change 이벤트를 외부에 발생시킵니다.
    emit(this, 'change', { value: this.value, name: this.name })
  }

  // 처음에 마크업으로 들어온 자식 노드들에게 name 속성과 초기 checked 값을 동기화합니다.
  private handleSlotChange() {
    this.radios.forEach(radio => {
      if (this.name) radio.name = this.name
    })
    this.syncRadios()
  }

  private syncRadios() {
    this.selection.sync(this.radios, (radio, selected) => {
      if (this.name) radio.name = this.name
      radio.checked = selected
    })
  }
}

export default MenuItemRadioGroup
