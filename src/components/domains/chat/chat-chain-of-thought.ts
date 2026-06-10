import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import '../../icon/icon'

export type ChainOfThoughtStepStatus = 'complete' | 'active' | 'pending'

/**
 * 사고 과정의 개별 단계.
 * status="complete" → 체크 아이콘
 * status="active"   → 스피너 (진행 중)
 * status="pending"  → 빈 원 (대기)
 */
@customElement('mm-chat-chain-of-thought-step')
export class ChatChainOfThoughtStep extends LitElement {
  @property({ type: String, reflect: true }) status: ChainOfThoughtStepStatus = 'pending'
  /** 커스텀 아이콘 (complete 상태 override) */
  @property({ type: String }) icon = ''
  /** 보조 설명 텍스트 */
  @property({ type: String }) description = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: 1.25rem 1fr;
        gap: var(--space-2);
        position: relative;
        padding-bottom: var(--space-3);
        color: var(
          --color-foreground-disabled,
          color-mix(in srgb, var(--color-foreground) 35%, transparent)
        );
      }

      :host(:last-child) {
        padding-bottom: 0;

        & .marker::after { display: none; }
      }

      :host([status='complete']) .marker::after {
        background: color-mix(in srgb, var(--color-success) 40%, var(--color-border));
      }

      /* 마커 영역 */
      .marker {
        /* 연결선 */
        &::after {
          content: '';
          position: absolute;
          left: calc(0.625rem - 1px);
          top: 1.25rem;
          bottom: 0;
          width: 2px;
          background: var(--color-border);
          transition: background 200ms ease;
        }
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 0.1rem;
      }

      /* pending: 빈 원 */
      .circle {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        border: 1.5px solid var(--color-border);
        flex-shrink: 0;
        margin-top: 0.1rem;
      }

      /* active: 스피너 */
      .spinner {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        border: 1.5px solid var(--color-border);
        border-top-color: var(--color-primary);
        animation: spin 0.8s linear infinite;
        flex-shrink: 0;
        margin-top: 0.1rem;
      }

      /* complete: 체크 */
      .check {
        width: 1rem;
        height: 1rem;
        color: var(--color-success);
        flex-shrink: 0;
      }

      /* 텍스트 상태별 */
      :host([status='active']) {
        color: var(--color-foreground);

        & .label { font-weight: var(--font-weight-bold); }
      }

      :host([status='complete']) {
        color: var(--color-foreground);
      }

      /* 콘텐츠 */
      .content {
        display: flex;
        flex-direction: column;
        gap: var(--space-05);
        min-width: 0;
      }

      .label {
        font-size: var(--font-size-13, var(--font-size-14));
        line-height: var(--line-height-14, 1.5);
      }

      .desc {
        font-size: var(--font-size-12);
        color: var(--color-foreground-light);
        line-height: var(--line-height-12, 1.5);
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ]

  render() {
    return html`
      <span class="marker">
        ${this.status === 'complete'
          ? this.icon
            ? html`<mm-icon class="check" name=${this.icon}></mm-icon>`
            : html`<mm-icon class="check" name=${ICON_NAMES.DONE}></mm-icon>`
          : this.status === 'active'
          ? html`<span class="spinner" role="status" aria-label="진행 중"></span>`
          : html`<span class="circle"></span>`}
      </span>
      <span class="content">
        <span class="label"><slot></slot></span>
        ${this.description ? html`<span class="desc">${this.description}</span>` : nothing}
      </span>
    `
  }
}

/**
 * AI 사고 과정(Chain of Thought) 컨테이너.
 * thinking 중일 때 헤더에 현재 active step 텍스트가 표시됩니다.
 *
 * <mm-chat-chain-of-thought thinking>
 *   <mm-chat-chain-of-thought-step status="complete">질문 의도 파악</mm-chat-chain-of-thought-step>
 *   <mm-chat-chain-of-thought-step status="active" description="파일 분석 중">관련 문서 검색</mm-chat-chain-of-thought-step>
 *   <mm-chat-chain-of-thought-step status="pending">답변 정리</mm-chat-chain-of-thought-step>
 * </mm-chat-chain-of-thought>
 */
@customElement('mm-chat-chain-of-thought')
export class ChatChainOfThought extends LitElement {
  @property({ type: String }) label = '사고 과정'
  /** 진행 중 상태 (스피너 + active step 텍스트 표시) */
  @property({ type: Boolean, reflect: true }) thinking = false
  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String }) duration = ''

  @state() private _activeLabel = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        --cot-transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .cot {
        width: fit-content;
        max-width: min(85%, 600px);
        border: var(--border);
        border-radius: var(--radius);
        background: var(--color-background-subtle);
        overflow: hidden;
      }

      /* ── 헤더 ── */
      .header-btn {
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

      :host([thinking]) {
        & .label {
          color: var(--color-foreground);
          animation: pulse 1.6s ease-in-out infinite;
        }
      }

      .active-hint {
        font-size: var(--font-size-12);
        color: var(--color-foreground-light);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        animation: fadeIn 200ms ease;
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
        transition: transform var(--cot-transition);
        color: var(--color-foreground-light);
      }

      :host([open]) {
        & .chevron { transform: rotate(90deg); }
        & .panel { grid-template-rows: 1fr; }
      }

      /* ── 패널 ── */
      .panel {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--cot-transition);
      }

      .panel-inner {
        min-height: 0;
        overflow: hidden;
      }

      .steps {
        padding: var(--space-2) var(--space-3) var(--space-3);
        border-top: var(--border);
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

  private _syncActiveLabel = () => {
    const slot = this.shadowRoot?.querySelector('slot')
    const steps = (slot?.assignedElements({ flatten: true }) ?? []) as ChatChainOfThoughtStep[]
    const active = steps.find(el => el.status === 'active')
    this._activeLabel = active?.textContent?.trim() ?? ''
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('thinking')) this._syncActiveLabel()
  }

  private _toggle() {
    this.open = !this.open
  }

  render() {
    return html`
      <div class="cot">
        <button
          class="header-btn"
          aria-expanded=${this.open ? 'true' : 'false'}
          @click=${this._toggle}
        >
          <span class="lead">
            ${this.thinking
              ? html`<span class="spinner" role="status" aria-label="생각하는 중"></span>`
              : html`<mm-icon name=${ICON_NAMES.SPARKS}></mm-icon>`}
          </span>

          <span class="header-text">
            <span class="label">${this.label}</span>
            ${this.thinking && this._activeLabel
              ? html`<span class="active-hint">${this._activeLabel}</span>`
              : nothing}
            ${!this.thinking && this.duration
              ? html`<span class="duration">${this.duration}</span>`
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
    'mm-chat-chain-of-thought': ChatChainOfThought
    'mm-chat-chain-of-thought-step': ChatChainOfThoughtStep
  }
}
