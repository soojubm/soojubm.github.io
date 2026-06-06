import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'

/**
 * AI 답변 과정(추론 단계)을 접을 수 있는 형태로 보여주는 컨테이너.
 * 기본 슬롯에 <mm-chat-reasoning-step> 들을 넣습니다.
 *
 * <mm-chat-reasoning thinking>
 *   <mm-chat-reasoning-step done>질문 의도 파악</mm-chat-reasoning-step>
 *   <mm-chat-reasoning-step active>관련 문서 검색</mm-chat-reasoning-step>
 *   <mm-chat-reasoning-step>답변 정리</mm-chat-reasoning-step>
 * </mm-chat-reasoning>
 */
@customElement('mm-chat-reasoning')
export class ChatReasoning extends LitElement {
  /** 헤더 라벨 */
  @property({ type: String }) label = '답변 과정'
  /** 추론이 진행 중인 상태 (스피너 표시) */
  @property({ type: Boolean, reflect: true }) thinking = false
  /** 펼침 상태 */
  @property({ type: Boolean, reflect: true }) open = false
  /** 소요 시간 등 부가 정보 (예: "3초") */
  @property({ type: String }) duration = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        --reasoning-transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .reasoning {
        width: fit-content;
        max-width: min(85%, 600px);
        border: var(--border);
        border-radius: var(--radius);
        background: var(--color-background-subtle);
        overflow: hidden;
      }

      .summary-btn {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        width: 100%;
        padding: var(--space-2) var(--space-3);
        background: none;
        border: none;
        cursor: pointer;
        font: inherit;
        color: var(--color-foreground-light);
        text-align: left;
      }

      .label {
        font-size: var(--font-size-13, var(--font-size-14));
        font-weight: var(--font-weight-bold);
      }

      .duration {
        font-size: var(--font-size-12);
        color: var(--color-foreground-light);
      }

      .lead {
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .spinner {
        width: 0.875rem;
        height: 0.875rem;
        border-radius: 50%;
        border: 2px solid var(--color-border);
        border-top-color: var(--color-primary);
        animation: spin 0.8s linear infinite;
      }

      :host([thinking]) .label {
        color: var(--color-foreground);
        animation: pulse 1.6s ease-in-out infinite;
      }

      .chevron {
        margin-left: auto;
        flex-shrink: 0;
        width: 1.1rem;
        height: 1.1rem;
        transition: transform var(--reasoning-transition);
      }

      :host([open]) .chevron {
        transform: rotate(90deg);
      }

      /* grid trick: 0fr → 1fr 로 높이 애니메이션 */
      .panel {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--reasoning-transition);
      }

      :host([open]) .panel {
        grid-template-rows: 1fr;
      }

      .panel-inner {
        min-height: 0;
        overflow: hidden;
      }

      .steps {
        padding: 0 var(--space-3) var(--space-3) var(--space-3);
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    `,
  ]

  private _toggle() {
    this.open = !this.open
  }

  render() {
    return html`
      <div class="reasoning">
        <button
          class="summary-btn"
          aria-expanded=${this.open ? 'true' : 'false'}
          @click=${this._toggle}
        >
          <span class="lead">
            ${this.thinking
              ? html`<span class="spinner" role="status" aria-label="생각하는 중"></span>`
              : html`<mm-icon name=${ICON_NAMES.SPARKS}></mm-icon>`}
          </span>
          <span class="label">${this.label}</span>
          ${this.duration && !this.thinking
            ? html`<span class="duration">${this.duration}</span>`
            : nothing}
          <mm-icon class="chevron" name=${ICON_NAMES.SITEMAP}></mm-icon>
        </button>
        <div class="panel">
          <div class="panel-inner">
            <div class="steps">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-reasoning': ChatReasoning
  }
}
