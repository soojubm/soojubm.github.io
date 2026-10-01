import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * <mm-page-body>
 * mm-page-header 아래에서 페이지 본문을 세로로 쌓고 구획 사이 간격만 책임지는 컨테이너입니다.
 * 간격은 섹션 간격 토큰 하나로 정해지며 소비처가 고르지 않습니다.
 */
@customElement('mm-page-body')
export class PageBody extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
