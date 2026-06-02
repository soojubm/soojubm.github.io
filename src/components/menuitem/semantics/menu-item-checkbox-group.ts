import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { MenuItemCheckbox } from './menu-item-checkbox'
import './menu-item-group'

/**
 * mm-menu-item-checkbox를 묶는 다중 선택 그룹.
 * 선택된 value 목록을 values prop으로 관리하며
 * 변경 시 change 이벤트를 발행합니다.
 */
@customElement('mm-menu-item-checkbox-group')
export class MenuItemCheckboxGroup extends LitElement {
  /** 그룹 레이블 (aria-label) */
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel = ''
  /** 선택된 value 목록 */
  @property({ type: Array }) values: string[] = []

  static styles = css`
    :host {
      display: block;
    }
  `

  private get _checkboxes() {
    return Array.from(
      this.querySelectorAll<MenuItemCheckbox>('mm-menu-item-checkbox'),
    )
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLElement
    if (target.tagName.toLowerCase() !== 'mm-menu-item-checkbox') return
    e.stopPropagation()

    const { checked, value } = (e as CustomEvent<{ checked: boolean; value: string }>).detail

    this.values = checked
      ? [...this.values, value]
      : this.values.filter(v => v !== value)

    // 자식 동기화
    this._checkboxes.forEach(cb => {
      cb.checked = this.values.includes(cb.value)
    })

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { values: this.values },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private handleSlotChange() {
    // 마크업의 초기 checked 상태를 values로 흡수
    const preselected = this._checkboxes.filter(cb => cb.checked).map(cb => cb.value)
    if (preselected.length && !this.values.length) {
      this.values = preselected
    }
    // values 기준으로 동기화
    this._checkboxes.forEach(cb => {
      cb.checked = this.values.includes(cb.value)
    })
  }

  render() {
    return html`
      <mm-menu-item-group
        role="group"
        aria-label=${ifDefined(this.ariaLabel || undefined)}
        @change=${this.handleChange}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </mm-menu-item-group>
    `
  }
}

export default MenuItemCheckboxGroup
