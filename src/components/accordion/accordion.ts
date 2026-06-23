import { LitElement, css, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'
import type { AccordionItem } from './semantics/accordion-item'

/**
 * mm-accordion-item을 묶는 그룹 컨테이너.
 * exclusive 모드에서는 하나의 항목만 펼쳐집니다.
 */
@customElement('mm-accordion')
export class Accordion extends LitElement {
  /** true이면 한 번에 하나의 항목만 펼쳐집니다 (라디오 패턴) */
  @property({ type: Boolean }) exclusive = false

  @queryAssignedElements({ selector: 'mm-accordion-item', flatten: true })
  private _items!: AccordionItem[]

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('accordion-toggle', this._handleToggle as EventListener)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('accordion-toggle', this._handleToggle as EventListener)
  }

  private _handleToggle = (e: CustomEvent<{ open: boolean }>) => {
    if (!this.exclusive || !e.detail.open) return

    const opened = e.target as AccordionItem
    this._items.forEach(item => {
      if (item !== opened) item.open = false
    })
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-accordion': Accordion
  }
}
