import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import type { ChatReasoningStep } from './chat-reasoning-step'
import '../../icon/icon'

/**
 * AI 답변 과정(추론 단계)을 접을 수 있는 형태로 보여주는 컨테이너.
 * thinking 상태일 때 헤더에 현재 active step의 텍스트를 표시합니다.
 *
 * <mm-chat-reasoning thinking>
 *   <mm-chat-reasoning-step done>질문 의도 파악</mm-chat-reasoning-step>
 *   <mm-chat-reasoning-step active>관련 문서 검색</mm-chat-reasoning-step>
 *   <mm-chat-reasoning-step>답변 정리</mm-chat-reasoning-step>
 * </mm-chat-reasoning>
 */
@customElement('mm-chat-reasoning')
export class ChatReasoning extends LitElement {
  @property({ type: String }) label = '답변 과정'
  /** 추론이 진행 중인 상태 (스피너 + active step 텍스트 표시) */
  @property({ type: Boolean, reflect: true }) thinking = false
  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String }) duration = ''

  @state() private _activeLabel = ''

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

      /* ── 헤더 ── */
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

      .lead {
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: inherit;
      }

      .spinner {
        width: 0.875rem;
        height: 0.875rem;
        border-radius: 50%;
        border: 1.5px solid var(--color-border);
        border-top-color: var(--color-primary);
        animation: spin 0.8s linear infinite;
        flex-shrink: 0;
      }

      .header-text {
        display: flex;
        align-items: baseline;
        gap: var(--space-2);
        min-width: 0;
        flex: 1;
      }

      .label {
        font-size: var(--font-size-13, var(--font-size-14));
        font-weight: var(--font-weight-bold);
        white-space: nowrap;
        flex-shrink: 0;
      }

      /* thinking 중: active step 텍스트 */
      .active-hint {
        font-size: var(--font-size-12);
        color: var(--color-foreground-light);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        animation: fadeIn 200ms ease;
      }

      :host([thinking]) {
        & .label {
          color: var(--color-foreground);
          animation: pulse 1.6s ease-in-out infinite;
        }
      }

      .duration {
        font-size: var(--font-size-12);
        color: var(--color-foreground-light);
        white-space: nowrap;
      }

      .chevron {
        margin-left: auto;
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
        transition: transform var(--reasoning-transition);
        color: var(--color-foreground-light);
      }

      :host([open]) {
        & .chevron {
          transform: rotate(90deg);
        }
        & .panel {
          grid-template-rows: 1fr;
        }
      }

      /* ── 콘텐츠 패널 ── */
      .panel {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--reasoning-transition);
      }

      .panel-inner {
        min-height: 0;
        overflow: hidden;
      }

      .steps {
        padding: 0 var(--space-3) var(--space-3) var(--space-3);
        border-top: var(--border);
      }

      /* ── 애니메이션 ── */
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

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateX(-4px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
  ]

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('slotchange', this._syncActiveLabel)
  }

  disconnectedCallback() {
    this.removeEventListener('slotchange', this._syncActiveLabel)
    super.disconnectedCallback()
  }

  private _syncActiveLabel = () => {
    const slot = this.shadowRoot?.querySelector('slot')
    const steps = (slot?.assignedElements({ flatten: true }) ?? []) as ChatReasoningStep[]
    const active = steps.find(el => el.hasAttribute('active'))
    this._activeLabel = active?.textContent?.trim() ?? ''
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('thinking')) {
      this._syncActiveLabel()
    }
  }

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
              ? html`
                  <span class="spinner" role="status" aria-label="생각하는 중"></span>
                `
              : html`
                  <mm-icon name=${ICON_NAMES.SPARKS}></mm-icon>
                `}
          </span>

          <span class="header-text">
            <span class="label">${this.label}</span>
            ${this.thinking && this._activeLabel
              ? html`
                  <span class="active-hint">${this._activeLabel}</span>
                `
              : nothing}
            ${!this.thinking && this.duration
              ? html`
                  <span class="duration">${this.duration}</span>
                `
              : nothing}
          </span>

          <mm-icon class="chevron" name=${ICON_NAMES.SITEMAP}></mm-icon>
        </button>

        <div class="panel">
          <div class="panel-inner">
            <div class="steps">
              <slot @slotchange=${this._syncActiveLabel}></slot>
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
