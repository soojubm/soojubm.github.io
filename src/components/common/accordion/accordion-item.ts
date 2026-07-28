import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit, uniqueId } from '@/utils'

/**
 * 개별 아코디언 항목.
 * summary 속성(또는 slot="summary")이 트리거, 기본 슬롯이 접을 수 있는 패널입니다.
 */
@customElement('mm-accordion-item')
export class AccordionItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        padding: var(--accordion-padding);
        background: var(--accordion-background-color);
        border: var(--accordion-border);
        border-radius: var(--accordion-border-radius);

        --accordion-padding: var(--space-2) var(--space-4);
        --accordion-background-color: var(--background-subtle-color);
        --accordion-border: var(--border-transparent);
        --accordion-border-radius: var(--radius);
        --accordion-icon-size: 1.25rem;
        --accordion-transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .summary-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-2);
        width: 100%;
        height: var(--size-32);
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
      [aria-hidden] {
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: grid-template-rows var(--accordion-transition);
      }

      [aria-hidden] > div {
        min-height: 0;
        transition: padding var(--accordion-transition);
      }

      :host([open]) {
        & .icon {
          transform: rotate(90deg);
        }
        & [aria-hidden] {
          grid-template-rows: 1fr;
        }
        & [aria-hidden] > div {
          padding-top: var(--space-2);
          padding-bottom: var(--space-2);
        }
      }
    `,
  ]

  @property({ type: String }) summary = ''
  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: Boolean }) disabled = false

  private readonly panelId = uniqueId('accordion-panel')

  private disclosure = new DisclosureController(this, {
    isOpen: () => this.open,
    setOpen: open => {
      this.open = open
      emit(this, 'accordion-toggle', { open })
    },
    getTrigger: () => this.shadowRoot?.querySelector('button.summary-btn') ?? undefined,
  })

  render() {
    return html`
      <button class="summary-btn" aria-controls=${this.panelId} ?disabled=${this.disabled}>
        <slot name="summary">${this.summary}</slot>
        <mm-icon class="icon" name=${ICON_NAMES.SITEMAP}></mm-icon>
      </button>

      <div id=${this.panelId} aria-hidden=${this.open ? 'false' : 'true'}>
        <div>
          <slot></slot>
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
