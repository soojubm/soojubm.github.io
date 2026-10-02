import { LitElement, html, nothing } from 'lit'
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js'

import { Tab } from '@/components/common/tabs/tab'
import { TabPanel } from '@/components/common/tabs/tab-panel'
import { tabsStyles } from '@/components/common/tabs/tabs.styles'
import { RovingFocusController } from '@/controllers/roving-focus-controller'
import { SelectionIndicatorController } from '@/controllers/selection-indicator-controller'
import { emit, uniqueId } from '@/utils'
import { getSearchParam, replaceSearchParam } from '@/utils/search-param'
import '@/components/common/dot/dot'
import '@/components/common/scroll/semantics/scroll-hint'

export type TabListVariant = 'line' | 'pill' | 'text'

@customElement('mm-tab-list')
export class TabList extends LitElement {
  static styles = [tabsStyles]
  private readonly tabsId = uniqueId('tabs')
  @property({ type: String }) value = ''
  @property({ type: String, reflect: true }) variant: TabListVariant = 'line'
  /** 지정하면 선택한 탭을 이 키의 search parameter로 URL에 남기고, 진입 시 그 값으로 탭을 연다. */
  @property({ type: String, attribute: 'search-param' }) searchParam?: string
  @queryAssignedElements({ flatten: true }) private assignedElements!: HTMLElement[]
  @query('.indicator') private indicator?: HTMLElement
  private indicatorPosition = new SelectionIndicatorController(this, {
    axis: 'x',
    getIndicator: () => this.indicator,
    getTarget: () => this.querySelector<HTMLElement>('mm-tab[active]') ?? undefined,
  })
  // 방향키로 포커스가 옮겨지면 곧 선택이 따라오는 자동 활성화 탭이라, 포커스 이동이 선택이고 끝에서는 순환한다.
  private rovingFocus = new RovingFocusController(this, {
    getItems: () => this.tabs,
    getActiveIndex: () => this.tabs.findIndex(tab => tab.active),
    wrap: true,
    onFocusMove: index => this.tabs[index]?.select(),
  })

  constructor() {
    super()
    // 리스너 대상이 host 자신이라 연결이 바뀌어도 유지되므로 생성자에서 한 번만 등록한다.
    this.addEventListener('tab-select', this.handleTabSelect)
  }

  render() {
    return html`
      <mm-scroll-hint placement="start" size="small"></mm-scroll-hint>
      <div class="indicator">${this.renderDot()}</div>
      <slot @slotchange=${this.handleSlotChange}></slot>
      <mm-scroll-hint placement="end" size="small"></mm-scroll-hint>
    `
  }

  private renderDot() {
    if (this.variant !== 'text') return nothing

    return html`
      <mm-dot tone="gray" size="6"></mm-dot>
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
    if (this.searchParam) this.value = getSearchParam(this.searchParam) ?? this.value
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
    // 탭 단위 이벤트는 여기서 끊고 탭리스트 단위 change로 승격한다.
    event.stopPropagation()

    const customEvent = event as CustomEvent<{ value: string }>
    if (customEvent.detail.value === this.value) return

    this.value = customEvent.detail.value
    if (this.searchParam) replaceSearchParam(this.searchParam, this.value)
    emit(this, 'change', { value: this.value })
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

    this.rovingFocus.refresh()
    this.indicatorPosition.update()
  }
}
