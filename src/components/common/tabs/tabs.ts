import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { TabItem, TabList, TabListVariant } from '@/components/common/tabs/tab-list'

import { TabPanel } from '@/components/common/tabs/tab-panel'
import { emit } from '@/utils'
import '@/components/common/tabs/tab-list'

@customElement('fff-tabs')
export class Tabs extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
  `
  @property({ attribute: false }) tabs: TabItem[] = []
  @property({ type: String }) value = ''
  @property({ type: String }) variant: TabListVariant = 'line'
  @property({ type: String, attribute: 'search-param' }) searchParam?: string
  @query('fff-tab-list') private tabList!: TabList

  render() {
    return html`
      <fff-tab-list
        .tabs=${this.tabs}
        .value=${this.value}
        variant=${this.variant}
        search-param=${ifDefined(this.searchParam)}
        @change=${this.handleTabListChange}
      ></fff-tab-list>
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }

  protected async updated() {
    await this.tabList.updateComplete
    this.syncPanels()
  }

  private handleTabListChange = (event: Event) => {
    event.stopPropagation()

    this.value = this.tabList.value
    this.syncPanels()
    emit(this, 'change', { value: this.value })
  }

  private handleSlotChange = () => {
    this.syncPanels()
  }

  /** 선택값에 맞춰 패널을 열고, 탭이 shadow 안에 있어 id 참조가 닿지 않으므로 탭 label을 aria-label로 준다. */
  private syncPanels() {
    const slot = this.renderRoot.querySelector('slot')
    const panels = (slot?.assignedElements({ flatten: true }) ?? []).filter(
      (element): element is TabPanel => element instanceof TabPanel,
    )
    const selected = this.tabList.value

    panels.forEach(panel => {
      const tab = this.tabs.find(candidate => candidate.value === panel.value)
      panel.active = panel.value === selected
      if (tab) panel.setAttribute('aria-label', tab.label)
      else panel.removeAttribute('aria-label')
    })
  }
}
