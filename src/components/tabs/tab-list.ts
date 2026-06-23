import { LitElement, html } from 'lit'
import { customElement, query, queryAssignedElements } from 'lit/decorators.js'
import { tabsStyles } from './tabs.styles'

@customElement('mm-tab-list')
export default class TabList extends LitElement {
  @queryAssignedElements({ flatten: true }) tabs!: HTMLElement[]
  @query('.indicator') indicator!: HTMLDivElement
  @query('.tablist-container') tablistContainer!: HTMLDivElement

  static styles = [tabsStyles]

  // 부모가 동기화를 위해 외부에서 호출하는 퍼블릭 메서드
  public handleTabChange() {
    requestAnimationFrame(() => {
      this._moveIndicator()
    })
  }

  private _handleSlotChange() {
    this.handleTabChange()
    this.dispatchEvent(new Event('tab-list-change', { bubbles: true, composed: true }))
  }

  private _moveIndicator() {
    // 현재 active 속성을 가지고 있는 활성 탭 엘리먼트를 찾습니다.
    const activeTab = this.tabs.find(tab => tab.hasAttribute('active'))

    if (activeTab) {
      const tabRect = activeTab.getBoundingClientRect()
      const containerRect = this.tablistContainer.getBoundingClientRect()

      // 핵심: indicator는 .tablist-container 기준 absolute이므로 container rect를 기준으로 연산
      const offsetLeft = tabRect.left - containerRect.left
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
