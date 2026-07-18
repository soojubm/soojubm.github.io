import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('mm-textfield-label')
export class TextfieldLabel extends LitElement {
  static styles = css`
    label {
      display: block;
      line-height: var(--size-24);
    }
    small {
      margin: 0 0 0 var(--space-1);
      color: var(--color-foreground-light);
    }
  `

  @property({ type: String, attribute: 'for' }) htmlFor = ''
  @property({ type: Boolean }) optional = false

  render() {
    return html`
      <label for=${ifDefined(this.htmlFor || undefined)}>
        <slot></slot>
        ${this.renderOptionalText()}
      </label>
    `
  }

  private renderOptionalText() {
    if (!this.optional) return nothing

    return html`
      <mm-caption>선택입력</mm-caption>
    `
  }
}

export default TextfieldLabel
