import { LitElement, html } from 'lit'
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js'

import Tab from '@/components/tabs/tab'
import TabPanel from '@/components/tabs/tab-panel'
import { tabsStyles } from '@/components/tabs/tabs.styles'
import { SelectionIndicatorController } from '@/controllers/selection-indicator-controller'
import { uniqueId } from '@/utils/unique-id'

@customElement('mm-tab-list')
export default class TabList extends LitElement {
  static styles = [tabsStyles]

  private readonly tabsId = uniqueId('tabs')

  @property({ type: String }) value = ''
  @property({ type: String, reflect: true }) variant = 'line'

  @queryAssignedElements({ flatten: true }) private assignedElements!: HTMLElement[]
  @query('.indicator') private indicator?: HTMLElement

  private indicatorPosition = new SelectionIndicatorController(this, {
    axis: 'x',
    getIndicator: () => this.indicator,
    getTarget: () => this.querySelector<HTMLElement>('mm-tab[active]') ?? undefined,
  })

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      <div class="indicator"></div>
    `
  }

  private get tabs(): Tab[] {
    return this.assignedElements.filter((element): element is Tab => element instanceof Tab)
  }

  /** 같은 부모에서 다음 mm-tab-list 전까지 이어지는 형제 패널을 이 탭리스트의 패널로 본다. */
  private get panels(): TabPanel[] {
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
    this.setAttribute('role', 'tablist')
    this.addEventListener('tab-select', this.handleTabSelect)
    this.addEventListener('keydown', this.handleKeydown)
  }

  disconnectedCallback() {
    this.removeEventListener('tab-select', this.handleTabSelect)
    this.removeEventListener('keydown', this.handleKeydown)
    super.disconnectedCallback()
  }

  protected firstUpdated() {
    this.sync()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value') || changedProperties.has('variant')) this.sync()
  }

  private handleSlotChange = () => {
    this.sync()
  }

  private handleTabSelect = (event: Event) => {
    const customEvent = event as CustomEvent<{ value: string }>
    this.value = customEvent.detail.value
  }

  private handleKeydown = (event: KeyboardEvent) => {
    const currentTab = event.composedPath().find(element => element instanceof Tab) as
      | Tab
      | undefined
    if (!currentTab) return

    const tabs = this.tabs
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
  private sync() {
    const tabs = this.tabs
    const panels = this.panels

    const selectedValue = tabs.some(tab => tab.value === this.value)
      ? this.value
      : tabs[0]?.value ?? ''
    if (selectedValue !== this.value) this.value = selectedValue

    tabs.forEach((tab, index) => {
      const panel = panels.find(candidate => candidate.value === tab.value)
      if (!tab.id) tab.id = `${this.tabsId}-tab-${index + 1}`

      tab.active = tab.value === selectedValue
      if (panel) {
        if (!panel.id) panel.id = `${this.tabsId}-panel-${index + 1}`
        tab.setAttribute('aria-controls', panel.id)
        panel.setAttribute('aria-labelledby', tab.id)
      } else {
        tab.removeAttribute('aria-controls')
      }
    })

    panels.forEach(panel => {
      panel.active = panel.value === selectedValue
      if (!tabs.some(tab => tab.value === panel.value)) panel.removeAttribute('aria-labelledby')
    })

    this.indicatorPosition.update()
  }
}
