import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/input/semantics/textfield-label'
import '@/components/common/input/semantics/textfield-description'
import '@/components/common/input/semantics/textfield-validation'

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
