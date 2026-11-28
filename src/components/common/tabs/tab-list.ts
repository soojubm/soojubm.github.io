import { LitElement, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import { Tab } from '@/components/common/tabs/tab'
import { TabPanel } from '@/components/common/tabs/tab-panel'
import { tabsStyles } from '@/components/common/tabs/tabs.styles'
import { RovingFocusController } from '@/controllers/roving-focus-controller'
import { SelectionIndicatorController } from '@/controllers/selection-indicator-controller'
import { emit } from '@/utils'
import { getSearchParam, replaceSearchParam } from '@/utils/search-param'
import '@/components/common/dot/dot'
import '@/components/common/scroll/semantics/scroll-hint'

export type TabListVariant = 'line' | 'pill' | 'text'

export interface TabItem {
  value: string
  label: string
}

@customElement('fff-tab-list')
export class TabList extends LitElement {
  static styles = [tabsStyles]
  @property({ attribute: false }) tabs: TabItem[] = []
  @property({ type: String }) value = ''
  @property({ type: String, reflect: true }) variant: TabListVariant = 'line'
  /** 지정하면 선택한 탭을 이 키의 search parameter로 URL에 남기고, 진입 시 그 값으로 탭을 연다. */
  @property({ type: String, attribute: 'search-param' }) searchParam?: string
  @query('.indicator') private indicator?: HTMLElement
  private indicatorPosition = new SelectionIndicatorController(this, {
    getIndicator: () => this.indicator,
    getTarget: () => this.tabElements.find(tab => tab.active),
  })
  // 방향키로 포커스가 옮겨지면 곧 선택이 따라오는 자동 활성화 탭이라, 포커스 이동이 선택이고 끝에서는 순환한다.
  private rovingFocus = new RovingFocusController(this, {
    getItems: () => this.tabElements,
    getActiveIndex: () => this.tabElements.findIndex(tab => tab.active),
    wrap: true,
    onFocusMove: index => this.tabElements[index]?.select(),
  })

  render() {
    return html`
      <fff-scroll-hint placement="start" size="small"></fff-scroll-hint>
      <div class="indicator">${this.renderDot()}</div>
      ${this.tabs.map(tab => this.renderTab(tab))}
      <fff-scroll-hint placement="end" size="small"></fff-scroll-hint>
    `
  }

  private renderTab(tab: TabItem) {
    return html`
      <fff-tab
        .value=${tab.value}
        .active=${tab.value === this.value}
        @tab-select=${this.handleTabSelect}
      >
        ${tab.label}
      </fff-tab>
    `
  }

  private renderDot() {
    if (this.variant !== 'text') return nothing

    return html`
      <fff-dot tone="gray" size="6"></fff-dot>
    `
  }

  private get tabElements(): Tab[] {
    return Array.from(this.renderRoot.querySelectorAll<Tab>('fff-tab'))
  }

  /** 같은 부모에서 다음 fff-tab-list 전까지 이어지는 형제 패널을 이 탭리스트의 패널로 본다. */
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

  protected willUpdate(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('tabs') && !changedProperties.has('value')) return

    // 선택값이 탭에 없으면 첫 탭을 선택한다.
    if (this.tabs.some(tab => tab.value === this.value)) return
    this.value = this.tabs[0]?.value ?? ''
  }

  protected updated() {
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

  /** 선택값 기준으로 패널의 active와 ARIA 관계를 맞추고 인디케이터를 정렬한다. */
  private sync() {
    const tabs = this.tabs
    const panels = this.panels

    // 탭이 shadow 안에 있어 id 참조가 닿지 않으므로, 패널의 이름은 탭 label을 aria-label로 준다.
    panels.forEach(panel => {
      const tab = tabs.find(candidate => candidate.value === panel.value)
      panel.active = panel.value === this.value
      if (tab) panel.setAttribute('aria-label', tab.label)
      else panel.removeAttribute('aria-label')
    })

    this.rovingFocus.refresh()
    this.indicatorPosition.update()
  }
}
