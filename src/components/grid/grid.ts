import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'

type Columns = 2 | 3 | 4

@customElement('mm-grid')
export class Grid extends LitElement {
  /** 칼럼 수. 2 | 3 | 4 */
  @property({ type: Number }) columns: Columns = 2

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .grid {
        display: grid;
        width: 100%;
        gap: var(--space-4);
      }

      .grid > ::slotted(*) {
        min-width: 0;
      }

      .grid[data-columns='2'] {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .grid[data-columns='3'] {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .grid[data-columns='4'] {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      @media (max-width: 640px) {
        .grid[data-columns='2'],
        .grid[data-columns='3'],
        .grid[data-columns='4'] {
          grid-template-columns: 1fr;
        }
      }
    `,
  ]

  render() {
    const columns = [2, 3, 4].includes(this.columns) ? this.columns : 2

    return html`
      <div class="grid" data-columns=${columns}>
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
