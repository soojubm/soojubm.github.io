import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../shared/reset.styles'
import type { FilterButton } from './filter-button'

/**
 * mm-filter-button을 묶는 그룹.
 * mode 속성으로 다중 선택(체크박스형) / 단일 선택(라디오형)을 전환합니다.
 */
type FilterMode = 'single' | 'multiple'

@customElement('mm-filter-button-group')
export class FilterButtonGroup extends LitElement {
  /** 선택 방식: single(라디오형) | multiple(체크박스형) */
  @property({ type: String }) mode: FilterMode = 'single'
  /** 선택된 value 목록 */
  @property({ type: Array }) selected: string[] = []

  private get _isMultiple() {
    return this.mode === 'multiple'
  }

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
      div {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
    `,
  ]

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('filter-toggle', this._onToggle as EventListener)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('filter-toggle', this._onToggle as EventListener)
  }

  private get _buttons() {
    return Array.from(this.querySelectorAll('mm-filter-button')) as FilterButton[]
  }

  private _onToggle = (e: CustomEvent<{ value: string; selected: boolean }>) => {
    const { value, selected } = e.detail

    if (this._isMultiple) {
      this.selected = selected
        ? [...this.selected, value]
        : this.selected.filter(v => v !== value)
    } else {
      // 단일 선택: 같은 값을 다시 누르면 해제, 아니면 교체
      this.selected = selected ? [value] : []
    }

    this._syncButtons()
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { selected: this.selected },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _syncButtons() {
    this._buttons.forEach(btn => {
      btn.selected = this.selected.includes(btn.value)
      btn.multiple = this.multiple
    })
  }

  // 버튼에 미리 selected가 지정돼 있으면 그룹 상태로 흡수
  private _adoptInitialSelection = () => {
    const preselected = this._buttons.filter(b => b.selected).map(b => b.value)
    if (preselected.length) {
      this.selected = this.multiple ? preselected : preselected.slice(0, 1)
    }
    this._syncButtons()
  }

  firstUpdated() {
    this._adoptInitialSelection()
  }

  render() {
    return html`
      <div role=${this.multiple ? 'group' : 'radiogroup'}>
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
