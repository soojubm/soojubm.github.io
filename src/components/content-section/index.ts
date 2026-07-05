import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/text/semantics/heading'

/**
 * <mm-content-section>
 * 제목과 슬롯 콘텐츠를 한 묶음으로 배치하는 페이지 콘텐츠 섹션입니다.
 * heading은 level 2 제목으로 렌더하고, 본문은 기본 slot으로 받습니다.
 */
@customElement('mm-content-section')
export class ContentSection extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      section {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }
    `,
  ]

  @property({ type: String }) heading = ''

  render() {
    return html`
      <section>
        <mm-heading level="2">${this.heading}</mm-heading>
        <slot></slot>
      </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-content-section': ContentSection
  }
}
