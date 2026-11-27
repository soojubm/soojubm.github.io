import { LitElement, type PropertyValues, html, nothing } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { InputType } from '@/components/common/input/input'
import type { InputSize } from '@/components/common/input/input.styles'
import type { AriaInvalid } from '@/types'

import '@/components/common/input/semantics/textfield-label'
import '@/components/common/input/semantics/textfield-description'
import '@/components/common/input/semantics/textfield-validation'
import { type Constructor, emit, uniqueId } from '@/utils'

export const renderFieldLabel = (forId: string, label: string | undefined, optional: boolean) => {
  if (!label) return nothing

  return html`
    <mm-textfield-label for=${forId} ?optional=${optional}>${label}</mm-textfield-label>
  `
}

export const renderFieldDescription = (description: string | undefined, id?: string) => {
  if (!description) return nothing

  return html`
    <mm-textfield-description id=${ifDefined(id)}>${description}</mm-textfield-description>
  `
}

export const renderFieldValidation = (id: string, text: string | undefined) => {
  if (!text) return nothing

  return html`
    <mm-textfield-validation id=${id}>${text}</mm-textfield-validation>
  `
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isUrl = (value: string) => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

const matchesPattern = (value: string, pattern: string) => {
  try {
    return new RegExp(`^(?:${pattern})$`).test(value)
  } catch {
    return true
  }
}

export interface FieldRules {
  type?: InputType
  required: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  min?: number
  max?: number
  validator?: FieldValidator
}

/** 값을 받아 오류 문구를 돌려준다. 통과하면 빈 문자열이나 undefined. */
export type FieldValidator = (value: string) => string | undefined

// 브라우저 검증에 기대지 않고 필드가 규칙을 직접 판정한다. 먼저 어긋난 규칙의 문구를 돌려준다.
const getFieldError = (value: string, rules: FieldRules) => {
  if (!value) return rules.required ? '필수 입력 항목입니다.' : ''

  if (rules.type === 'email' && !EMAIL_PATTERN.test(value))
    return '올바른 이메일 형식으로 입력하세요.'
  if (rules.type === 'url' && !isUrl(value)) return '올바른 URL 형식으로 입력하세요.'
  if (rules.minLength !== undefined && value.length < rules.minLength) {
    return `${rules.minLength}자 이상 입력하세요.`
  }
  if (rules.maxLength !== undefined && value.length > rules.maxLength) {
    return `${rules.maxLength}자 이하로 입력하세요.`
  }
  if (rules.pattern && !matchesPattern(value, rules.pattern))
    return '요구하는 형식에 맞게 입력하세요.'

  if (rules.min !== undefined || rules.max !== undefined) {
    const numeric = Number(value)
    if (Number.isNaN(numeric)) return '올바른 값을 입력하세요.'
    if (rules.min !== undefined && numeric < rules.min) return `${rules.min} 이상으로 입력하세요.`
    if (rules.max !== undefined && numeric > rules.max) return `${rules.max} 이하로 입력하세요.`
  }

  return rules.validator?.(value) ?? ''
}

export interface TextfieldState {
  value: string
  name: string
  placeholder: string
  label?: string
  description?: string
  validationText?: string
  size: string
  optional: boolean
  hiddenLabel: boolean
  disabled: boolean
  required: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  validator?: FieldValidator
  ariaInvalid: AriaInvalid
  readonly inputId: string
  readonly descriptionId: string
  readonly validationId: string
  readonly describedBy: string
  readonly resolvedValidationText: string
  readonly resolvedAriaInvalid: AriaInvalid
  validate(): boolean
  handleInput(event: Event): void
  handleInputFocusout(): void
}

/**
 * textfield·passwordfield·quantity-field가 공유하는 필드 상태, input 값 동기화, 포커스 위임, 입력 규칙 검증.
 * 검증은 브라우저의 제약 검증에 기대지 않고 필드가 직접 판정한다(required·minlength·maxlength·
 * pattern·type 이메일/URL·min/max·validator). 환경마다 다른 판정과 문구를 피하고 커스텀 규칙을 같은 경로에 둔다.
 * 시점은 포커스를 벗어날 때 처음 검사하고, 오류가 표시된 뒤에는 입력할 때마다 다시 검사해
 * 고치는 즉시 오류가 사라지게 한다. 제출 시점은 소비자가 validate()로 부른다.
 * 값·규칙 속성이 코드로 바뀌어도 오류가 표시 중이면 다시 검사한다.
 * 소비자가 넘긴 validation-text(서버 오류 등)는 필드의 자체 검사 결과보다 우선한다.
 * 컨트롤 영역(슬롯 구성, 증감 버튼 등)은 각 컴포넌트가 소유한다.
 */
export const withTextfieldState = <T extends Constructor<LitElement>>(Base: T) => {
  class TextfieldStateElement extends Base {
    @property({ type: String }) value = ''
    @property({ type: String }) name = ''
    @property({ type: String }) placeholder = ''
    @property({ type: String }) label?: string
    @property({ type: String }) description?: string
    @property({ type: String, attribute: 'validation-text' }) validationText?: string
    @property({ type: String, reflect: true }) size: InputSize = 'medium'
    @property({ type: Boolean }) optional = false
    @property({ type: Boolean, attribute: 'hidden-label', reflect: true }) hiddenLabel = false
    @property({ type: Boolean, reflect: true }) disabled = false
    @property({ type: Boolean }) required = false
    @property({ type: Number }) minLength?: number
    @property({ type: Number }) maxLength?: number
    @property({ type: String }) pattern?: string
    @property({ attribute: false }) validator?: FieldValidator
    // 규칙에 쓰는 값은 각 필드가 소유한다(textfield는 type, quantity-field은 min·max).
    declare type?: InputType
    declare min?: number
    declare max?: number
    @property({ type: String, attribute: 'aria-invalid' }) ariaInvalid: AriaInvalid = null
    @state() private validityText = ''
    @query('mm-input') private input?: HTMLElement
    readonly inputId = uniqueId('input')

    get resolvedValidationText() {
      return this.validationText || this.validityText
    }

    get resolvedAriaInvalid(): AriaInvalid {
      if (this.ariaInvalid) return this.ariaInvalid
      if (this.validityText) return 'true'
      return null
    }

    get descriptionId() {
      return `${this.inputId}-description`
    }

    get validationId() {
      return `${this.inputId}-validation`
    }

    get describedBy() {
      return [
        this.description && this.descriptionId,
        this.resolvedValidationText && this.validationId,
      ]
        .filter(Boolean)
        .join(' ')
    }

    // 컴포넌트 자체는 포커스를 받지 않으므로 mm-input으로 넘긴다.
    focus(options?: FocusOptions) {
      this.input?.focus(options)
    }

    handleInput(event: Event) {
      const target = event.target as HTMLInputElement
      this.value = target.value
      emit(this, 'input', { value: this.value })
    }

    handleInputFocusout() {
      this.validate()
    }

    protected willUpdate(changed: PropertyValues) {
      if (!this.validityText) return

      const ruleKeys = ['value', 'required', 'minLength', 'maxLength', 'pattern', 'validator']
      if (ruleKeys.some(key => changed.has(key))) this.validate()
    }

    validate() {
      const validityText = getFieldError(this.value, {
        type: this.type,
        required: this.required,
        minLength: this.minLength,
        maxLength: this.maxLength,
        pattern: this.pattern,
        min: this.min,
        max: this.max,
        validator: this.validator,
      })
      if (validityText === this.validityText) return !validityText

      this.validityText = validityText
      emit(this, 'validation-change', { valid: !validityText })
      return !validityText
    }
  }

  return TextfieldStateElement as Constructor<TextfieldState> & T
}
