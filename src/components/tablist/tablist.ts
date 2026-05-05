import { LitElement, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { tablistStyles } from './tablist.styles'

@customElement('mm-tablist')
class Tablist extends LitElement {
  @property({ type: String, reflect: true }) value = '0'

  static styles = [tablistStyles]

  @query('slot[name="tab"]') tabSlot!: HTMLSlotElement
  @query('slot[name="panel"]') panelSlot!: HTMLSlotElement

  // 슬롯의 내용환이 변할 때마다 인덱스를 다시 매깁니다.
  private _handleSlotChange() {
    this._updateItems()
  }

  private _handleSelect = (e: CustomEvent) => {
    const tabs = this.tabSlot.assignedElements() as any[]
    const target = e.target as any

    // 클릭된 탭의 순서(index)를 찾아 value로 설정
    const newIndex = tabs.indexOf(target)
    if (newIndex !== -1) {
      this.value = String(newIndex)
      this._updateItems()
    }
  }

  private _updateItems() {
    const tabs = this.tabSlot.assignedElements() as any[]
    const panels = this.panelSlot.assignedElements() as HTMLElement[]

    tabs.forEach((tab, i) => {
      tab.selected = String(i) === this.value
    })

    panels.forEach((panel, i) => {
      panel.style.display = String(i) === this.value ? 'block' : 'none'
    })
  }

  render() {
    return html`
      <nav role="tablist" class="tablist" @mm-tab-select="${this._handleSelect}">
        <slot name="tab" @slotchange="${this._handleSlotChange}"></slot>
      </nav>
      <div class="panel-container">
        <slot name="panel" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `
  }
}
