import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { gridStyles } from './grid.styles'

type Columns = 1 | 2 | 3 | 4

@customElement('mm-grid')
export class Grid extends LitElement {
  /** 칼럼 수. 2 | 3 | 4 */
  @property({ type: Number }) columns: Columns = 2

  /** 칼럼 최대 너비. e.g. '200px', '20rem' */
  @property({ attribute: 'column-max-width' }) columnMaxWidth?: string

  /** 간격. 숫자면 --space-{n}, 그 외엔 그대로. e.g. '4', '1rem' */
  @property({ type: String }) gap = '4'

  static styles = gridStyles

  render() {
    const columns = [1, 2, 3, 4].includes(this.columns) ? this.columns : 2
    const gap = /^\d+$/.test(this.gap) ? `var(--space-${this.gap})` : this.gap
    const styles = [`gap: ${gap}`]
    if (this.columnMaxWidth)
      styles.push(`--_col-max: ${this.columnMaxWidth}; justify-content: space-between`)

    return html`
      <div class="grid" data-columns=${columns} style=${styles.join('; ')}>
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-grid': Grid
  }
}
