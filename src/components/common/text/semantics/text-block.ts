import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/text'
import '@/components/common/text/semantics/heading'
import '@/components/common/text/semantics/paragraph'

/**
 * <mm-text-block>
 * 제목과 설명 한 쌍을 세우고 그 사이 간격을 소유합니다.
 * 제목이 그 쌍을 대표하므로 heading은 필수이고, level로 문서 안의 깊이와 두 텍스트의 크기 단계를 함께 정합니다.
 * 본문을 슬롯으로 받아 구획을 이루는 자리에는 mm-content-section을 씁니다.
 */
@customElement('mm-text-block')
export class TextBlock extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2);
    }
    :host([level='1']) {
      gap: var(--space-3);
    }
    :host([level='5']) {
      gap: var(--space-1);
    }
    :host([centered]) {
      align-items: center;
    }
    :host([centered]) mm-heading {
      text-align: center;
    }
    /* Level 1 전용 본문 최대 너비 제한 (가독성 최적화) */
    :host([level='1']) mm-paragraph {
      max-width: 720px;
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String, reflect: true }) level = '1'
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      <mm-heading level=${Number(this.level)}>${this.heading}</mm-heading>
      ${this.renderDescription()}
      <slot></slot>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    if (this.level === '1') {
      return html`
        <mm-paragraph size="large" ?centered=${this.centered}>${this.description}</mm-paragraph>
      `
    }

    if (this.level === '5') {
      return html`
        <mm-text size="14" color="light" ?centered=${this.centered}>${this.description}</mm-text>
      `
    }

    return html`
      <mm-text size="14" ?centered=${this.centered}>${this.description}</mm-text>
    `
  }
}
