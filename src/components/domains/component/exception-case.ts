import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

/**
 * 가이드 문서에서 규칙을 벗어나는 사례를 규칙 목록과 떼어 보여 주는 warning notice.
 * heading에 예외의 내용을, 기본 slot에 그 사례와 이유를 둔다.
 */
@customElement('mm-exception-case')
export class ExceptionCase extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) heading = ''

  render() {
    return html`
      <mm-notice variant="warning" heading=${this.heading}>
        <mm-text size="14"><slot></slot></mm-text>
      </mm-notice>
    `
  }
}
