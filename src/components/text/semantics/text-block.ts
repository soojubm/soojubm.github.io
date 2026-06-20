import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

/**
 * mm-text-block
 * 제목과 설명을 결합한 패턴 컴포넌트입니다.
 * Level 1의 경우, 더 높은 시멘틱 강도와 시각적 가중치를 위해 mm-paragraph를 사용합니다.
 */
@customElement('mm-text-block')
class TextBlock extends LitElement {
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String }) caption = ''
  @property({ type: String, reflect: true }) level = '1'
  @property({ type: Boolean, reflect: true }) center = false

  static variants = {
    '1': {
      headingSize: '32',
      descriptionSize: '18',
      gap: 'var(--space-3)',
    },
    '2': {
      headingSize: '24',
      descriptionSize: '14',
      gap: 'var(--space-2)',
    },
    '3': {
      headingSize: '18',
      descriptionSize: '14',
      gap: 'var(--space-2)',
    },
  }

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
      .container {
        display: flex;
        flex-direction: column;
      }
      /* Level 1 전용 본문 최대 너비 제한 (가독성 최적화) */
      :host([level='1']) .container mm-paragraph {
        max-width: 720px;
      }
    `,
  ]

  render() {
    const variant =
      TextBlock.variants[this.level as keyof typeof TextBlock.variants] ?? TextBlock.variants['1']

    // Level 1은 특별한 시멘틱 패턴을 가집니다.
    const isLevel1 = this.level === '1'

    return html`
      <div
        class="container"
        style="gap:${variant.gap}; align-items: ${this.center ? 'center' : 'flex-start'};"
      >
        ${isLevel1
          ? html`
              <mm-text size="32" weight="bold" ?center="${this.center}">${this.heading}</mm-text>
              <mm-paragraph size="large" ?center="${this.center}">${this.description}</mm-paragraph>
            `
          : html`
              <mm-text size="${variant.headingSize}" weight="bold" ?center="${this.center}">
                ${this.heading}
              </mm-text>
              <mm-text size="${variant.descriptionSize}" ?center="${this.center}">
                ${this.description}
              </mm-text>
            `}
        ${this.caption
          ? html`
              <mm-text size="12" color="light" ?center="${this.center}">${this.caption}</mm-text>
            `
          : nothing}
      </div>
    `
  }
}

export default TextBlock
