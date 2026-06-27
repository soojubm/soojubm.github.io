import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { gridStyles } from '@/components/grid/grid.styles'

type Columns = 1 | 2 | 3 | 4

@customElement('mm-grid')
export class Grid extends LitElement {
  static styles = gridStyles

  @property({ type: Number, reflect: true }) columns: Columns = 2

  @property({ attribute: 'column-max-width' }) columnMaxWidth?: string

  @property({ type: String }) gap = '4'

  render() {
    const gap = /^\d+$/.test(this.gap) ? `var(--space-${this.gap})` : this.gap
    const styles = {
      '--_col-max': this.columnMaxWidth ?? null,
      gap,
      justifyContent: this.columnMaxWidth ? 'space-between' : null,
    }

    return html`
      <div class="grid" style=${styleMap(styles)}><slot></slot></div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-grid': Grid
  }
}
