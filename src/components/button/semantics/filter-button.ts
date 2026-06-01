import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../shared/reset.styles'

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
  /** 선택 방식: single(radio role) | multiple(checkbox role) */
  @property({ type: String }) mode: 'single' | 'multiple' = 'single'
  /** "전체" 옵션 — 클릭 시 그룹의 모든 옵션을 선택/해제 */
  @property({ type: Boolean, attribute: 'select-all' }) selectAll = false
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;

        --filter-button-selected-color: var(--selection-background);
        --filter-button-selected-border-color: var(--selection-indicator-color);
        --filter-button-selected-text-color: var(--selection-foreground);
      }

      :host([selected]) mm-button {
        --button-checked-color: var(--filter-button-selected-color);
        --button-checked-border-color: var(--filter-button-selected-border-color);
        --button-checked-text-color: var(--filter-button-selected-text-color);
      }
    `,
  ]

  private _handleClick() {
    if (this.disabled) return
    this.dispatchEvent(
      new CustomEvent('filter-toggle', {
        detail: { value: this.value, selected: !this.selected, selectAll: this.selectAll },
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
        role=${this.mode === 'multiple' ? 'checkbox' : 'radio'}
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
