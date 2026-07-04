import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'
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
    `,
  ]

  @property({ type: String }) heading = ''

  render() {
    return html`
      <mm-flex as="section" direction="column" gap="4">
        <mm-heading level="2">${this.heading}</mm-heading>
        <slot></slot>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-content-section': ContentSection
  }
}
