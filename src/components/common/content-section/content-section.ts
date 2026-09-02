import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/text/semantics/heading'

/**
 * <mm-content-section>
 * 제목과 슬롯 콘텐츠를 한 묶음으로 배치하는 페이지 콘텐츠 섹션입니다.
 * heading이 있으면 heading-level(기본 2) 제목으로 렌더하고, 없으면 본문만 묶습니다.
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
  @property({ type: Number, attribute: 'heading-level' }) headingLevel = 2

  render() {
    return html`
      <section>
        ${this.renderHeading()}
        <slot></slot>
      </section>
    `
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <mm-heading level=${this.headingLevel}>${this.heading}</mm-heading>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-content-section': ContentSection
  }
}
