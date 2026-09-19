import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit, uniqueId } from '@/utils'
import '@/components/indicators/expand-indicator/expand-indicator'

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
        --accordion-item-padding: var(--space-2) var(--space-4);
        --accordion-item-border: var(--border-transparent);
        --accordion-item-border-radius: var(--radius);
        --accordion-item-background-color: var(--background-subtle-color);

        ${surfaceBaseStyles};
        --surface-padding: var(--accordion-item-padding);
        --surface-border: var(--accordion-item-border);
        --surface-border-radius: var(--accordion-item-border-radius);
        --surface-background-color: var(--accordion-item-background-color);
      }

      .summary-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-2);
        width: 100%;
        font-weight: var(--font-weight-bold);
      }

      /* grid trick: 0fr → 1fr 로 높이 애니메이션 */
      [aria-hidden] {
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: grid-template-rows var(--transition-duration) var(--transition-easing);
      }

      [aria-hidden] > div {
        min-height: 0;
        transition: padding var(--transition-duration) var(--transition-easing);
      }

      :host([open]) {
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
  @query('button.summary-btn') private trigger?: HTMLElement
  private readonly panelId = uniqueId('accordion-panel')
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
      <button class="summary-btn" aria-controls=${this.panelId}>
        <slot name="summary">${this.summary}</slot>
        <mm-expand-indicator ?expanded=${this.open}></mm-expand-indicator>
      </button>

      <div id=${this.panelId} aria-hidden=${this.open ? 'false' : 'true'}>
        <div><slot></slot></div>
      </div>
    `
  }
}
