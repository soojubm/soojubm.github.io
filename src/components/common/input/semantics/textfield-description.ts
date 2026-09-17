import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/components/common/text/semantics/paragraph'

/**
 * <mm-textfield-description>
 * textfield의 보조 설명 텍스트 컴포넌트입니다.
 */
@customElement('mm-textfield-description')
export class TextfieldDescription extends LitElement {
  render() {
    return html`
      <mm-paragraph color="light">
        <slot></slot>
      </mm-paragraph>
    `
  }
}
