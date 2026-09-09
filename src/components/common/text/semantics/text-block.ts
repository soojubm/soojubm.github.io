import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/tag/tag'
import '@/components/common/text/text'
import '@/components/common/text/semantics/heading'
import '@/components/common/text/semantics/paragraph'

// TODO section 임 text-block은 단독으로 쓰이지 않는다 보통.

/**
 * mm-text-block
 * 제목과 설명을 결합한 패턴 컴포넌트입니다.
 * Level 1의 경우, 더 높은 시멘틱 강도와 시각적 가중치를 위해 mm-paragraph를 사용합니다.
 */
@customElement('mm-text-block')
export class TextBlock extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-2);
      }
      :host([level='1']) {
        gap: var(--space-3);
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
    `,
  ]

  @property({ type: String }) eyebrow = ''
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String }) caption = ''
  @property({ type: String, reflect: true }) level = '1'
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      ${this.renderEyebrow()} ${this.renderHeading()} ${this.renderDescription()}
      <slot></slot>
    `
  }

  private renderEyebrow() {
    if (!this.eyebrow) return nothing

    return html`
      <mm-tag tone="purple">${this.eyebrow}</mm-tag>
    `
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <mm-heading level=${Number(this.level)}>${this.heading}</mm-heading>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    if (this.level === '1') {
      return html`
        <mm-paragraph size="large" ?centered=${this.centered}>${this.description}</mm-paragraph>
      `
    }

    return html`
      <mm-text size="14" ?centered=${this.centered}>${this.description}</mm-text>
    `
  }
}
