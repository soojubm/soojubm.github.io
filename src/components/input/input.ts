import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { AriaIdRef, AriaInvalid } from '../../types/aria'

/**
 * <mm-input>
 * 공용 input 요소 컴포넌트. textfield 및 파생 컴포넌트(number-input 등)가 공유한다.
 * 라벨/헬퍼/검증/슬롯은 textfield가 담당하고, 이 컴포넌트는 순수 input 요소만 렌더한다.
 */
@customElement('mm-input')
export class Input extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex: 1 1 auto;
      min-width: 0;
    }

    input {
      width: 100%;
      min-width: 0;
      height: 100%;
      border: 0;
      outline: none;
      background: inherit;
      font: inherit;
      color: var(--color-foreground);

      &:focus-visible {
        outline: 0;
      }

      &::placeholder {
        color: var(--color-foreground-light);
      }

      &:read-only {
        color: var(--color-foreground-light);
        cursor: default;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &[type='text'],
      &[type='date'],
      &[type='password'],
      &[type='search'] {
        -webkit-appearance: none;
      }

      &[type='number'] {
        -webkit-appearance: none;
        -moz-appearance: textfield;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          -moz-appearance: none;
        }
      }

      &[type='date'] {
        display: block;
        max-height: var(--size-large);

        &::-webkit-calendar-picker-indicator {
          width: 100%;
          opacity: 0;
          position: absolute;
          left: 0;
          bottom: 0;
        }

        &::-webkit-inner-spin-button {
          display: none;
          -webkit-appearance: none;
        }
      }

      &[type='password'] {
        letter-spacing: 0.25rem;
      }

      &[type='search'] {
        font-family: inherit;
        font-size: inherit;

        &::-webkit-search-decoration,
        &::-webkit-search-cancel-button,
        &::-webkit-search-results-button,
        &::-webkit-search-results-decoration {
          display: none;
        }
      }
    }
  `

  @property({ attribute: 'input-id' }) inputId = ''
  @property() type = 'text'
  @property() value = ''
  @property() name = ''
  @property() placeholder = ''
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-invalid' }) ariaInvalid: AriaInvalid = null
  @property({ attribute: 'aria-describedby' }) ariaDescribedBy: AriaIdRef = null
  @property({ type: Number }) min?: number
  @property({ type: Number }) max?: number
  @property({ type: Number }) step?: number

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    event.stopPropagation()
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }))
  }

  override render() {
    return html`
      <input
        id=${this.inputId || nothing}
        type=${this.type}
        .value=${this.value}
        name=${this.name || nothing}
        placeholder=${this.placeholder || nothing}
        aria-label=${this.ariaLabel || nothing}
        min=${this.min ?? nothing}
        max=${this.max ?? nothing}
        step=${this.step ?? nothing}
        ?disabled=${this.disabled}
        aria-invalid=${this.ariaInvalid ?? nothing}
        aria-describedby=${this.ariaDescribedBy ?? nothing}
        @input=${this.handleInput}
      />
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-input': Input
  }
}

export default Input
