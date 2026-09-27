import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resolveSpaceToken } from '@/utils'

/**
 * <mm-content-section-list>
 * 페이지의 구획을 세로로 쌓고 구획 사이 간격만 책임지는 그룹 컨테이너입니다.
 * 자식은 mm-content-section이 기본이지만 제목 없는 구획(배너·격자 등)도 같은 간격으로 함께 쌓습니다.
 * gap은 mm-flex와 같은 space 단계를 받으며, 페이지 최상위 구획 사이에는 section을 씁니다.
 */
@customElement('mm-content-section-list')
export class ContentSectionList extends LitElement {
  static styles = css`
    :host {
      --content-section-list-gap: var(--space-8);

      display: flex;
      flex-direction: column;
      gap: var(--content-section-list-gap);
    }
  `
  @property({ type: String }) gap = '8'

  render() {
    return html`
      <slot></slot>
    `
  }

  protected willUpdate() {
    this.style.setProperty('--content-section-list-gap', resolveSpaceToken(this.gap))
  }
}
