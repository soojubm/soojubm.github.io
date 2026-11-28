import { LitElement, css, html, nothing, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/text'
import '@/components/common/text/semantics/heading'
import '@/components/common/text/semantics/paragraph'
import { buildAttributeRules } from '@/utils'

export type TextBlockLevel = '1' | '2' | '3' | '4'

const textBlockLevelTokens = {
  1: { '--text-block-header-gap': 'var(--space-3)' },
  4: { '--text-block-header-gap': 'var(--space-1)' },
}

@customElement('fff-text-block')
export class TextBlock extends LitElement {
  static styles = css`
    :host {
      --text-block-header-gap: var(--space-2);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-4);
    }
    header {
      display: flex;
      flex-direction: column;
      align-items: inherit;
      gap: var(--text-block-header-gap);
    }
    ${unsafeCSS(buildAttributeRules('level', textBlockLevelTokens))}
    :host([centered]) {
      align-items: center;
    }
    :host([centered]) fff-heading {
      text-align: center;
    }
    /* Level 1 전용 본문 최대 너비 제한 (가독성 최적화) */
    :host([level='1']) fff-paragraph {
      max-width: 720px;
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String, reflect: true }) level: TextBlockLevel = '1'
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      <header>
        <fff-heading level=${Number(this.level)}>${this.renderHeadingLines()}</fff-heading>
        ${this.renderDescription()}
      </header>
      <slot></slot>
    `
  }

  // 제목 안의 줄바꿈 문자(\n)는 행갈이로 그린다. 태그라인처럼 끊을 자리를 작성 단계에서 정하는 제목에 쓴다.
  private renderHeadingLines() {
    const lines = this.heading.split('\n')
    return lines.map((line, index) =>
      index === 0
        ? line
        : html`
            <br />
            ${line}
          `,
    )
  }

  private renderDescription() {
    if (!this.description) return nothing

    if (this.level === '1') {
      return html`
        <fff-paragraph size="large" ?centered=${this.centered}>${this.description}</fff-paragraph>
      `
    }

    return html`
      <fff-text size="14" ?centered=${this.centered}>${this.description}</fff-text>
    `
  }
}
