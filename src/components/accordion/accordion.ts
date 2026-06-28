import { LitElement, css, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { AccordionItem } from '@/components/accordion/semantics/accordion-item'
import '@/components/flex/flex'

/**
 * mm-accordion-item을 묶는 그룹 컨테이너.
 * exclusive 모드에서는 하나의 항목만 펼쳐집니다.
 */
@customElement('mm-accordion')
export class Accordion extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({ type: Boolean }) exclusive = false

  @queryAssignedElements({ selector: 'mm-accordion-item', flatten: true })
  private items!: AccordionItem[]

  render() {
    return html`
      <mm-flex direction="column" gap="1">
        <slot></slot>
      </mm-flex>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('accordion-toggle', this.handleToggle)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('accordion-toggle', this.handleToggle)
  }

  private handleToggle = (event: Event) => {
    const customEvent = event as CustomEvent<{ open: boolean }>
    if (!this.exclusive || !customEvent.detail.open) return

    const opened = event.target as AccordionItem
    this.items.forEach(item => {
      if (item !== opened) item.open = false
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-accordion': Accordion
  }
}
