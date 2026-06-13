import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import '../../icon/icon'

/**
 * 답변 과정의 개별 단계.
 * - done:   완료 (체크 아이콘, 연결선 초록)
 * - active: 진행 중 (맥동 점, 굵은 텍스트)
 * - 기본:   대기 (흐린 점, 흐린 텍스트)
 */
@customElement('mm-chat-reasoning-step')
export class ChatReasoningStep extends LitElement {
  /** 완료된 단계 */
  @property({ type: Boolean, reflect: true }) done = false
  /** 진행 중인 단계 */
  @property({ type: Boolean, reflect: true }) active = false
  /** 커스텀 아이콘 이름 (done 상태에서도 override) */
  @property({ type: String }) icon = ''
  /** 보조 설명 텍스트 */
  @property({ type: String }) description = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: 1.125rem 1fr;
        gap: var(--space-2);
        position: relative;
        padding-bottom: var(--space-3);
        font-size: var(--font-size-13, var(--font-size-14));
        line-height: var(--line-height-14);
        color: var(
          --color-foreground-disabled,
          color-mix(in srgb, var(--color-foreground) 35%, transparent)
        );
      }

      :host(:last-child) {
        padding-bottom: 0;
      }

      /* 연결선 */
      .marker::after {
        content: '';
        position: absolute;
        left: calc(0.5625rem - 1px);
        top: 1.125rem;
        bottom: 0;
        width: 2px;
        background: var(--color-border);
        transition: background 200ms ease;
      }

      :host([done]) .marker::after {
        background: color-mix(in srgb, var(--color-success) 40%, var(--color-border));
      }

      :host(:last-child) .marker::after {
        display: none;
      }

      .marker {
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 0.1rem;
        height: 1.125rem;
      }

      /* ── 대기 ── */
      .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: var(--color-border);
        margin-top: 0.175rem;
        flex-shrink: 0;
      }

      /* ── 진행 중 ── */
      :host([active]) {
        color: var(--color-foreground);
      }

      :host([active]) .dot {
        background: var(--color-primary);
        animation: ping 1.4s ease-in-out infinite;
      }

      /* ── 완료 ── */
      :host([done]) {
        color: var(--color-foreground);
      }

      .check {
        width: 1rem;
        height: 1rem;
        color: var(--color-success);
        flex-shrink: 0;
      }

      /* ── 텍스트 영역 ── */
      .content {
        display: flex;
        flex-direction: column;
        gap: var(--space-05);
        min-width: 0;
      }

      .label {
        font-weight: var(--font-weight-medium, 500);
        line-height: var(--line-height-14, 1.5);
      }

      :host([active]) .label {
        font-weight: var(--font-weight-bold);
      }

      .desc {
        font-size: var(--font-size-12);
        color: var(--color-foreground-light);
        line-height: var(--line-height-12, 1.5);
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
    const showCheck = this.done && !this.icon
    const showCustomIcon = this.icon
    const showDot = !this.done && !this.icon

    return html`
      <span class="marker">
        ${showCheck
          ? html`
              <mm-icon class="check" name=${ICON_NAMES.DONE}></mm-icon>
            `
          : showCustomIcon
          ? html`
              <mm-icon class="check" name=${this.icon}></mm-icon>
            `
          : html`
              <span class="dot"></span>
            `}
      </span>
      <span class="content">
        <span class="label"><slot></slot></span>
        ${this.description
          ? html`
              <span class="desc">${this.description}</span>
            `
          : nothing}
      </span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-reasoning-step': ChatReasoningStep
  }
}
