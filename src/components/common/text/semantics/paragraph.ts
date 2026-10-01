import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/text'
import {
  paragraphSizeToTextSize,
  type ParagraphSize,
  type TextColor,
  type TextMaxLines,
} from '@/components/common/text/text.styles'
import { buildAttributeRules, type AttributeTokens } from '@/utils'

const paragraphMaxWidthTokens: AttributeTokens<ParagraphSize> = {
  small: { 'max-width': '560px' },
  medium: { 'max-width': '560px' },
  large: { 'max-width': '800px' },
}

/**
 * 본문 문단. 글자 크기·색·줄 수는 mm-text를 p로 렌더해 단계를 고르고,
 * 이 컴포넌트는 본문 크기 이름(small·medium·large)과 읽기 폭만 소유한다.
 */
@customElement('mm-paragraph')
export class Paragraph extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-weight: var(--font-weight-normal);
    }

    ${unsafeCSS(buildAttributeRules('size', paragraphMaxWidthTokens))}
  `
  @property({ type: String, reflect: true }) size: ParagraphSize = 'medium'
  @property({ type: String }) color: TextColor = 'inherit'
  @property({ type: String, attribute: 'max-lines' }) maxLines: TextMaxLines = ''
  @property({ type: Boolean }) centered = false

  render() {
    return html`
      <mm-text
        as="p"
        size=${paragraphSizeToTextSize[this.size]}
        color=${this.color}
        max-lines=${this.maxLines}
        ?centered=${this.centered}
      >
        <slot></slot>
      </mm-text>
    `
  }
}
