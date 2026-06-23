import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'

/**
 * 개별 아코디언 항목.
 * summary 속성(또는 slot="summary")이 트리거, 기본 슬롯이 접을 수 있는 패널입니다.
 */
@customElement('mm-accordion-item')
export class AccordionItem extends LitElement {
  /** 접기/펼치기 트리거 텍스트 */
  @property({ type: String }) summary = ''
  /** 펼쳐진 상태 */
  @property({ type: Boolean, reflect: true }) open = false
  /** 비활성 상태 */
  @property({ type: Boolean }) disabled = false

  private readonly _panelId = `accordion-panel-${crypto.randomUUID()}`

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;

        --accordion-padding-x: var(--space-4);
        --accordion-padding-y: var(--space-2);
        --accordion-background: var(--color-background-subtle);
        --accordion-border: none;
        --accordion-radius: var(--radius);
        --accordion-icon-size: 1.25rem;
        --accordion-transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* brutal */
      :host-context([data-theme='brutal']) {
        --accordion-border: var(--border-stronger);
      }

      .accordion {
        padding: var(--accordion-padding-y) var(--accordion-padding-x);
        background: var(--accordion-background);
        border: var(--accordion-border);
        border-radius: var(--accordion-radius);
      }

      .summary-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-2);
        width: 100%;
        height: var(--size-medium);
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        font: inherit;
        font-weight: var(--font-weight-bold);
        color: inherit;
        text-align: left;

        &:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      }

      .icon {
        flex-shrink: 0;
        width: var(--accordion-icon-size);
        height: var(--accordion-icon-size);
        transition: transform var(--accordion-transition);
      }

      /* grid trick: 0fr → 1fr 로 높이 애니메이션 */
      .panel {
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: grid-template-rows var(--accordion-transition);
      }

      .panel-inner {
        min-height: 0;
        transition: padding var(--accordion-transition);
      }

      :host([open]) {
        & .icon {
          transform: rotate(90deg);
        }
        & .panel {
          grid-template-rows: 1fr;
        }
        & .panel-inner {
          padding-top: var(--space-2);
          padding-bottom: var(--space-2);
        }
      }
    `,
  ]

  private _toggle() {
    if (this.disabled) return
    this.open = !this.open
    this.dispatchEvent(
      new CustomEvent('accordion-toggle', {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <div class="accordion">
        <button
          class="summary-btn"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls=${this._panelId}
          ?disabled=${this.disabled}
          @click=${this._toggle}
        >
          <slot name="summary">${this.summary}</slot>
          <mm-icon class="icon" name=${ICON_NAMES.SITEMAP}></mm-icon>
        </button>

        <div id=${this._panelId} class="panel" aria-hidden=${this.open ? 'false' : 'true'}>
          <div class="panel-inner">
            <slot></slot>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-accordion-item': AccordionItem
  }
}
