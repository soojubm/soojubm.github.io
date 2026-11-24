import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import { surfaceBaseStyles, surfaceFilledStyles } from '@/components/common/surface/surface.styles'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { uniqueId } from '@/utils'
import '@/components/indicators/expand-indicator/expand-indicator'

@customElement('mm-faq-item')
export class FaqItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        ${surfaceBaseStyles};
        ${surfaceFilledStyles};
        --surface-padding: var(--space-2) var(--space-4);
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
        transition: grid-template-rows var(--transition-duration-close) var(--transition-easing);
      }

      .answer > div {
        min-height: 0;
        transition: padding var(--transition-duration-close) var(--transition-easing);
      }

      /* 열릴 때만 open duration과 easing으로 펼친다 */
      :host([open]) {
        & .answer {
          grid-template-rows: 1fr;
          transition-duration: var(--transition-duration-open);
          transition-timing-function: var(--transition-easing-open);
        }
        & .answer > div {
          padding-top: var(--space-2);
          padding-bottom: var(--space-2);
          transition-duration: var(--transition-duration-open);
          transition-timing-function: var(--transition-easing-open);
        }
      }
    `,
  ]
  @property({ type: String }) question = ''
  @property({ type: Boolean, reflect: true }) open = false
  @query('button.question') private trigger?: HTMLElement
  private readonly answerId = uniqueId('faq-answer')
  private disclosure = new DisclosureController(this, {
    open: () => this.open,
    setOpen: open => {
      this.open = open
    },
    getTrigger: () => this.trigger ?? undefined,
  })

  render() {
    return html`
      <h2>
        <button class="question" aria-controls=${this.answerId}>
          <slot name="question">${this.question}</slot>
          <mm-expand-indicator ?expanded=${this.open}></mm-expand-indicator>
        </button>
      </h2>

      <div id=${this.answerId} class="answer" ?inert=${!this.open}>
        <div><slot></slot></div>
      </div>
    `
  }
}
