import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { arrayAttributeConverter } from '@/utils/property-converters'

export interface TableColumn {
  label: string
  width?: string
  sortable?: boolean
  textAlign?: 'left' | 'center' | 'right'
}

@customElement('mm-table')
export class Table extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        height: 320px;
        background-color: var(--color-background-subtle);
        overflow-x: auto;
      }

      th[data-align='center'] {
        text-align: center;
      }

      th[data-align='right'] {
        text-align: right;
      }
    `,
  ]

  @property({ type: String }) caption = ''

  @property({ attribute: false }) rows: unknown = nothing

  @property({
    attribute: 'columns',
    converter: arrayAttributeConverter<TableColumn>(),
  })
  columns: TableColumn[] = []

  render() {
    return html`
      <table>
        <caption hidden>${this.caption}</caption>
        <colgroup>${this.renderColumns()}</colgroup>
        <thead>
          <tr>${this.renderHeaders()}</tr>
        </thead>
        <tbody>${this.rows}</tbody>
      </table>
    `
  }

  private renderColumns() {
    return this.columns.map(column => this.renderColumn(column))
  }

  private renderHeaders() {
    return this.columns.map(column => this.renderHeader(column))
  }

  private renderHeader(column: TableColumn) {
    return html`
      <th
        scope="col"
        aria-sort=${column.sortable ? 'none' : nothing}
        data-align=${ifDefined(column.textAlign)}
      >
        ${this.renderHeaderContent(column)}
      </th>
    `
  }

  private renderHeaderContent(column: TableColumn) {
    if (!column.sortable) return column.label

    return html`
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
  }

  private renderColumn(column: TableColumn) {
    return html`
      <col width=${ifDefined(column.width)} />
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-table': Table
  }
}
