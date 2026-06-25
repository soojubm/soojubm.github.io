import { LitElement, html } from 'lit'
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js'
import Tab from './tab'
import TabPanel from './tab-panel'
import { uniqueId } from '../../utils/unique-id'
import { tabsStyles } from './tabs.styles'

@customElement('mm-tab-list')
export default class TabList extends LitElement {
  private readonly _tabsId = uniqueId('tabs')

  @property({ type: String }) value = ''
  @property({ type: String, reflect: true }) variant = 'line'

  @queryAssignedElements({ flatten: true }) private _assignedElements!: HTMLElement[]
  @query('.indicator') private indicator!: HTMLDivElement
  @query('.tablist-container') private tablistContainer!: HTMLDivElement

  static styles = [tabsStyles]

  private get _tabs(): Tab[] {
    return this._assignedElements.filter((element): element is Tab => element instanceof Tab)
  }

  /** 같은 부모에서 다음 mm-tab-list 전까지 이어지는 형제 패널을 이 탭리스트의 패널로 본다. */
  private get _panels(): TabPanel[] {
    const panels: TabPanel[] = []
    let sibling = this.nextElementSibling
    while (sibling) {
      if (sibling instanceof TabList) break
      if (sibling instanceof TabPanel) panels.push(sibling)
      sibling = sibling.nextElementSibling
    }
    return panels
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('tab-select', this._handleTabSelect)
    this.addEventListener('keydown', this._handleKeydown)
  }

  disconnectedCallback() {
    this.removeEventListener('tab-select', this._handleTabSelect)
    this.removeEventListener('keydown', this._handleKeydown)
    super.disconnectedCallback()
  }

  protected firstUpdated() {
    this._sync()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value') || changedProperties.has('variant')) {
      this._sync()
    }
  }

  private _handleSlotChange = () => {
    this._sync()
  }

  private _handleTabSelect = (event: Event) => {
    const customEvent = event as CustomEvent<{ value: string }>
    this.value = customEvent.detail.value
  }

  private _handleKeydown = (event: KeyboardEvent) => {
    const currentTab = event.composedPath().find(element => element instanceof Tab) as
      | Tab
      | undefined
    if (!currentTab) return

    const tabs = this._tabs
    const currentIndex = tabs.indexOf(currentTab)
    if (currentIndex < 0) return

    let nextIndex: number | undefined
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length
        break
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = tabs.length - 1
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        currentTab.select()
        return
      default:
        return
    }

    event.preventDefault()
    const nextTab = tabs[nextIndex]
    nextTab.select()
    nextTab.focus()
  }

  /** 선택값 기준으로 탭·패널의 active와 ARIA 관계를 맞추고 인디케이터를 정렬한다. */
  private _sync() {
    const tabs = this._tabs
    const panels = this._panels

    const selectedValue = tabs.some(tab => tab.value === this.value)
      ? this.value
      : tabs[0]?.value ?? ''
    if (selectedValue !== this.value) this.value = selectedValue

    tabs.forEach((tab, index) => {
      const panel = panels.find(candidate => candidate.value === tab.value)
      if (!tab.id) tab.id = `${this._tabsId}-tab-${index + 1}`

      tab.active = tab.value === selectedValue
      if (panel) {
        if (!panel.id) panel.id = `${this._tabsId}-panel-${index + 1}`
        tab.setAttribute('aria-controls', panel.id)
        panel.setAttribute('aria-labelledby', tab.id)
      } else {
        tab.removeAttribute('aria-controls')
      }
    })

    panels.forEach(panel => {
      panel.active = panel.value === selectedValue
      if (!tabs.some(tab => tab.value === panel.value)) {
        panel.removeAttribute('aria-labelledby')
      }
    })

    this._moveIndicator()
  }

  private _moveIndicator() {
    requestAnimationFrame(() => {
      const activeTab = this._tabs.find(tab => tab.hasAttribute('active'))
      if (!activeTab) {
        if (this.indicator) this.indicator.style.width = '0px'
        return
      }

      // indicator는 .tablist-container 기준 absolute이므로 container rect 기준으로 연산
      const tabRect = activeTab.getBoundingClientRect()
      const containerRect = this.tablistContainer.getBoundingClientRect()
      this.indicator.style.transform = `translateX(${tabRect.left - containerRect.left}px)`
      this.indicator.style.width = `${tabRect.width}px`
    })
  }

  render() {
    return html`
      <div class="tablist-container" role="tablist">
        <slot @slotchange=${this._handleSlotChange}></slot>
        <div class="indicator"></div>
      </div>
    `
  }
}
