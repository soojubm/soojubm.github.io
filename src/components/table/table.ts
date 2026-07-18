import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
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
        background-color: var(--background-subtle-color);
        overflow-x: auto;
      }

      th.align-center {
        text-align: center;
      }

      th.align-right {
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
        class=${classMap({
          'align-center': column.textAlign === 'center',
          'align-right': column.textAlign === 'right',
        })}
        scope="col"
        aria-sort=${ifDefined(column.sortable ? 'none' : undefined)}
      >
        ${this.renderHeaderContent(column)}
      </th>
    `
  }

  private renderHeaderContent(column: TableColumn) {
    if (!column.sortable) return column.label

    return html`
      <mm-flex align-items="center" justify-content=${this.getHeaderJustifyContent(column)} gap="1">
        ${column.label}
        <mm-icon name=${ICON_NAMES.SORT} size="tiny"></mm-icon>
      </mm-flex>
    `
  }

  private renderColumn(column: TableColumn) {
    return html`
      <col style=${styleMap(column.width ? { width: column.width } : {})} />
    `
  }

  private getHeaderJustifyContent(column: TableColumn) {
    if (column.textAlign === 'center') return 'center'
    if (column.textAlign === 'right') return 'flex-end'
    return 'flex-start'
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-table': Table
  }
}
