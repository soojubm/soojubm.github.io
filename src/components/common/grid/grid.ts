import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { Space } from '@/stylesheets/shared.styles'

import { gridStyles } from '@/components/common/grid/grid.styles'

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

  // 임의 값이라 나열할 수 없고 host가 소비하므로 host에 직접 주입한다.
  protected willUpdate() {
    if (this.columnMinWidth) this.style.setProperty('--_col-min', this.columnMinWidth)
    else this.style.removeProperty('--_col-min')
  }
}
