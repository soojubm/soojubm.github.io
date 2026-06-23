import { LitElement, html, css } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'
import TabList from './tab-list'
import Tab from './tab'
import TabPanel from './tab-panel'

@customElement('mm-tabs')
export class Tabs extends LitElement {
  private readonly _tabsId = `tabs-${crypto.randomUUID()}`

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
  `
  @property({ type: String }) value = ''
  @property({ type: String, reflect: true }) variant = 'line'

  @queryAssignedElements({ selector: 'mm-tab-panel', flatten: true })
  private _panels!: TabPanel[]
  @queryAssignedElements({ selector: 'mm-tab-list', flatten: true })
  private _tabLists!: TabList[]

  private get _tabs() {
    return (this._tabLists[0]?.tabs ?? []).filter((tab): tab is Tab => tab instanceof Tab)
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('tab-select', this._handleTabSelect)
    this.addEventListener('tab-list-change', this._handleTabListChange)
    this.addEventListener('keydown', this._handleKeydown)
  }

  disconnectedCallback() {
    this.removeEventListener('tab-select', this._handleTabSelect)
    this.removeEventListener('tab-list-change', this._handleTabListChange)
    this.removeEventListener('keydown', this._handleKeydown)
    super.disconnectedCallback()
  }

  private _handleTabSelect = (event: Event) => {
    const customEvent = event as CustomEvent<{ value: string }>
    this.value = customEvent.detail.value
  }

  private _handleTabListChange = () => {
    this._syncElements()
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
    const tabs = this._tabs
    const panels = this._panels
    const tabList = this._tabLists[0]

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

    // 3. 탭 리스트 컨테이너에 variant를 주입하고 인디케이터를 재정렬시킵니다.
    if (tabList && tabList instanceof TabList) {
      tabList.setAttribute('variant', this.variant)
      tabList.handleTabChange()
    }
  }

  render() {
    return html`
      <slot @slotchange=${this._syncElements}></slot>
    `
  }
}
