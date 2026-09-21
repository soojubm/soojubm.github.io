import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit, uniqueId } from '@/utils'
import '@/components/indicators/expand-indicator/expand-indicator'

/**
 * 질문 하나와 접힌 답변. question이 트리거, 기본 슬롯이 펼쳐지는 답변입니다.
 * 트리거는 h4로 감싸 스크린리더가 제목 단위로 질문을 건너뛰게 한다(APG accordion).
 */
@customElement('mm-faq-item')
export class FaqItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        --faq-item-padding: var(--space-2) var(--space-4);
        --faq-item-border: var(--border-transparent);
        --faq-item-border-radius: var(--radius);
        --faq-item-background-color: var(--background-subtle-color);

        ${surfaceBaseStyles};
        --surface-padding: var(--faq-item-padding);
        --surface-border: var(--faq-item-border);
        --surface-border-radius: var(--faq-item-border-radius);
        --surface-background-color: var(--faq-item-background-color);
      }

      .question {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-2);
        width: 100%;
      }

      /* auto 높이를 애니메이션하려고 0fr → 1fr 트랙을 쓴다 */
      .answer {
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: grid-template-rows var(--transition-duration) var(--transition-easing);
      }

      .answer > div {
        min-height: 0;
        transition: padding var(--transition-duration) var(--transition-easing);
      }

      :host([open]) {
        & .answer {
          grid-template-rows: 1fr;
        }
        & .answer > div {
          padding-top: var(--space-2);
          padding-bottom: var(--space-2);
        }
      }
    `,
  ]
  @property({ type: String }) question = ''
  @property({ type: Boolean, reflect: true }) open = false
  @query('button.question') private trigger?: HTMLElement
  private readonly answerId = uniqueId('faq-answer')
  private disclosure = new DisclosureController(this, {
    isOpen: () => this.open,
    setOpen: open => {
      this.open = open
      emit(this, 'toggle', { open })
    },
    getTrigger: () => this.trigger ?? undefined,
  })

  render() {
    return html`
      <h4>
        <button class="question" aria-controls=${this.answerId}>
          ${this.question}
          <mm-expand-indicator ?expanded=${this.open}></mm-expand-indicator>
        </button>
      </h4>

      <div id=${this.answerId} class="answer" ?inert=${!this.open}>
        <div><slot></slot></div>
      </div>
    `
  }
}
