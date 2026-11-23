import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { tagStyles, type TagTone } from '@/components/common/tag/tag.styles'
import { buildAttributeRules, type AttributeTokens } from '@/utils'

export type CodeTagSize = 'medium' | 'large'

const codeTagSizeTokens: AttributeTokens<Exclude<CodeTagSize, 'medium'>> = {
  large: {
    '--tag-height': 'var(--size-32)',
    '--tag-padding-inline': 'var(--space-3)',
    '--tag-text-size': 'var(--font-size-14)',
  },
}

/** 토큰·속성 이름처럼 코드로 읽어야 하는 조각을 태그로 보여 준다. 톤과 크기는 mm-tag와 같고 글꼴만 코드 글꼴이다. */
@customElement('mm-code-tag')
export class CodeTag extends LitElement {
  static styles = [
    tagStyles,
    css`
      :host {
        font-family: var(--font-family-code);
      }

      ${unsafeCSS(buildAttributeRules('size', codeTagSizeTokens))}
    `,
  ]
  @property({ type: String, reflect: true, useDefault: true }) tone: TagTone = 'default'
  /** large는 이름 하나를 크게 보여 주는 자리에 쓴다. */
  @property({ type: String, reflect: true, useDefault: true }) size: CodeTagSize = 'medium'

  render() {
    return html`
      <slot></slot>
    `
  }
}
