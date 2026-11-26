import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { tagStyles, type TagSize, type TagTone } from '@/components/common/tag/tag.styles'

@customElement('mm-code-tag')
export class CodeTag extends LitElement {
  static styles = [
    tagStyles,
    css`
      :host {
        font-family: var(--font-family-code);
      }
    `,
  ]
  @property({ type: String, reflect: true, useDefault: true }) tone: TagTone = 'default'
  /** large는 이름 하나를 크게 보여 주는 자리에 쓴다. */
  @property({ type: String, reflect: true, useDefault: true }) size: TagSize = 'medium'

  render() {
    return html`
      <slot></slot>
    `
  }
}
