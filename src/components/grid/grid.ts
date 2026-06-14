import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'

type Columns = 1 | 2 | 3 | 4

@customElement('mm-grid')
export class Grid extends LitElement {
  /** 칼럼 수. 2 | 3 | 4 */
  @property({ type: Number }) columns: Columns = 2

  /** 칼럼 최대 너비. e.g. '200px', '20rem' */
  @property({ attribute: 'column-max-width' }) columnMaxWidth?: string

  /** 간격. 숫자면 --space-{n}, 그 외엔 그대로. e.g. '4', '1rem' */
  @property({ type: String }) gap = '4'

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .grid {
        display: grid;
        width: 100%;
      }

      .grid > ::slotted(*) {
        min-width: 0;
      }

      .grid[data-columns='1'] {
        grid-template-columns: 1fr;
      }

      .grid[data-columns='2'] {
        grid-template-columns: repeat(2, minmax(0, var(--_col-max, 1fr)));
      }

      .grid[data-columns='3'] {
        grid-template-columns: repeat(3, minmax(0, var(--_col-max, 1fr)));
      }

      .grid[data-columns='4'] {
        grid-template-columns: repeat(4, minmax(0, var(--_col-max, 1fr)));
      }

      @media (max-width: 1000px) {
        .grid[data-columns='3'],
        .grid[data-columns='4'] {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 800px) {
        .grid[data-columns='2'],
        .grid[data-columns='3'],
        .grid[data-columns='4'] {
          grid-template-columns: 1fr;
        }
      }
    `,
  ]

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
