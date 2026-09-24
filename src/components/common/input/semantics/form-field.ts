import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/input/semantics/textfield-label'
import '@/components/common/input/semantics/textfield-description'
import '@/components/common/input/semantics/textfield-validation'

/**
 * mm-form-field
 * textfield 계열이 아닌 컨트롤(gender-selector, checkbox-group, select 등)에
 * 레이블·설명·검증 텍스트를 textfield와 같은 규칙으로 붙이는 래퍼.
 * 컨트롤 자체는 slot으로 받고, 필드는 레이블이 붙은 그룹으로서 role="group"을 가진다.
 * label은 그룹의 이름이라 필수이며, 그룹이 화면의 레이블을 aria-labelledby로 가리킨다.
 * host 속성은 자기 shadow 안의 id를 가리킬 수 없으므로 그룹은 host가 아니라 shadow 안의 요소가 맡는다.
 *
 * mm-textfield와 병합하지 않는 이유: textfield는 자기 mm-input에 for·aria-describedby·
 * aria-invalid를 id로 배선하지만, form-field의 컨트롤은 slot 너머의 불투명한 요소라 그 배선을
 * 할 수 없다. 공통 규칙은 이미 mm-textfield-label/-description/-validation 서브컴포넌트 레벨에서
 * 공유하므로, 둘은 base/파생이 아니라 형제로 둔다.
 */
@customElement('mm-form-field')
export class FormField extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }
  `
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String, attribute: 'validation-text' }) validationText = ''
  @property({ type: Boolean }) optional = false

  render() {
    return html`
      <div class="group" role="group" aria-labelledby="label">
        <mm-textfield-label id="label" ?optional=${this.optional}>${this.label}</mm-textfield-label>
        <slot></slot>
        ${this.renderDescription()} ${this.renderValidation()}
      </div>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <mm-textfield-description>${this.description}</mm-textfield-description>
    `
  }

  private renderValidation() {
    if (!this.validationText) return nothing

    return html`
      <mm-textfield-validation>${this.validationText}</mm-textfield-validation>
    `
  }
}
