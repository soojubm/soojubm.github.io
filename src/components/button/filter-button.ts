import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../shared/reset.styles'

/**
 * 콘텐츠 필터링 옵션 버튼. mm-button(size=small)을 합성합니다.
 * 선택 시 체크 아이콘을 표시하고 selected 상태를 반영합니다.
 */
@customElement('mm-filter-button')
export class FilterButton extends LitElement {
  /** 옵션 식별 값 (그룹에서 selection 추적에 사용) */
  @property({ type: String }) value = ''
  /** 선택 상태 */
  @property({ type: Boolean, reflect: true }) selected = false
  /** 다중 선택 그룹 여부 (checkbox role) / 단일 선택이면 radio role */
  @property({ type: Boolean }) multiple = false
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }
    `,
  ]

  private _handleClick() {
    if (this.disabled) return
    this.dispatchEvent(
      new CustomEvent('filter-toggle', {
        detail: { value: this.value, selected: !this.selected },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <mm-button
        variant="tertiary"
        size="small"
        status=${this.selected ? 'checked' : ''}
        ?disabled=${this.disabled}
        icon=${this.selected ? 'check' : ''}
        role=${this.multiple ? 'checkbox' : 'radio'}
        aria-checked=${this.selected ? 'true' : 'false'}
        @click=${this._handleClick}
      >
        <slot></slot>
      </mm-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-filter-button': FilterButton
  }
}
