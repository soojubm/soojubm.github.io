import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'

export interface TableColumn {
  label: string
  width?: string
  sortable?: boolean
  textAlign?: 'left' | 'center' | 'right'
}

@customElement('mm-table')
export class Table extends LitElement {
  @property({ type: String }) caption = ''

  @property({ attribute: false }) rows: unknown = nothing

  @property({
    type: Array,
    converter: value => {
      if (!value) return []

      try {
        const columns = JSON.parse(value)
        return Array.isArray(columns) ? columns : []
      } catch {
        return []
      }
    },
  })
  columns: TableColumn[] = []

  static styles = [resetStyles]

  private renderHeader(column: TableColumn) {
    const content = column.sortable
      ? html`
          <mm-flex
            align-items="center"
            justify-content=${column.textAlign === 'center'
              ? 'center'
              : column.textAlign === 'right'
              ? 'flex-end'
              : 'flex-start'}
            gap="1"
          >
            ${column.label}
            <mm-icon name="arrow-separate-vertical" size="tiny"></mm-icon>
          </mm-flex>
        `
      : column.label

    return html`
      <th
        scope="col"
        aria-sort=${column.sortable ? 'none' : nothing}
        style=${column.textAlign ? `text-align: ${column.textAlign}` : nothing}
      >
        ${content}
      </th>
    `
  }

  render() {
    return html`
      <div class="table-container">
        <table>
          <caption hidden>${this.caption}</caption>
          <colgroup>
            ${this.columns.map(
              column =>
                html`
                  <col style=${column.width ? `width: ${column.width}` : nothing} />
                `,
            )}
          </colgroup>
          <thead>
            <tr>${this.columns.map(column => this.renderHeader(column))}</tr>
          </thead>
          <tbody>${this.rows}</tbody>
        </table>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-table': Table
  }
}
