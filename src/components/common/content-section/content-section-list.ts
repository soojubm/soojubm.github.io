import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * <mm-content-section-list>
 * 페이지의 구획을 세로로 쌓고 구획 사이 간격만 책임지는 그룹 컨테이너입니다.
 * 자식은 mm-content-section이 기본이지만 제목 없는 구획(배너·격자 등)도 같은 간격으로 함께 쌓습니다.
 * 간격은 섹션 간격 토큰 하나로 정해지며 소비처가 고르지 않습니다.
 */
@customElement('mm-content-section-list')
export class ContentSectionList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-section);
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
