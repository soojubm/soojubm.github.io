import { LitElement, css, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { FilterButton } from '@/components/button/semantics/filter-button'

import { emit } from '@/utils/emit'
import '@/components/flex/flex'

/**
 * mm-filter-button을 묶는 그룹.
 * mode 속성으로 다중 선택(체크박스형) / 단일 선택(라디오형)을 전환합니다.
 * 레이아웃은 host가 담당하고, 선택 방식의 role은 내부 그룹에 명시합니다.
 */
type FilterMode = 'single' | 'multiple'
type FilterToggleDetail = { value: string; selected: boolean; selectAll?: boolean }

@customElement('mm-filter-button-group')
export class FilterButtonGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({ type: String }) mode: FilterMode = 'single'
  @property({ type: Array }) selected: string[] = []

  @queryAssignedElements({ selector: 'mm-filter-button', flatten: true })
  private buttons!: FilterButton[]

  render() {
    return html`
      <mm-flex gap="2" role=${this.isMultiple ? 'group' : 'radiogroup'}>
        <slot @slotchange=${this.adoptInitialSelection}></slot>
      </mm-flex>
    `
  }

  private get isMultiple() {
    return this.mode === 'multiple'
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('filter-toggle', this.onToggle)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('filter-toggle', this.onToggle)
  }

  private onToggle = (event: Event) => {
    const { value, selected, selectAll } = (event as CustomEvent<FilterToggleDetail>).detail

    if (selectAll) {
      this.selected = selected
        ? this.buttons.filter(button => !button.selectAll).map(button => button.value)
        : []
    } else if (this.isMultiple) {
      this.selected = selected ? [...this.selected, value] : this.selected.filter(v => v !== value)
    } else {
      this.selected = selected ? [value] : []
    }

    this.syncButtons()
    emit(this, 'change', { values: this.selected })
  }

  private syncButtons() {
    const selected = new Set(this.selected)
    const options = this.buttons.filter(button => !button.selectAll)
    const selectAll = this.buttons.find(button => button.selectAll)

    options.forEach(button => {
      button.selected = selected.has(button.value)
      button.mode = this.mode
    })

    if (selectAll) {
      selectAll.selected = options.length > 0 && options.every(button => selected.has(button.value))
      selectAll.mode = this.mode
    }
  }

  private adoptInitialSelection = () => {
    const preselected = this.buttons.filter(button => button.selected).map(button => button.value)
    if (preselected.length) {
      this.selected = this.isMultiple ? preselected : preselected.slice(0, 1)
    }
    this.syncButtons()
  }

  firstUpdated() {
    this.adoptInitialSelection()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-filter-button-group': FilterButtonGroup
  }
}
