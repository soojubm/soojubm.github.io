import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import { emit } from '../../../utils/emit'

/**
 * 콘텐츠 필터링 옵션 버튼. mm-button(size=small)을 합성합니다.
 * 선택 시 체크 아이콘을 표시하고 selected 상태를 반영합니다.
 */
@customElement('mm-filter-button')
export class FilterButton extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) mode: 'single' | 'multiple' = 'single'
  @property({ type: Boolean, attribute: 'select-all' }) selectAll = false
  @property({ type: Boolean }) disabled = false

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
        --button-checked-background-color: var(--filter-button-selected-color);
        --button-checked-border-color: var(--filter-button-selected-border-color);
        --button-checked-text-color: var(--filter-button-selected-text-color);
        --button-checked-icon-color: var(--selection-foreground);
      }
    `,
  ]

  private _handleClick() {
    if (this.disabled) return
    emit(this, 'filter-toggle', {
      value: this.value,
      selected: !this.selected,
      selectAll: this.selectAll,
    })
  }

  render() {
    return html`
      <mm-button
        variant="tertiary"
        size="small"
        ?disabled=${this.disabled}
        icon=${this.selected ? ICON_NAMES.CHECK : nothing}
        role=${this.mode === 'multiple' ? 'checkbox' : 'radio'}
        aria-checked=${String(this.selected)}
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
