import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

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
        <colgroup>${this.columns.map(column => this.renderColumn(column))}</colgroup>
        <thead>
          <tr>${this.columns.map(column => this.renderHeader(column))}</tr>
        </thead>
        <tbody>${this.rows}</tbody>
      </table>
    `
  }

  private renderHeader(column: TableColumn) {
    const headerStyles = {
      textAlign: column.textAlign ?? null,
    }

    return html`
      <th
        scope="col"
        aria-sort=${column.sortable ? 'none' : nothing}
        style=${styleMap(headerStyles)}
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
    const columnStyles = {
      width: column.width ?? null,
    }

    return html`
      <col style=${styleMap(columnStyles)} />
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-table': Table
  }
}
