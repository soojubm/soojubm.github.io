import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { gridStyles } from '@/components/grid/grid.styles'

type Columns = 1 | 2 | 3 | 4

@customElement('mm-grid')
export class Grid extends LitElement {
  static styles = gridStyles

  @property({ type: Number, reflect: true }) columns: Columns = 2

  @property({ attribute: 'column-max-width' }) columnMaxWidth?: string

  @property({ attribute: 'column-min-width' }) columnMinWidth?: string

  @property({ type: String }) gap = '4'

  render() {
    return html`
      <slot></slot>
    `
  }

  protected willUpdate() {
    const gap = /^\d+$/.test(this.gap) ? `var(--space-${this.gap})` : this.gap

    if (gap) this.style.setProperty('--_grid-gap', gap)
    else this.style.removeProperty('--_grid-gap')

    if (this.columnMinWidth) this.style.setProperty('--_col-min', this.columnMinWidth)
    else this.style.removeProperty('--_col-min')

    if (this.columnMaxWidth) {
      this.style.setProperty('--_col-max', this.columnMaxWidth)
      this.style.setProperty('--_grid-justify-content', 'space-between')
      return
    }

    this.style.removeProperty('--_col-max')
    this.style.removeProperty('--_grid-justify-content')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-grid': Grid
  }
}
