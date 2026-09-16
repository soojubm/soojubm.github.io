import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AriaIdRef, AriaInvalid } from '@/types'

import { resetStyles } from '@/stylesheets/shared.styles'

export type InputType =
  | 'text'
  | 'search'
  | 'tel'
  | 'url'
  | 'email'
  | 'password'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'color'
  | 'hidden'

export const INPUT_TYPE_UNION =
  "'text' | 'search' | 'tel' | 'url' | 'email' | 'password' | 'number' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'hidden'"

/**
 * <mm-input>
 * 공용 input 요소 컴포넌트. textfield 및 파생 컴포넌트(number-input 등)가 공유한다.
 * 라벨/헬퍼/검증/슬롯은 textfield가 담당하고, 이 컴포넌트는 순수 input 요소만 렌더한다.
 */
@customElement('mm-input')
export class Input extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex: 1 1 auto;
        min-width: 0;
      }

      input {
        width: 100%;
        min-width: 0;
        height: 100%;
        outline: none;
        color: var(--foreground-color);

        &:focus-visible {
          outline: 0;
        }

        &::placeholder {
          color: var(--foreground-subtle-color);
        }

        &:read-only {
          color: var(--foreground-subtle-color);
          cursor: default;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &[type='date'] {
          display: block;
          max-height: var(--size-48);

          &::-webkit-calendar-picker-indicator {
            width: 100%;
            opacity: 0;
            position: absolute;
            left: 0;
            bottom: 0;
          }
        }
      }
    `,
  ]
  @property({ attribute: 'input-id' }) inputId = ''
  @property() type: InputType = 'text'
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
  @query('input') private input?: HTMLInputElement

  override render() {
    return html`
      <input
        id=${ifDefined(this.inputId || undefined)}
        type=${this.type}
        .value=${this.value}
        name=${ifDefined(this.name || undefined)}
        placeholder=${ifDefined(this.placeholder || undefined)}
        aria-label=${this.ariaLabel || nothing}
        min=${ifDefined(this.min)}
        max=${ifDefined(this.max)}
        step=${ifDefined(this.step)}
        ?disabled=${this.disabled}
        aria-invalid=${ifDefined(this.ariaInvalid ?? undefined)}
        aria-describedby=${this.ariaDescribedBy ?? nothing}
        @input=${this.handleInput}
      />
    `
  }

  // 호스트는 포커스를 받지 않으므로 실제 input으로 넘긴다.
  focus(options?: FocusOptions) {
    this.input?.focus(options)
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    event.stopPropagation()
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }))
  }
}
