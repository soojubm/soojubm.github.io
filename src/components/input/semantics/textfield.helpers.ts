import { LitElement, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AriaInvalid } from '@/types/aria'

import '@/components/input/semantics/textfield-label'
import '@/components/input/semantics/textfield-helper'
import '@/components/input/semantics/textfield-validation'
import { emit } from '@/utils/emit'
import { type Constructor } from '@/utils/mixin'
import { uniqueId } from '@/utils/unique-id'

export const renderFieldLabel = (forId: string, label: string | undefined, optional: boolean) => {
  if (!label) return nothing

  return html`
    <mm-textfield-label for=${forId} ?optional=${optional}>${label}</mm-textfield-label>
  `
}

export const renderFieldHelper = (helper: string | undefined, id?: string) => {
  if (!helper) return nothing

  return html`
    <mm-textfield-helper id=${ifDefined(id)}>${helper}</mm-textfield-helper>
  `
}

export const renderFieldValidation = (id: string, text: string | undefined) => {
  if (!text) return nothing

  return html`
    <mm-textfield-validation id=${id}>${text}</mm-textfield-validation>
  `
}

export interface TextfieldState {
  value: string
  name: string
  placeholder: string
  label?: string
  helper?: string
  validationText?: string
  size: string
  optional: boolean
  hiddenLabel: boolean
  disabled: boolean
  ariaInvalid: AriaInvalid
  readonly inputId: string
  handleInput(event: Event): void
}

/**
 * textfield·number-input이 공유하는 필드 상태와 input 값 동기화.
 * 컨트롤 영역(슬롯 구성, 증감 버튼 등)은 각 컴포넌트가 소유한다.
 */
export const withTextfieldState = <T extends Constructor<LitElement>>(Base: T) => {
  class TextfieldStateElement extends Base {
    @property({ type: String }) value = ''
    @property({ type: String }) name = ''
    @property({ type: String }) placeholder = ''
    @property({ type: String }) label?: string
    @property({ type: String }) helper?: string
    @property({ type: String, attribute: 'validation-text' }) validationText?: string
    @property({ type: String, reflect: true }) size = ''
    @property({ type: Boolean }) optional = false
    @property({ type: Boolean, attribute: 'hidden-label', reflect: true }) hiddenLabel = false
    @property({ type: Boolean }) disabled = false
    @property({ type: String, attribute: 'aria-invalid' }) ariaInvalid: AriaInvalid = null

    readonly inputId = uniqueId('input')

    handleInput(event: Event) {
      const target = event.target as HTMLInputElement
      this.value = target.value
      emit(this, 'input', { value: this.value })
    }
  }

  return TextfieldStateElement as Constructor<TextfieldState> & T
}
