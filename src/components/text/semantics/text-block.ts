import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/tag/tag'

// TODO section 임 text-block은 단독으로 쓰이지 않는다 보통.
// heading-level → 시맨틱 heading 태그. 값이 없거나 미정의 레벨이면 비-heading(span).
const HEADING_TAGS = {
  '1': 'h1',
  '2': 'h2',
  '3': 'h3',
  '4': 'h4',
  '5': 'h5',
  '6': 'h6',
} as const

/**
 * mm-text-block
 * 제목과 설명을 결합한 패턴 컴포넌트입니다.
 * Level 1의 경우, 더 높은 시멘틱 강도와 시각적 가중치를 위해 mm-paragraph를 사용합니다.
 */
@customElement('mm-text-block')
class TextBlock extends LitElement {
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
  @property({ type: String, attribute: 'heading-level' }) headingLevel = ''
  @property({ type: Boolean, reflect: true }) centered = false

  static variants = {
    '1': {
      headingSize: '32',
      descriptionSize: '18',
      gap: '3',
    },
    '2': {
      headingSize: '24',
      descriptionSize: '14',
      gap: '2',
    },
    '3': {
      headingSize: '18',
      descriptionSize: '14',
      gap: '1',
    },
    '4': {
      headingSize: '14',
      descriptionSize: '14',
      gap: '1',
    },
  } as const

  render() {
    const variant =
      TextBlock.variants[this.level as keyof typeof TextBlock.variants] ?? TextBlock.variants['1']

    return html`
      ${this.renderEyebrow()} ${this.renderHeading(variant)} ${this.renderDescription(variant)}
      <slot></slot>
    `
  }

  private renderEyebrow() {
    if (!this.eyebrow) return nothing

    return html`
      <mm-tag tone="purple">${this.eyebrow}</mm-tag>
    `
  }

  private renderHeading(variant: typeof TextBlock.variants[keyof typeof TextBlock.variants]) {
    return html`
      <mm-text
        as=${this.headingTag}
        size=${variant.headingSize}
        weight="bold"
        ?centered=${this.centered}
      >
        ${this.heading}
      </mm-text>
    `
  }

  private renderDescription(variant: typeof TextBlock.variants[keyof typeof TextBlock.variants]) {
    if (!this.description) return nothing

    if (this.level === '1') {
      return html`
        <mm-paragraph size="large" ?centered=${this.centered}>${this.description}</mm-paragraph>
      `
    }

    return html`
      <mm-text size=${variant.descriptionSize} ?centered=${this.centered}>
        ${this.description}
      </mm-text>
    `
  }

  private get headingTag() {
    return HEADING_TAGS[this.headingLevel as keyof typeof HEADING_TAGS] ?? 'span'
  }
}

export default TextBlock
