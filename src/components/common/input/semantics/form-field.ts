import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/input/semantics/textfield-label'
import '@/components/common/input/semantics/textfield-helper'
import '@/components/common/input/semantics/textfield-validation'

/**
 * mm-form-field
 * textfield 계열이 아닌 컨트롤(gender-selector, checkbox-group, select 등)에
 * 레이블·헬퍼·검증 텍스트를 textfield와 같은 규칙으로 붙이는 래퍼.
 * 컨트롤 자체는 slot으로 받고, 필드는 레이블이 붙은 그룹으로서 role="group"을 가진다.
 *
 * mm-textfield와 병합하지 않는 이유: textfield는 자기 mm-input에 for·aria-describedby·
 * aria-invalid를 id로 배선하지만, form-field의 컨트롤은 slot 너머의 불투명한 요소라 그 배선을
 * 할 수 없다. 공통 규칙은 이미 mm-textfield-label/-helper/-validation 서브컴포넌트 레벨에서
 * 공유하므로, 둘은 base/파생이 아니라 형제로 둔다.
 */
@customElement('mm-form-field')
export class FormField extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }
  `

  @property({ type: String }) label = ''
  @property({ type: String }) helper = ''
  @property({ type: String, attribute: 'validation-text' }) validationText = ''
  @property({ type: Boolean }) optional = false
  @property({ type: String, reflect: true }) role = 'group'

  render() {
    return html`
      ${this.renderLabel()} ${this.renderHelper()}
      <slot></slot>
      ${this.renderValidation()}
    `
  }

  protected willUpdate(changed: Map<string, unknown>) {
    if (!changed.has('label')) return

    if (this.label) {
      this.setAttribute('aria-label', this.label)
      return
    }

    this.removeAttribute('aria-label')
  }

  private renderLabel() {
    if (!this.label) return nothing

    return html`
      <mm-textfield-label ?optional=${this.optional}>${this.label}</mm-textfield-label>
    `
  }

  private renderHelper() {
    if (!this.helper) return nothing

    return html`
      <mm-textfield-helper>${this.helper}</mm-textfield-helper>
    `
  }

  private renderValidation() {
    if (!this.validationText) return nothing

    return html`
      <mm-textfield-validation>${this.validationText}</mm-textfield-validation>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-form-field': FormField
  }
}

export default FormField
