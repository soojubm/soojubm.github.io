import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { gridStyles } from '@/components/common/grid/grid.styles'
import type { Space } from '@/stylesheets/shared.styles'

export type GridColumns = 1 | 2 | 3 | 4 | 6

@customElement('mm-grid')
export class Grid extends LitElement {
  static styles = gridStyles
  @property({ type: Number, reflect: true }) columns: GridColumns = 2
  @property({ attribute: 'column-min-width' }) columnMinWidth?: string
  @property({ type: String, reflect: true }) gap: Space = '4'

  render() {
    return html`
      <slot></slot>
    `
  }

  protected willUpdate() {
    if (this.columnMinWidth) this.style.setProperty('--_col-min', this.columnMinWidth)
    else this.style.removeProperty('--_col-min')
  }
}
