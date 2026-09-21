import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/semantics/heading'

/**
 * <mm-content-section>
 * 제목과 본문을 한 묶음으로 세우는 콘텐츠 섹션입니다.
 * 제목이 그 묶음을 대표하므로 heading은 필수이고, heading-level(기본 2)로 문서 안의 깊이를 정합니다.
 */
@customElement('mm-content-section')
export class ContentSection extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    section {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: Number, attribute: 'heading-level' }) headingLevel = 2

  render() {
    return html`
      <section>
        <mm-heading level=${this.headingLevel}>${this.heading}</mm-heading>
        <slot></slot>
      </section>
    `
  }
}
