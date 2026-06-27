import { LitElement, css, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import type { FilterButton } from './filter-button'
import { emit } from '../../../utils/emit'

/**
 * mm-filter-button을 묶는 그룹.
 * mode 속성으로 다중 선택(체크박스형) / 단일 선택(라디오형)을 전환합니다.
 * 레이아웃은 host가 담당하고, 선택 방식의 role은 내부 그룹에 명시합니다.
 */
type FilterMode = 'single' | 'multiple'

@customElement('mm-filter-button-group')
export class FilterButtonGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .filter-button-group {
        display: flex;
        gap: var(--space-2);
      }
    `,
  ]

  @property({ type: String }) mode: FilterMode = 'single'
  @property({ type: Array }) selected: string[] = []

  @queryAssignedElements({ selector: 'mm-filter-button', flatten: true })
  private _buttons!: FilterButton[]

  private get _isMultiple() {
    return this.mode === 'multiple'
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('filter-toggle', this._onToggle as EventListener)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('filter-toggle', this._onToggle as EventListener)
  }

  /** "전체" 옵션을 제외한 일반 옵션 버튼 */
  private get _optionButtons() {
    return this._buttons.filter(b => !b.selectAll)
  }

  private get _selectAllButton() {
    return this._buttons.find(b => b.selectAll)
  }

  private _onToggle = (
    e: CustomEvent<{ value: string; selected: boolean; selectAll?: boolean }>,
  ) => {
    const { value, selected, selectAll } = e.detail

    if (selectAll) {
      this.selected = selected ? this._optionButtons.map(b => b.value) : []
    } else if (this._isMultiple) {
      this.selected = selected ? [...this.selected, value] : this.selected.filter(v => v !== value)
    } else {
      this.selected = selected ? [value] : []
    }

    this._syncButtons()
    emit(this, 'change', { values: this.selected })
  }

  private _syncButtons() {
    this._optionButtons.forEach(btn => {
      btn.selected = this.selected.includes(btn.value)
      btn.mode = this.mode
    })
    const allBtn = this._selectAllButton
    if (allBtn) {
      const allSelected =
        this._optionButtons.length > 0 &&
        this._optionButtons.every(b => this.selected.includes(b.value))
      allBtn.selected = allSelected
      allBtn.mode = this.mode
    }
  }

  private _adoptInitialSelection = () => {
    const preselected = this._buttons.filter(b => b.selected).map(b => b.value)
    if (preselected.length) {
      this.selected = this._isMultiple ? preselected : preselected.slice(0, 1)
    }
    this._syncButtons()
  }

  firstUpdated() {
    this._adoptInitialSelection()
  }

  render() {
    return html`
      <div class="filter-button-group" role=${this._isMultiple ? 'group' : 'radiogroup'}>
        <slot @slotchange=${this._adoptInitialSelection}></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-filter-button-group': FilterButtonGroup
  }
}
