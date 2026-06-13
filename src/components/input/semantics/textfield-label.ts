import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-textfield-label')
export class TextfieldLabel extends LitElement {
  @property({ type: String, attribute: 'for' }) htmlFor?: string
  @property({ type: Boolean }) optional = false

  static styles = css`
    label {
      display: block;
      line-height: var(--size-small);
    }
    small {
      margin: 0 0 0 var(--space-1);
      color: var(--color-foreground-light);
    }
  `

  render() {
    return html`
      <label for=${this.htmlFor ?? nothing}>
        <slot></slot>
        ${this.optional
          ? html`
              <small>선택입력</small>
            `
          : nothing}
      </label>
    `
  }
}

export default TextfieldLabel
