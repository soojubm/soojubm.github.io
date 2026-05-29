import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import TabList from './tab-list'
import Tab from './tab'
import TabPanel from './tab-panel'

@customElement('mm-tabs')
export class Tabs extends LitElement {
  @property({ type: String, reflect: true }) value = ''
  @property({ type: String, reflect: true }) variant = 'line'

  static styles = css`
    :host {
      display: block;
    }
  `

  constructor() {
    super()
    // 하위 mm-tab 컴포넌트에서 버블링되어 올라오는 커스텀 이벤트를 감지합니다.
    this.addEventListener('tab-select', (e: Event) => {
      const customEvent = e as CustomEvent<{ value: string }>
      this.value = customEvent.detail.value
    })
  }

  protected updated(changedProperties: Map<string, any>) {
    // value나 variant 속성이 변경되면 자식 요소들을 재동기화합니다.
    if (changedProperties.has('value') || changedProperties.has('variant')) {
      this._syncElements()
    }
  }

  protected firstUpdated() {
    this._syncElements()
  }

  private _syncElements() {
    const tabs = this.querySelectorAll('mm-tab')
    const panels = this.querySelectorAll('mm-tab-panel')
    const tabList = this.querySelector('mm-tab-list')

    // 1. 모든 개별 탭 버튼 active 상태 동기화
    tabs.forEach(tab => {
      if (tab instanceof Tab) {
        tab.active = tab.value === this.value
      }
    })

    // 2. 모든 콘텐츠 패널 active 상태 동기화
    panels.forEach(panel => {
      if (panel instanceof TabPanel) {
        panel.active = panel.value === this.value
      }
    })

    // 3. 탭 리스트 컨테이너에 variant를 주입하고 인디케이터를 재정렬시킵니다.
    if (tabList && tabList instanceof TabList) {
      tabList.setAttribute('variant', this.variant)
      tabList.handleTabChange()
    }
  }

  render() {
    return html`<slot></slot>`
  }
}
