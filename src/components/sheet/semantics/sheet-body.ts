import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { scrollbarStyles } from '@/stylesheets/shared/scrollbar.styles'

@customElement('mm-sheet-body')
class SheetBody extends LitElement {
  static styles = [
    css`
      :host {
        flex: 1 1 auto;
        min-height: 0;
        padding: var(--space-4) 0
          calc(var(--sheet-body-padding-block-end, var(--space-4)) + env(safe-area-inset-bottom));
        overflow-y: auto;
        overflow-x: hidden;

        ${scrollbarStyles};
      }
    `,
  ]

  render() {
    return html`
      <slot></slot>
    `
  }
}

export default SheetBody
