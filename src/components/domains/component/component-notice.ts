import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

/**
 * 가이드 문서에서 규칙 목록과 떼어 보여 주는 notice.
 * 아직 정하지 않았거나 만들지 않은 것, 규칙을 벗어나는 사례를 알린다.
 * heading에 그 내용을, 기본 slot에 사례와 이유를 둔다.
 */
@customElement('mm-component-notice')
export class ComponentNotice extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) heading = ''

  render() {
    return html`
      <mm-notice variant="info" heading=${this.heading}>
        <mm-text size="14"><slot></slot></mm-text>
      </mm-notice>
    `
  }
}
