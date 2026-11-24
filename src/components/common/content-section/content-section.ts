import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/semantics/heading'
import '@/components/common/text/semantics/paragraph'

/**
 * <mm-content-section>
 * 제목과 본문을 한 묶음으로 세우는 콘텐츠 섹션입니다.
 * 제목이 그 묶음을 대표하므로 heading은 필수입니다. heading-level(기본 2)은 제목의 단계와 크기를 정하며,
 * 섹션이 문서 구조에서 놓인 자리에 맞춰 지정합니다.
 * description은 제목 바로 아래에 놓이는 한두 문장 설명입니다.
 * action 슬롯은 제목 줄 오른쪽에 놓이며, "모두 보기" 링크처럼 섹션 전체에 걸리는 동작을 받습니다.
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
      gap: var(--space-4);
    }

    /* 제목과 설명은 text-block처럼 한 쌍으로 붙이고, 본문과는 더 띄운다. */
    .title {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: Number, attribute: 'heading-level' }) headingLevel = 2
  @property({ type: String }) description = ''

  render() {
    return html`
      <section>
        <div class="title">
          <header>
            <mm-heading level=${this.headingLevel}>${this.heading}</mm-heading>
            <slot name="action"></slot>
          </header>
          ${this.renderDescription()}
        </div>
        <slot></slot>
      </section>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing
    return html`
      <mm-paragraph>${this.description}</mm-paragraph>
    `
  }
}
