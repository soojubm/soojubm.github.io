import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

/**
 * 답변 과정의 개별 단계.
 * - done: 완료(체크)
 * - active: 진행 중(맥동 점)
 * - 기본: 대기
 */
@customElement('mm-chat-reasoning-step')
export class ChatReasoningStep extends LitElement {
  /** 완료된 단계 */
  @property({ type: Boolean, reflect: true }) done = false
  /** 진행 중인 단계 */
  @property({ type: Boolean, reflect: true }) active = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: 1rem 1fr;
        gap: var(--space-2);
        position: relative;
        padding-bottom: var(--space-3);
        font-size: var(--font-size-13, var(--font-size-14));
        line-height: var(--line-height-14);
        color: var(--color-foreground-light);
      }

      :host(:last-child) {
        padding-bottom: 0;
      }

      /* 단계 사이 연결선 */
      .marker::before {
        content: '';
        position: absolute;
        left: calc(0.5rem - 1px);
        top: 1.1rem;
        bottom: 0;
        width: 2px;
        background: var(--color-border);
      }

      :host(:last-child) .marker::before {
        display: none;
      }

      .marker {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.1rem;
      }

      .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: var(--color-border);
      }

      :host([active]) {
        color: var(--color-foreground);
        font-weight: var(--font-weight-bold);
      }

      :host([active]) .dot {
        background: var(--color-primary);
        box-shadow: 0 0 0 0 var(--color-primary);
        animation: ping 1.4s ease-in-out infinite;
      }

      :host([done]) {
        color: var(--color-foreground);
      }

      :host([done]) .check {
        width: 1rem;
        height: 1rem;
        color: var(--color-success, var(--color-primary));
      }

      .content {
        align-self: center;
      }

      @keyframes ping {
        0% {
          box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-primary) 50%, transparent);
        }
        70%,
        100% {
          box-shadow: 0 0 0 6px transparent;
        }
      }
    `,
  ]

  render() {
    return html`
      <span class="marker">
        ${this.done
          ? html`<mm-icon class="check" name="check-circle-solid"></mm-icon>`
          : html`<span class="dot"></span>`}
      </span>
      <span class="content"><slot></slot></span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-reasoning-step': ChatReasoningStep
  }
}
