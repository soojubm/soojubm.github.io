import { LitElement, html } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import { tabsStyles } from './tabs.styles'

@customElement('mm-tab-list')
export default class TabList extends LitElement {
  @query('slot') tabSlot!: HTMLSlotElement
  @query('.indicator') indicator!: HTMLDivElement

  static styles = [tabsStyles]

  // 부모가 동기화를 위해 외부에서 호출하는 퍼블릭 메서드
  public handleTabChange() {
    requestAnimationFrame(() => {
      this._moveIndicator()
    })
  }

  private _handleSlotChange() {
    this.handleTabChange()
  }

  private _moveIndicator() {
    if (!this.indicator || !this.tabSlot) return

    const tabs = this.tabSlot.assignedElements() as HTMLElement[]
    // 현재 active 속성을 가지고 있는 활성 탭 엘리먼트를 찾습니다.
    const activeTab = tabs.find(tab => tab.hasAttribute('active'))

    if (activeTab) {
      const tabRect = activeTab.getBoundingClientRect()
      const listRect = this.getBoundingClientRect()

      // 핵심: 외부 Light DOM과 내부 Shadow DOM 간의 갭을 무력화하는 절대 좌표 연산
      const offsetLeft = tabRect.left - listRect.left
      const offsetWidth = tabRect.width

      this.indicator.style.transform = `translateX(${offsetLeft}px)`
      this.indicator.style.width = `${offsetWidth}px`
    } else {
      this.indicator.style.width = '0px'
    }
  }

  render() {
    return html`
      <div class="tablist-container" role="tablist">
        <slot @slotchange="${this._handleSlotChange}"></slot>
        <div class="indicator"></div>
      </div>
    `
  }
}
