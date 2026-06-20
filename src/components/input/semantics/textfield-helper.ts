import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../../text/text'

/**
 * <mm-textfield-helper>
 * textfield의 보조 설명 텍스트 컴포넌트입니다.
 */
@customElement('mm-textfield-helper')
export class TextfieldHelper extends LitElement {
  render() {
    return html`
      <mm-text as="p" size="12" weight="medium" color="light">
        <slot></slot>
      </mm-text>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-textfield-helper': TextfieldHelper
  }
}
