import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AriaInvalid } from '@/types'
import '@/components/common/input/semantics/textfield'
import '@/components/common/icon-button/semantics/reveal-button'

@customElement('mm-passwordfield')
export class PasswordField extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String }) label?: string
  @property({ type: String }) description?: string
  @property({ type: String, attribute: 'validation-text' }) validationText?: string
  @property({ type: String, reflect: true }) size = ''
  @property({ type: Boolean }) optional = false
  @property({ type: Boolean, attribute: 'hidden-label', reflect: true }) hiddenLabel = false
  @property({ type: String, attribute: 'aria-invalid' }) ariaInvalid: AriaInvalid = null
  @state() private revealed = false
  @query('mm-textfield') private textfield?: HTMLElement

  render() {
    return html`
      <mm-textfield
        type=${this.revealed ? 'text' : 'password'}
        .value=${this.value}
        .name=${this.name}
        .placeholder=${this.placeholder}
        .label=${this.label}
        .description=${this.description}
        .validationText=${this.validationText}
        .size=${this.size}
        ?optional=${this.optional}
        ?hidden-label=${this.hiddenLabel}
        aria-invalid=${ifDefined(this.ariaInvalid ?? undefined)}
        @input=${this.handleTextfieldInput}
      >
        <slot name="link" slot="link"></slot>
        <mm-reveal-button
          slot="trailing"
          .revealed=${this.revealed}
          @toggle=${this.handleRevealToggle}
        ></mm-reveal-button>
      </mm-textfield>
    `
  }

  // 호스트는 포커스를 받지 않으므로 mm-textfield로 넘긴다.
  focus(options?: FocusOptions) {
    this.textfield?.focus(options)
  }

  private handleTextfieldInput(event: CustomEvent<{ value: string }>) {
    this.value = event.detail.value
  }

  private handleRevealToggle(event: CustomEvent<{ revealed: boolean }>) {
    event.stopPropagation()
    this.revealed = event.detail.revealed
  }
}
